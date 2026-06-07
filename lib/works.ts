export interface Work {
  slug: string;
  title: string;
  description: string;
  category: string;
  year: string;
  thumbnail: string;
  video?: string;
  images?: string[];
  tools?: string[];
  // detail page (Japanese)
  company?: string;
  role?: string;
  period?: string;
  overview?: string;
  highlights?: string[];
  confidential?: boolean;
}

// Career / product portfolio — toC product management & business strategy
// across payments, fintech, C2C marketplaces and creator platforms.
// Active clients are anonymised (NDA); past roles use real product names.
const works: Work[] = [
  {
    slug: "cashback-app",
    title: "Cashback Shopping App",
    description:
      "Cashback & price-comparison shopping app (Safari extension). Owned UX PRDs for core commerce screens, shipped a coupon-confirm modal that cut checkout drop-off, and ran onboarding A/B tests — building light React Native / Expo myself.",
    category: "Commerce · Growth",
    year: "2025–",
    thumbnail: "",
    tools: ["PRD", "A/B Testing", "React Native"],
    confidential: true,
    company: "業務委託（newparade 経由 / クライアント名は非公開）",
    role: "プロダクトマネージャー",
    period: "2025年 –",
    overview:
      "Safari拡張機能でECサイトの最安値・キャッシュバック・クーポンを自動検索する、価格比較／キャッシュバック型のショッピングアプリ。コマースUXのグロースを担当。",
    highlights: [
      "主要画面（商品詳細の送料表示、ショップ詳細＝レビュー/配送/返品/特商法、クーポン適用UX）のUX改善PRDを策定",
      "クーポン適用前の確認モーダルを設計し、適用ミスによる離脱を削減",
      "オンボーディング改善のA/Bテストを設計（画面遷移タイプ vs PiP動画ガイド）",
      "ホームナビゲーションUXのPRD（タブバー案 A / E / F の比較検討）",
      "React Native + Expo のモノレポで軽微なフロントエンド実装まで自走（AIエンジニア Devin を併用）",
    ],
  },
  {
    slug: "creator-platform",
    title: "Creator Subscription Platform",
    description:
      "Creator subscription & monetization platform. Built a Slack auto-reporting KPI pipeline on SQL (PostgreSQL / BigQuery), led compliance across Japan's advertising, e-commerce and settlement-law requirements through ToS revisions, and redesigned the CRM / transactional email system.",
    category: "Creator · Compliance",
    year: "2025–",
    thumbnail: "",
    tools: ["SQL", "Compliance", "CRM"],
    confidential: true,
    company: "業務委託（newparade 経由 / クライアント名は非公開）",
    role: "プロダクトマネージャー",
    period: "2025年 –",
    overview:
      "月額サブスクリプション＋手数料モデルの、クリエイター向け課金・マネタイズプラットフォーム。データ分析・コンプライアンス・CRM・プロダクト企画を横断して担当。",
    highlights: [
      "SQL（PostgreSQL / BigQuery）で売上・継続・行動データを分析。KPIレポート（売上・ARPPU・DAU・課金率・カテゴリ別/クリエイター別売上）の Slack 自動配信基盤を構築し、意思決定サイクルを定着",
      "景表法・特商法・資金決済法の論点整理から利用規約改定まで一気通貫（クリエイター発行クーポン、購入済みコンテンツのアクセス権整理 等）",
      "ライブ配信前のコンプラ確認UI（複数チェックボックス＋条件付き活性化）を設計",
      "トランザクションメールの全面再設計、キャンペーンHTMLメール、クリエイター獲得DM施策の運用（CRM）",
      "レコメンド／フィード表示ロジック、リール機能の効果測定PRD、ブロック機能PRD などを策定",
    ],
  },
  {
    slug: "influencer-platform",
    title: "Influencer Campaign Platform",
    description:
      "PR campaign & deal-matching platform for creators. Stood up a data-driven foundation, used Tier-based creator analysis to find the retention magic moment, and cut cost through reward-ROI analysis.",
    category: "Data · Retention",
    year: "2025–",
    thumbnail: "",
    tools: ["SQL", "KPI Design", "Funnel"],
    confidential: true,
    company: "業務委託（newparade 経由 / クライアント名は非公開）",
    role: "プロダクトマネージャー",
    period: "2025年 –",
    overview:
      "クリエイター／インフルエンサー向けの、PR動画キャンペーン・案件獲得プラットフォーム（コスメ中心）。",
    highlights: [
      "データが見られない状態から、データドリブンで改善できる分析基盤を整備",
      "Tierベースのクリエイター分析でロイヤル/離脱ユーザーを比較し、リテンションの分岐点（マジックモーメント）を特定",
      "報酬制度のROI分析で低ROIの報酬タイプを特定し、撤廃提案でコストを削減",
      "ファネル離脱要因を構造化して改善施策を立案。クリエイターガイドラインを公開版と内部運用の乖離を解消する形で再整備",
    ],
  },
  {
    slug: "snkrdunk",
    title: "SNKRDUNK",
    description:
      "C2C sneaker & collectibles marketplace (SODA). Led the engineering and design team. Shipped Yahoo! Auctions cross-listing and online oripa to grow GMV, plus a points system and vendor-cost reductions.",
    category: "C2C · Marketplace",
    year: "2022–23",
    thumbnail: "",
    tools: ["Growth", "Team Lead", "Alliance"],
    company: "株式会社SODA",
    role: "プロダクトマネージャー",
    period: "2022年8月 – 2023年12月",
    overview:
      "CtoC のスニーカー／コレクティブルマーケットプレイス『スニダン（SNKRDUNK）』。開発・デザインチームをリード。",
    highlights: [
      "LINEヤフー連携でヤフオク! への併売を実現し GMV を拡大",
      "オンラインオリパ機能を立ち上げ GMV を拡大",
      "ポイント機能の企画・導入",
      "ベンダー交渉による原価削減",
      "未発送ユーザーの分析と対策",
    ],
  },
  {
    slug: "mercard",
    title: "Mercard / Merpay",
    description:
      "Credit-card growth inside Mercari. Launched the Gold card (product design), lifted activation and statement open-rates, and drove retention through CRM — owning planning through legal sign-off.",
    category: "Fintech · Growth",
    year: "2024",
    thumbnail: "",
    tools: ["Fintech", "CRM", "Product Design"],
    company: "Merpay株式会社（メルカリ）",
    role: "プロダクトマネージャー",
    period: "2024年4月 – 2024年11月",
    overview:
      "メルカリ内の決済サービス「メルペイ」、主にクレジットカード「メルカード」のグロースを担当。",
    highlights: [
      "ゴールドカードの立ち上げ（商品設計）",
      "カード開封率・アクティベーション率の向上",
      "CRM によるリテンション改善",
      "企画から法的整理、実行までを一貫して担当",
    ],
  },
  {
    slug: "vandle-card",
    title: "Vandle Card",
    description:
      "Visa prepaid card (Kanmu). Improved the pay-later top-up flow, struck the Seven Bank ATM alliance, cut unit cost, and ran SQL / BigQuery analysis while paying down complex legacy spec debt.",
    category: "Fintech · Strategy",
    year: "2019–22",
    thumbnail: "",
    tools: ["Fintech", "SQL", "Alliance"],
    company: "株式会社カンム",
    role: "プロジェクトマネージャー / 事業企画",
    period: "2019年6月 – 2022年7月",
    overview:
      "Visa プリペイドカード「バンドルカード」。プロダクトと事業企画の両面を担当。",
    highlights: [
      "後払い機能「ポチっとチャージ」の改善",
      "セブン銀行ATMとのアライアンス締結",
      "原価コストの削減",
      "SQL / BigQuery によるデータ分析",
      "カード有効期限機能の実装、複雑な既存仕様の負債解消",
    ],
  },
  {
    slug: "flamingo",
    title: "Flamingo",
    description:
      "Language-tutor matching app. Reworked home & search to lift CVR and introduced Redash + SQL dashboards for PL and metric tracking, while managing the team.",
    category: "Marketplace · Growth",
    year: "2018–19",
    thumbnail: "",
    tools: ["SQL", "Growth", "Redash"],
    company: "株式会社フラミンゴ",
    role: "プロダクトマネージャー",
    period: "2018年9月 – 2019年4月",
    overview:
      "語学レッスンのマッチングアプリ「フラミンゴ」。チームをマネジメント。",
    highlights: [
      "ホーム／検索の大幅リニューアルで CVR を改善",
      "redash 導入＋SQLダッシュボードの整備",
      "PL・数値進捗の管理",
    ],
  },
  {
    slug: "fril-rakuma",
    title: "Fril / Rakuma",
    description:
      "C2C fashion marketplace + payments (Fablic → Rakuten). Launched the payment service: Paidy / d-barai drove major monthly GMV growth, 3-D Secure recovered revenue, plus logistics integrations and direct card-network cost cuts.",
    category: "Commerce · Payments",
    year: "2014–18",
    thumbnail: "",
    tools: ["Payments", "Biz Dev", "Strategy"],
    company: "株式会社Fablic → 楽天株式会社",
    role: "事業企画 / プロジェクトマネージャー / マーケター",
    period: "2014年4月 – 2018年5月",
    overview:
      "フリマアプリ「フリル」「ラクマ」、バイクフリマ「RIDE」。創業まもない時期に社長直下で新卒入社し、楽天による買収・転籍まで担当。決済サービスの立ち上げが主領域。",
    highlights: [
      "Paidy / d払い 導入で月間 GMV を大きく拡大",
      "みなし3Dセキュア導入で売上を回復",
      "ヤマト運輸／日本郵便との配送連携",
      "クレジットカードの直接接続による原価カット",
      "楽天買収に伴うラクマのクロージング、資金決済法リスク回避のロードマップ・仕様確定",
    ],
  },
];

export function getAllWorks(): Work[] {
  return works;
}

export function getWorkBySlug(slug: string): Work | undefined {
  return works.find((w) => w.slug === slug);
}
