import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { assetUrl } from "@/lib/base-path";

export const metadata: Metadata = {
  title: "文字版作品集",
  description: "杜书从｜彬彬AI说作品集。关于、六件作品与任职记录。",
};

const pdf = "/Du-Shucong-Portfolio.pdf";

export default function TextPortfolioPage() {
  const hasQr = fs.existsSync(path.join(process.cwd(), "public", "wechat-qr.png"));

  return (
    <article className="bg-[#f3efe4] text-[#1b1915]">
      <header className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4 px-5 py-6 sm:px-0">
        <Link href="/#works" className="font-mono text-[11px] tracking-[0.18em] text-[#1b1915]/70">
          ← 杜书从
        </Link>
        <a
          href={assetUrl(pdf)}
          download
          className="font-mono text-[11px] tracking-[0.18em] text-[#8d7040]"
        >
          下载 PDF
        </a>
      </header>

      <div className="mx-auto max-w-3xl px-5 pb-24 sm:px-0">
        <p className="font-mono text-[11px] tracking-[0.28em] text-[#8d7040]">杜书从｜彬彬AI说作品集</p>
        <h1 className="font-drama mt-4 text-4xl leading-tight sm:text-6xl">文字版作品集</h1>
        <p className="mt-6 max-w-xl text-lg leading-8">把技术的新意，变成看得懂的内容。</p>
        <p className="mt-3 font-mono text-[11px] tracking-[0.16em] text-[#1b1915]/55">
          杜书从 / AI 内容编导与创作者
        </p>

        <section className="mt-16">
          <h2 className="font-drama text-3xl">关于</h2>
          <p className="mt-2 font-mono text-[11px] tracking-[0.2em] text-[#8d7040]">IDEAS IN MOTION</p>
          <p className="mt-6 text-sm leading-8 text-[#3a372f]">杜书从 · 选题 / 脚本 / 内容实践</p>
          <div className="mt-6 space-y-4 text-base leading-8">
            <p>我是杜书从，AI 内容编导与创作者。</p>
            <p>关注技术如何进入日常，也关注一个复杂的想法，怎样变成观众愿意看下去的内容。</p>
            <p>从数码 3C 到 AI 工具，我参与内容策划、脚本撰写与交付跟进。我的工作从一个具体问题开始：观众为什么要看？</p>
            <p>找到切入点之后，再把信息变成故事、操作步骤和镜头。最后回到数据与反馈，看看哪里被理解，哪里还需要重写。</p>
          </div>
          <h3 className="mt-10 text-lg">工作内容</h3>
          <ul className="mt-4 space-y-2 text-base leading-8">
            <li>AI / 科技内容策划</li>
            <li>选题研究与账号拆解</li>
            <li>口播脚本与分镜</li>
            <li>商单内容与交付跟进</li>
            <li>内容运营与数据复盘</li>
          </ul>
        </section>

        <section className="mt-16">
          <h2 className="font-drama text-3xl">任职记录</h2>
          <p className="mt-6 text-base leading-8">
            任职中的品牌合作：需求沟通 → 卖点梳理与选题 → 大纲/脚本 → 审稿修改 → 拍摄协调 → 成片修改与交付。本人主要承担内容策划、脚本和交付跟进。
          </p>
          <div className="mt-8 space-y-8">
            <div>
              <p className="font-mono text-[11px] tracking-[0.16em] text-[#8d7040]">2025.12 — 2026.09</p>
              <h3 className="mt-2 text-xl">彬彬AI说 / 流星韵（杭州）传媒有限公司</h3>
              <p className="mt-1 text-sm text-[#3a372f]">AI IP 编导</p>
              <p className="mt-3 text-base leading-8">
                内容策划、脚本与交付跟进。任职期推进 16 条商单，涉及豆包、小云雀AI、MVLAND、即梦；小云雀AI合作 3 次。单条报价 8,000 至 10,000 元，报价不等于成交收入。参与团队运营：任职期发布 96 条作品，账号粉丝约 1 万 → 12 万。
              </p>
            </div>
            <div>
              <p className="font-mono text-[11px] tracking-[0.16em] text-[#8d7040]">2024.11 — 2025.11</p>
              <h3 className="mt-2 text-xl">Gary科技宅 / 海宁盐漫文化传媒有限公司</h3>
              <p className="mt-1 text-sm text-[#3a372f]">IP 编导 / 内容运营</p>
              <p className="mt-3 text-base leading-8">
                与团队共同运营，参与红魔、iQOO、努比亚商单脚本与交付跟进。任职期间账号与上述品牌各累计合作 3 至 4 次。团队运营期间，账号粉丝 1.5 万 → 25 万。
              </p>
            </div>
            <div>
              <p className="font-mono text-[11px] tracking-[0.16em] text-[#8d7040]">2023.03 — 2024.10</p>
              <h3 className="mt-2 text-xl">超哥研究所Ultra / 小糖豆文化传媒（北京）有限公司</h3>
              <p className="mt-1 text-sm text-[#3a372f]">IP 内容运营</p>
              <p className="mt-3 text-base leading-8">
                数码 3C 内容制作、资料整理、发布与反馈复盘。
              </p>
            </div>
          </div>
          <p className="mt-8 text-base leading-8">
            以上发布量与粉丝增长为团队成果，按作品集记录呈现。账号增长、发布数量为团队结果；本人负责范围见各条作品。
          </p>
        </section>

        <section className="mt-16">
          <h2 className="font-drama text-3xl">六件作品</h2>
          <p className="mt-3 font-mono text-[11px] tracking-[0.16em] text-[#1b1915]/55">已发布作品 / 策划与脚本 / 研究与个人实践</p>

          <article className="mt-10 border-t border-[#1b1915]/15 pt-8">
            <p className="font-mono text-[11px] tracking-[0.16em] text-[#8d7040]">DS-W001 / 已发布作品 / 2025</p>
            <h3 className="font-drama mt-2 text-2xl">AI 定制表情包</h3>
            <p className="mt-2 font-mono text-[11px] tracking-[0.14em] text-[#1b1915]/55">MAKE IT PERSONAL</p>
            <p className="mt-4 text-base leading-8">让一张照片，变成一套自己的表情包。</p>
            <p className="mt-4 text-base leading-8">本人负责选题与脚本，团队完成成片。</p>
            <p className="mt-4 text-base leading-8">
              从看得见的成品效果切入，再把工具和操作拆成普通用户能跟上的步骤。让观众先知道能做出什么，再知道自己怎么做。
            </p>
            <ul className="mt-4 space-y-2 text-base leading-8">
              <li>切入点：先展示定制表情包，建立观看理由；随后进入工具与操作流程。</li>
              <li>脚本结构：成品效果 → 工具介绍 → 分步操作 → 成果展示。</li>
              <li>作品记录：2025 年 12 月 19 日发布。作品集记录自然流播放 70 万、点赞 1.4 万、收藏 1.6 万。数据为作品集中的历史记录。</li>
            </ul>
            <p className="mt-4 text-base leading-8">
              <Link href="/works/ai-custom-emoji" className="text-[#8d7040]">查看案例</Link>
            </p>
          </article>

          <article className="mt-10 border-t border-[#1b1915]/15 pt-8">
            <p className="font-mono text-[11px] tracking-[0.16em] text-[#8d7040]">DS-W002 / 策划大纲 / 2026 作品集</p>
            <h3 className="font-drama mt-2 text-2xl">LibTV · AI 人像</h3>
            <p className="mt-2 font-mono text-[11px] tracking-[0.14em] text-[#1b1915]/55">TOO PERFECT TO BE REAL</p>
            <p className="mt-4 text-base leading-8">为什么越精致的 AI 人像，越容易让人觉得假？</p>
            <p className="mt-4 text-base leading-8">商单内容策划大纲展示。</p>
            <p className="mt-4 text-base leading-8">
              从人像与环境的不协调切入，将肤质、光影与边缘的问题拆开，再用同一场戏串起人像调节、故事板和 3D 导演台。
            </p>
            <ul className="mt-4 space-y-2 text-base leading-8">
              <li>开场设计：「这张脸，怎么还是一眼假？」从局部放大回到完整画面，指出人物与环境之间的问题。</li>
              <li>产品融入：先解释现象，再自然转入工具，用同一场戏贯穿功能展示。</li>
              <li>交付形态：策划大纲，包含待制作的对比图与操作结果。</li>
            </ul>
            <p className="mt-4 text-base leading-8">
              <Link href="/works/libtv-ai-portrait" className="text-[#8d7040]">查看案例</Link>
            </p>
          </article>

          <article className="mt-10 border-t border-[#1b1915]/15 pt-8">
            <p className="font-mono text-[11px] tracking-[0.16em] text-[#8d7040]">DS-W003 / 分镜脚本 / 2026 作品集</p>
            <h3 className="font-drama mt-2 text-2xl">AI「读心术」</h3>
            <p className="mt-2 font-mono text-[11px] tracking-[0.14em] text-[#1b1915]/55">FROM IDEA TO FRAME</p>
            <p className="mt-4 text-base leading-8">把一个选题，落到每一镜的画面和声音。</p>
            <p className="mt-4 text-base leading-8">脚本分镜展示。PDF 中可见 8 个镜头。</p>
            <p className="mt-4 text-base leading-8">
              以镜号、时长、景别、机位、画面、台词和音效花字组织脚本，让抽象的内容讨论变成可执行的镜头说明。
            </p>
            <ul className="mt-4 space-y-2 text-base leading-8">
              <li>拆解方式：为每一镜同时安排口播、画面与声音，明确拍摄或剪辑时需要呈现的内容。</li>
              <li>可见范围：展示 PDF 中约 32 秒、8 镜的脚本片段。</li>
              <li>材料性质：脚本片段，重点展示镜头组织、画面安排与口播配合。</li>
            </ul>
            <p className="mt-4 text-base leading-8">
              <Link href="/works/duxinshu-storyboard" className="text-[#8d7040]">查看案例</Link>
            </p>
          </article>

          <article className="mt-10 border-t border-[#1b1915]/15 pt-8">
            <p className="font-mono text-[11px] tracking-[0.16em] text-[#8d7040]">DS-W004 / 研究方法 / 2026 作品集</p>
            <h3 className="font-drama mt-2 text-2xl">选题与账号研究</h3>
            <p className="mt-2 font-mono text-[11px] tracking-[0.14em] text-[#1b1915]/55">FIND THE NEXT STORY</p>
            <p className="mt-4 text-base leading-8">从一条好内容，追到它为什么成立。</p>
            <p className="mt-4 text-base leading-8">第三方账号研究、竞品调研与选题整理。</p>
            <p className="mt-4 text-base leading-8">
              把账号拆解、竞品内容与选题库放在同一条工作路径里，观察栏目、开场、选题角度与内容结构，给下一次策划提供依据。
            </p>
            <ul className="mt-4 space-y-2 text-base leading-8">
              <li>研究对象：包含 K森动画、秋芝2046、徐老师AI 等第三方账号的资料分析。</li>
              <li>工作方式：收集内容 → 分类归档 → 观察结构 → 形成选题参考。</li>
              <li>成果边界：研究对象及其播放、粉丝等表现属于原账号；这里展示的是研究和整理方法。</li>
            </ul>
            <p className="mt-4 text-base leading-8">
              <Link href="/works/find-the-next-story" className="text-[#8d7040]">查看案例</Link>
            </p>
          </article>

          <article className="mt-10 border-t border-[#1b1915]/15 pt-8">
            <p className="font-mono text-[11px] tracking-[0.16em] text-[#8d7040]">DS-W005 / 个人实践 / 2026 作品集</p>
            <h3 className="font-drama mt-2 text-2xl">木土说 · 周复盘</h3>
            <p className="mt-2 font-mono text-[11px] tracking-[0.14em] text-[#1b1915]/55">MAKE. MEASURE. RETHINK.</p>
            <p className="mt-4 text-base leading-8">播放增长之后，还要看观众在哪一秒离开。</p>
            <p className="mt-4 text-base leading-8">个人账号的内容实践与数据复盘。</p>
            <p className="mt-4 text-base leading-8">
              用同一张表记录发布、播放、互动与留存，辨别“更多人看到了”和“更多人留下了”之间的差别。
            </p>
            <ul className="mt-4 space-y-2 text-base leading-8">
              <li>本期记录：2026 年 10 月 15 日周复盘。本期 4 条作品累计播放 24,653，点赞 539。往期 5 条累计播放 9,475。</li>
              <li>复盘发现：两期播放总量上升，但 2 秒跳出率由 38.31% 上升至 42.82%，5 秒完播率由 22.55% 降至 21.13%。开头仍需继续优化。</li>
              <li>比较口径：两期作品数量和发布时间不同，不能将总量变化直接归因于单一策略。</li>
            </ul>
            <p className="mt-4 text-base leading-8">
              <Link href="/works/benshuo-pingqianpan" className="text-[#8d7040]">查看案例</Link>
            </p>
          </article>

          <article className="mt-10 border-t border-[#1b1915]/15 pt-8">
            <p className="font-mono text-[11px] tracking-[0.16em] text-[#8d7040]">DS-W006 / 工作方法 / 2026 作品集</p>
            <h3 className="font-drama mt-2 text-2xl">素材与知识管理</h3>
            <p className="mt-2 font-mono text-[11px] tracking-[0.14em] text-[#1b1915]/55">A SYSTEM FOR IDEAS</p>
            <p className="mt-4 text-base leading-8">让一次学习，成为下一次创作的起点。</p>
            <p className="mt-4 text-base leading-8">创作资源、学习资料与参考内容的归档。</p>
            <p className="mt-4 text-base leading-8">
              把零散的学习资料和创作参考放进可查找的资料库，为选题、脚本和后期协作保留可回溯的线索。
            </p>
            <ul className="mt-4 space-y-2 text-base leading-8">
              <li>归档范围：学习资料、工具说明与创作资源，按内容用途整理。</li>
              <li>使用方式：在创作过程中查找、比较与复用工作方法。</li>
              <li>资料归属：库中的工具指南、参考封面等包含他人原作；此处展示整理方法，不将参考资料标为个人原创。</li>
            </ul>
            <p className="mt-4 text-base leading-8">
              <Link href="/works/a-system-for-ideas" className="text-[#8d7040]">查看案例</Link>
            </p>
          </article>
        </section>

        <section className="mt-16 border-t border-[#1b1915]/15 pt-10">
          <h2 className="font-drama text-3xl">联系</h2>
          <p className="mt-4 text-base leading-8">扫码，加个微信。</p>
          <p className="mt-2 text-base leading-8">关于 AI、内容和新的可能。</p>
          <p className="mt-4 text-sm leading-7 text-[#3a372f]">想聊的主题：工作机会、AI 科技内容、选题与脚本、品牌内容合作、创作交流。</p>
          {hasQr ? (
            <div className="mt-8">
              <a href={assetUrl("/wechat-qr.png")} download className="inline-block bg-white p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={assetUrl("/wechat-qr.png")} alt="杜书从的微信二维码" width={220} height={220} className="size-44" />
              </a>
              <a href={assetUrl("/wechat-qr.png")} download className="mt-3 block font-mono text-[11px] tracking-[0.14em] text-[#8d7040]">
                保存二维码
              </a>
            </div>
          ) : null}
          <p className="mt-8">
            <a href={assetUrl(pdf)} download className="font-mono text-[11px] tracking-[0.18em] text-[#8d7040]">
              下载 PDF
            </a>
          </p>
          <p className="mt-10 font-mono text-[11px] tracking-[0.14em] text-[#1b1915]/45">© 2026 DU SHUCONG · CONTENT & CURIOSITY</p>
        </section>
      </div>
    </article>
  );
}
