import { assetUrl } from "@/lib/base-path";

/**
 * Catalog copy is limited to what is readable on the Feishu Miaoda
 * screenshots for「杜书从AI内容作品集」, plus the role named in the brief.
 * No employers, dates, metrics, links, or contact details are added
 * beyond those screens.
 */

export const profile = {
  nameZh: "杜书从",
  nameEn: "DU SHUCONG",
  nameEnReading: "Du Shucong",
  role: "AI 内容编导与创作者",
  mark: "IDEAS IN MOTION",
  contactLine: "关于 AI、内容和新的可能。",
  wechatHeading: "扫码，加个微信。",
  worksKicker: "Works / 精选作品与工作方法",
} as const;

export const talkTopics = [
  "工作机会",
  "AI 科技内容",
  "选题与脚本",
  "品牌内容合作",
  "创作交流",
] as const;

export type TalkTopic = (typeof talkTopics)[number];

export const tones = {
  sand: "#d5cdb8",
  mist: "#c5c8c4",
  paper: "#eceae4",
  stone: "#cfc6b6",
  clay: "#ddd4c2",
  slate: "#c7ced6",
} as const;

export type Tone = keyof typeof tones;

export type WorkShot = {
  code: string;
  label: string;
  figure?: string;
};

export type Work = {
  index: string;
  slug: string;
  code?: string;
  title: string;
  navTitle: string;
  cardEn?: string;
  category: string;
  filedAs: string;
  tone: Tone;
  role?: string;
  metric?: { value: string; label: string };
  shots?: WorkShot[];
  figures?: string[];
  practice: boolean;
  play?: boolean;
  href?: string;
  cover?: string;
  note?: string;
  fit?: "cover" | "contain";
};

export const works: Work[] = [
  {
    index: "01",
    slug: "ai-custom-emoji",
    code: "DS-W001",
    title: "AI 定制表情包",
    navTitle: "AI 定制表情包",
    category: "已发布作品",
    filedAs: "已发布作品 / 2025",
    tone: "sand",
    role: "本人负责选题与脚本，团队完成成片。",
    metric: { value: "70 万", label: "自然播放量 · 作品总记录" },
    figures: ["01-ai-emoji-finished-frames", "01-ai-emoji-publish-record"],
    shots: [
      { code: "DS-W001-S01", label: "成片画面 / 团队完成", figure: "01-ai-emoji-finished-frames" },
      { code: "DS-W001-S02", label: "作品发布记录", figure: "01-ai-emoji-publish-record" },
    ],
    play: true,
    practice: false,
  },
  {
    index: "02",
    slug: "libtv-ai-portrait",
    code: "DS-W002",
    title: "LibTV · AI 人像",
    navTitle: "LibTV · AI 人像",
    cardEn: "TOO PERFECT\nTO BE REAL",
    figures: ["02-libtv-outline"],
    category: "专题片",
    filedAs: "专题片",
    tone: "mist",
    practice: false,
  },
  {
    index: "03",
    slug: "duxinshu-storyboard",
    code: "DS-W003",
    title: "AI「读心术」分镜脚本",
    navTitle: "AI「读心术」",
    cardEn: "FROM IDEA\nTO FRAME",
    figures: ["03-storyboard-01-04", "03-storyboard-05-08"],
    category: "分镜脚本",
    filedAs: "分镜脚本",
    tone: "paper",
    practice: false,
  },
  {
    index: "04",
    slug: "find-the-next-story",
    title: "选题与账号研究",
    navTitle: "选题与账号研究",
    cardEn: "FIND THE\nNEXT STORY",
    figures: [
      "04-ksen-account-breakdown",
      "04-competitor-research-1",
      "04-competitor-research-2",
      "04-topic-library-1",
      "04-topic-library-2",
    ],
    category: "研究文案",
    filedAs: "研究文案 / 2026 作品集",
    tone: "stone",
    practice: true,
  },
  {
    index: "05",
    slug: "benshuo-pingqianpan",
    title: "本土说·屏前盘",
    navTitle: "本土说·屏前盘",
    cardEn: "MAKE.\nMEASURE.\nRETHINK.",
    figures: ["05-mutu-weekly-review"],
    category: "个人实验",
    filedAs: "个人实验 / 2026 作品集",
    tone: "clay",
    practice: true,
  },
  {
    index: "06",
    slug: "a-system-for-ideas",
    title: "素材与知识管理",
    navTitle: "素材与知识管理",
    cardEn: "A SYSTEM\nFOR IDEAS",
    figures: ["06-knowledge-archive", "06-learning-index"],
    category: "工作方法",
    filedAs: "工作方法 / 2026 作品集",
    tone: "slate",
    practice: true,
  },
  {
    index: "07",
    slug: "visual-materials",
    title: "封面与内容视觉物料",
    navTitle: "封面与内容视觉物料",
    category: "视觉物料",
    filedAs: "封面 · 帖截图 · 参考画面",
    tone: "paper",
    note: "三张物料原图。图中的账号、封面与参考画面不作为本站署名作品。",
    figures: ["01-cover-grid", "02-xiaohongshu-grid", "03-textures-and-refs"],
    shots: [
      { code: "01", label: "AI 视频封面", figure: "01-cover-grid" },
      { code: "02", label: "小红书帖截图", figure: "02-xiaohongshu-grid" },
      { code: "03", label: "纸纹与参考画面", figure: "03-textures-and-refs" },
    ],
    fit: "contain",
    practice: false,
  },
  {
    index: "09",
    slug: "asset-library",
    title: "素材库",
    navTitle: "素材库",
    category: "素材库",
    filedAs: "音乐与音效",
    tone: "mist",
    note: "网站列表和曲目封面是收集的音乐与音效素材库，不是本站署名的原创作品。",
    cover: assetUrl("/works/asset-library/19-asset-library-01.png"),
    fit: "contain",
    practice: false,
  },
];

