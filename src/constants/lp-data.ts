export type LpProgram = {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  priceLabel: string;
  depthLabel: string;
  sessionsLabel: string;
  bullets: string[];
};

export type LpFounder = {
  id: string;
  name: string;
  role: string;
  bio: string;
};

export const lpCopy = {
  brand: "現代の寺院 / Modern Temple",
  hero: {
    headline: "意識のソースコードを解放する",
    subhead:
      "LVX KTP（ケタミン療法プログラム）は、脳のネットワークを流動化させ、新しい適応を促す「再構築」の場を提示します。",
    ctas: [
      { label: "プログラムを見る", href: "#programs" },
      { label: "適応性を評価する（AIスクリーニング）", href: "#screening" },
    ],
    videoSrc: "https://www.pexels.com/download/video/34723479/",
    typewriterWords: ["Noise", "Stuck", "Rewire", "統合"],
  },
  /** 白遷移直後のセカンドヒーロー（`videoSrc` が空なら `imageSrc` を表示） */
  postTransitionHero: {
    imageSrc: "/images/Gemini_Generated_Image_os34z0os34z0os34.png",
    videoSrc: "",
    imageAlt: "白相へ移行した後のビジュアル",
    eyebrow: "NEXT STEP",
    headline: "次の位相へ。まずはメーリングリストへ。",
    lead:
      "プログラムの概要と、次のステップのご案内をメールでお届けします。",
    emailPlaceholder: "メールアドレスを入力",
    submitLabel: "案内メールを受け取る",
    thanksMessage: "受け付けました。正式なフォーム公開まで今しばらくお待ちください。",
    privacyNote: "※ ご入力いただいたアドレスは案内目的以外には使用しません。",
    screeningCta: {
      label: "適応性をいま評価する（AIスクリーニング）",
      href: "#screening",
    },
  },
  sections: {
    philosophyTitle: "philosophyのタイトル",
    philosophyDesc:
      "Preparation（準備）・Experience（体験）・Integration（統合）。",
    scienceTitle: "意識医学（Consciousness Medicine）",
    scienceDesc:
      "フロートを「脳と意識の再配線（Rewire）」として提示。感覚遮断と医療管理下のプロトコルで、変化を“偶然”ではなく設計へ。",
    programsTitle: "プログラムの全体像",
    programsDesc:
      "医学的な裏付けと、丁寧な対話。そのすべてをパッケージに。\n「投薬 × セッション × 統合（インテグレーション）」を、\nひとつの「存在の医学」として設計し、提示します。",
    foundersTitle: "創設者メッセージ",
    foundersDesc:
      "臨床の安全性を軸に、評価から統合までを一貫して監督します。",
    screeningTitle: "入口：AIスクリーニング",
    screeningDesc:
      "誰でも受けられるわけではありません。適応性の評価が、価値と安心感を生みます。",
  },
} as const;

export const lpMotionText = {
  heroH1: ["Noise", "Stuck", "Rewire", "統合"],
  heroTheme: ["Silence", "DMN", "Rewire", "Integration"],
  styleGuideH1: ["その回路の癖を修正できないとき", "自己の物語を維持し続ける", "同じ苦しい思考のルートを自動的に辿り続けてしまう", "ケタミン療法プログラム"],
  styleGuideH2: ["Predictive Processing", "DMN", "KTP", "統合"],
} as const;

