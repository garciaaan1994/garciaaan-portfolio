/**
 * Video Manager for garciaaan STUDIO
 * 動画ファイルの管理とポートフォリオサイトへの統合
 */

class VideoManager {
    constructor() {
        this.videos = this.loadVideos();
        this.init();
    }

    // ローカルストレージから動画リストを読み込み
    loadVideos() {
        return JSON.parse(localStorage.getItem('portfolioVideos') || '[]');
    }

    // ローカルストレージに動画リストを保存
    saveVideos() {
        localStorage.setItem('portfolioVideos', JSON.stringify(this.videos));
    }

    // 新しい動画を追加
    addVideo(videoData) {
        const video = {
            id: Date.now(),
            title: videoData.title,
            description: videoData.description,
            category: videoData.category,
            filename: videoData.filename,
            fileSize: videoData.fileSize,
            duration: videoData.duration,
            thumbnail: videoData.thumbnail,
            uploadDate: new Date().toISOString(),
            isActive: false
        };

        this.videos.push(video);
        this.saveVideos();
        return video;
    }

    // 動画を削除
    deleteVideo(videoId) {
        this.videos = this.videos.filter(video => video.id !== videoId);
        this.saveVideos();
    }

    // 動画情報を更新
    updateVideo(videoId, updateData) {
        const videoIndex = this.videos.findIndex(video => video.id === videoId);
        if (videoIndex !== -1) {
            this.videos[videoIndex] = { ...this.videos[videoIndex], ...updateData };
            this.saveVideos();
            return this.videos[videoIndex];
        }
        return null;
    }

    // ヒーロー動画として設定
    setAsHeroVideo(videoId) {
        // 全ての動画のisActiveをfalseに
        this.videos.forEach(video => video.isActive = false);
        
        // 指定された動画をアクティブに
        const video = this.videos.find(video => video.id === videoId);
        if (video) {
            video.isActive = true;
            this.saveVideos();
            this.updateSiteHeroVideo(video);
            return video;
        }
        return null;
    }

    // サイトのヒーロー動画を更新（将来的にAPIまたはファイル生成で実装）
    updateSiteHeroVideo(video) {
        // 実際の実装では、index.htmlを自動更新するか、
        // 設定ファイルを作成してサイトが読み込むようにする
        console.log(`ヒーロー動画を更新: ${video.title} (${video.filename})`);
    }

    // カテゴリ別に動画を取得
    getVideosByCategory(category) {
        return this.videos.filter(video => video.category === category);
    }

    // アクティブなヒーロー動画を取得
    getActiveHeroVideo() {
        return this.videos.find(video => video.isActive && video.category === 'hero');
    }

    // 全ての動画を取得
    getAllVideos() {
        return this.videos;
    }

    // 動画のサムネイルを生成
    generateThumbnail(videoFile) {
        return new Promise((resolve) => {
            const video = document.createElement('video');
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            video.addEventListener('loadeddata', () => {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                context.drawImage(video, 0, 0);
                
                const thumbnail = canvas.toDataURL('image/jpeg', 0.8);
                resolve(thumbnail);
            });

            video.src = URL.createObjectURL(videoFile);
            video.currentTime = 1; // 1秒の位置でサムネイル生成
        });
    }

    // 動画のメタデータを取得
    getVideoMetadata(videoFile) {
        return new Promise((resolve) => {
            const video = document.createElement('video');
            
            video.addEventListener('loadedmetadata', () => {
                resolve({
                    duration: video.duration,
                    width: video.videoWidth,
                    height: video.videoHeight
                });
            });

            video.src = URL.createObjectURL(videoFile);
        });
    }

    // ポートフォリオセクション用のHTMLを生成
    generatePortfolioHTML() {
        const portfolioVideos = this.getVideosByCategory('portfolio');
        
        return portfolioVideos.map(video => `
            <div class="portfolio-item fade-in" data-video-id="${video.id}">
                <div class="portfolio-video-container">
                    <video class="portfolio-video" controls poster="${video.thumbnail}">
                        <source src="videos/${video.filename}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div class="portfolio-overlay">
                    <h3>${video.title}</h3>
                    <p>${video.description}</p>
                </div>
            </div>
        `).join('');
    }

    // サイト設定を管理
    updateSiteSettings(settings) {
        localStorage.setItem('siteSettings', JSON.stringify(settings));
    }

    getSiteSettings() {
        return JSON.parse(localStorage.getItem('siteSettings') || '{}');
    }

    // 初期化
    init() {
        console.log('Video Manager initialized');
        console.log(`管理中の動画: ${this.videos.length}件`);
    }
}

// ファイルサイズをフォーマット
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// 時間をフォーマット
function formatDuration(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// エクスポート（モジュール使用時）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VideoManager;
}

// グローバルに公開（ブラウザ使用時）
if (typeof window !== 'undefined') {
    window.VideoManager = VideoManager;
    window.formatFileSize = formatFileSize;
    window.formatDuration = formatDuration;
}