export const assetLibraryImages = [
  "/works/asset-library/19-asset-library-01.png",
  "/works/asset-library/20-asset-library-02.png",
  "/works/asset-library/21-asset-library-03.png",
  "/works/asset-library/22-asset-library-04.png",
  "/works/asset-library/23-asset-library-05.png",
  "/works/asset-library/24-asset-library-06.png",
] as const;

export const textPortfolioModule: Work = {
  index: "10",
  slug: "text-portfolio",
  title: "文字版作品集",
  navTitle: "文字版作品集",
  cardEn: "DU\nSHUCONG",
  category: "文字版",
  filedAs: "杜书从｜彬彬AI说作品集",
  tone: "slate",
  note: "把技术的新意，变成看得懂的内容。",
  href: "https://my.feishu.cn/wiki/AhsGwy2iuibTO6kYyofckdzJnRb",
  practice: false,
};

export const libraryModule: Work = {
  index: "08",
  slug: "style-library",
  title: "341 画风库",
  navTitle: "341 画风库",
  category: "风格提示词",
  filedAs: "可检索 · 可复制",
  tone: "slate",
  note: "341 种风格提示词，可检索、可复制；193 张静帧。",
  href: "/library/index.html",
  cover: assetUrl("/library/代码动画/风格提示词/Z_中国风/Z5_剪纸.jpg"),
  practice: false,
};

export const practiceWorks = works.filter((work) => work.practice);

export function getWork(slug: string) {
  return works.find((work) => work.slug === slug);
}

export function getNextWork(slug: string) {
  const index = works.findIndex((work) => work.slug === slug);
  if (index < 0) return works[0];
  return works[(index + 1) % works.length];
}

export const heroFoot = "选题与脚本 · 分镜脚本 · 研究文案 · 个人实验 · 工作方法";

export const education = "中国传媒大学（动漫设计）";

export const profileBody = [
  "杜书从，AI 内容编导与创作者。",
  "中国传媒大学（动漫设计）。",
  "作品集收录已发布成片、专题片与分镜脚本，以及研究文案、个人实验和工作方法。",
  "已发布成片《AI 定制表情包》写明：本人负责选题与脚本，团队完成成片。",
];

export const careerEntries = [
  {
    rail: "2025.12–2026.09",
    title: "彬彬AI说 / 流星韵（杭州）传媒有限公司",
    meta: "AI IP 编导",
    body: "内容策划、脚本与交付跟进。任职期推进 16 条商单，涉及豆包、小云雀AI、MVLAND、即梦等品牌。参与团队运营：任职期发布 96 条作品，账号粉丝约 1 万 → 12 万。发布量与粉丝增长为团队成果。",
  },
  {
    rail: "2024.11–2025.11",
    title: "Gary科技宅 / 海宁盐漫文化传媒有限公司",
    meta: "IP 编导 / 内容运营",
    body: "与团队共同运营，参与红魔、iQOO、努比亚商单脚本与交付跟进。团队运营期间，账号粉丝 1.5 万 → 25 万。",
  },
  {
    rail: "2023.03–2024.10",
    title: "超哥研究所Ultra / 小糖豆文化传媒（北京）有限公司",
    meta: "IP 内容运营",
    body: "数码 3C 内容制作、资料整理、发布与反馈复盘。",
  },
];

export const systemCards = [
  {
    title: "选题与脚本",
    body: "已发布成片里，本人负责选题与脚本，团队完成成片。",
  },
  {
    title: "分镜脚本",
    body: "AI「读心术」归档为分镜脚本。画面标题是 FROM IDEA TO FRAME。",
  },
  {
    title: "研究与实验",
    body: "选题与账号研究归档为研究文案。本土说·屏前盘归档为个人实验，画面标题是 MAKE. MEASURE. RETHINK.",
  },
  {
    title: "素材与方法",
    body: "素材与知识管理归档为工作方法。画面标题是 A SYSTEM FOR IDEAS。",
  },
];

export const timelineEntries = [
  {
    rail: "2025",
    title: "AI 定制表情包",
    meta: "DS-W001 · 已发布作品",
    body: "本人负责选题与脚本，团队完成成片。自然播放量 70 万。",
    href: "/works/ai-custom-emoji",
  },
  {
    rail: "DS-W002",
    title: "LibTV · AI 人像",
    meta: "专题片",
    body: "专题片。画面标题 TOO PERFECT TO BE REAL。",
    href: "/works/libtv-ai-portrait",
  },
  {
    rail: "DS-W003",
    title: "AI「读心术」分镜脚本",
    meta: "分镜脚本",
    body: "分镜脚本。画面标题 FROM IDEA TO FRAME。",
    href: "/works/duxinshu-storyboard",
  },
  {
    rail: "2026",
    title: "研究、实验与工作方法",
    meta: "2026 作品集",
    body: "选题与账号研究，研究文案。本土说·屏前盘，个人实验。素材与知识管理，工作方法。",
    href: "/#works",
  },
];

export const statement = "关于 AI、内容和新的可能。";

export function workFacts(work: Work) {
  const facts: { label: string; value: string }[] = [
    { label: "标题", value: work.title },
    { label: "归档", value: work.filedAs },
  ];
  if (work.code) facts.unshift({ label: "编号", value: work.code });
  if (work.cardEn) {
    facts.push({
      label: "画面标题",
      value: work.cardEn.replaceAll("\n", " "),
    });
  }
  return facts;
}