export const lpKTP = {
  mainCatch:
    "脳の中に、深すぎる「思考の溝」ができてしまったとき。",
  leadTitle: "「脳の可塑性」を、臨床的治療のツールへ。",
  leadParagraphs: [
    "私たちの脳には、自己の物語を維持し続ける「DMN（デフォルトモードネットワーク）」という回路が存在します。既存の治療だけでは、その回路の癖を修正できないとき。KTPは、脳のネットワークを一時的に流動化させ、新しい「人生のルート」を引き直す場を提示します。",
    "うつ病や不安障害など、既存の治療で変化が得られにくい状態では、この回路が過剰に硬直化し、同じ苦しい思考のルートを自動的に辿り続けてしまうことが分かっています。",
    "KTP（ケタミン療法プログラム）は、この硬直した回路を一時的に「雪解け」のように流動化させるプロセスです。",
  ],
  steps: {
    step1Title: "STEP 01：流動化（Phase Transition）",
    step1Body: [
      "ケタミンの作用により、凝り固まった神経回路の結合が一時的に解放されます。",
      "これは、意識のOSを「デバッグモード」へと切り替え、ソースコードを露出させるプロセスです。",
    ],
    step2Title: "STEP 02：可塑性の最大化",
    step2Body: [
      "投与後、脳が最も変化を受け入れやすい「黄金の窓（Window of Opportunity）」が作られます。",
      "日常の重力から解放され、自分自身を客観的に眺める深い内省の時間が訪れます。",
    ],
    step3Title: "STEP 03：再構成（Rewiring / Integration）",
    step3Body: [
      "この柔軟な期間に専門医による「統合セッション」を行うことで、体験を言語化し、新しい思考の枠組みを日常へと再適応させます。",
      "一過性の体験で終わらせず、人生の物語を根底から書き換えるための核心部です。",
    ],
  },
  conceptTitle: "「現代の寺院」は、科学と安全を土台に成り立つ。",
  conceptBody: [
    "単なる対症療法ではなく、神経科学的な根拠に基づき、人生の物語を再編成する「存在の医学」。",
  ],
} as const;

export const lpPrograms: LpProgram[] = [
  {
    id: "plan-01",
    name: "Plan 01",
    title: "Standard Introduction",
    subtitle: "まずは、その扉を叩く。",
    priceLabel: "150,000",
    depthLabel: "浅層",
    sessionsLabel: "[1]",
    bullets: [
      "医師による評価・適応判定（初回）",
      "安全プロトコルの説明と同意",
      "体験後の簡易統合セッション",
    ],
  },
  {
    id: "plan-02",
    name: "Plan 02",
    title: "Integrate Float",
    subtitle: "静寂を深める。身体感覚の再統合。",
    priceLabel: "240,000",
    depthLabel: "中層",
    sessionsLabel: "[1]",
    bullets: [
      "診断・準備 → 体験 → 統合の一連を強化",
      "フロート環境での感覚統合（デモ）",
      "翌日以降の統合ガイダンス",
    ],
  },
  {
    id: "plan-03",
    name: "Plan 03",
    title: "Standard Course",
    subtitle: "本質的な書き換え。再調整の期間。",
    priceLabel: "660,000",
    depthLabel: "深層",
    sessionsLabel: "[6]",
    bullets: [
      "神経心理学的な“再配線”を想定した設計",
      "医師の全行程管理（毎回）",
      "統合セッションを段階的に深化",
    ],
  },
  {
    id: "plan-04",
    name: "Plan 04",
    title: "Premium Journey",
    subtitle: "究極の沈殿槽。最深部の静けさ。",
    priceLabel: "880,000",
    depthLabel: "最深",
    sessionsLabel: "[6]",
    bullets: [
      "ケタミン × フロートの旗艦設計（デモ）",
      "統合プロトコルを個別最適化",
      "“現代の寺院”としての最上位体験",
    ],
  },
];

export const lpScienceCards = [
  {
    title: "Rewire（再配線）という言葉で、誤解を減らす",
    body: "「治す」でも「飛ぶ」でもない。思考と感情の回路を“再起動し直す”ための、医療的な言語として提示します。",
  },
  {
    title: "KAP × フロート：脳と意識のための設計",
    body: "KAP（Ketamine-Assisted Psychotherapy）とフローティングタンクを組み合わせ、知覚のノイズを落として“統合”に向けた状態をつくります。",
  },
  {
    title: "医療管理下のプロトコル（安全と線引き）",
    body: "評価・同意・観察・統合。リクリエーショナルと決定的に違うのは、目的と管理体制、そして説明責任です。",
  },
] as const;

export const lpFounders: LpFounder[] = [
  {
    id: "doctor",
    name: "精神科医（創設者）",
    role: "医療プロトコル / 安全監督",
    bio: "臨床経験に基づき、評価から統合までを監督。高単価の根拠を“科学と安全”として担保します。",
  },
];

export const lpScreening = {
  buttonLabel: "あなたの適応性を評価する（AIスクリーニング）",
  helper:
    "※ 現在はLP用のダミー導線です。将来的にAI問診/予約フローへ差し替え可能。",
} as const;

