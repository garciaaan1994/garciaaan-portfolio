// Supabase クライアント初期化
// 本番では以下をあなたの Supabase プロジェクトの URL と anon key に置き換えてください。
// GitHub Pages で公開する場合は、機密性の高いキーは使わず anon key のみを使います。
// 例: const SUPABASE_URL = 'https://xxxx.supabase.co';
//     const SUPABASE_ANON_KEY = 'eyJhbGciOiJI...';

(() => {
    const SUPABASE_URL = window.SUPABASE_URL || 'https://gftoehcnphtwwrrcxuyk.supabase.co';
    const SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmdG9laGNucGh0d3dycmN4dXlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3NzAzNjQsImV4cCI6MjA3MzM0NjM2NH0.BKjYUHtl2X6qiu7iUmTmGWVFu2zYTO4nWYbhobnJb7U';

    if (typeof window.supabase !== 'undefined' && SUPABASE_URL && SUPABASE_ANON_KEY) {
        try {
            window.supa = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            console.log('Supabase client initialized');
        } catch (e) {
            console.warn('Supabase init failed:', e?.message || e);
        }
    } else {
        console.log('Supabase config not provided. Falling back to local storage/IDB.');
        window.supa = null;
    }
})();


