import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { ContactDesk } from "@/components/contact-desk";
import { HeroPortal } from "@/components/hero-portal";
import { FilmCoverflow } from "@/components/film-coverflow";
import { MethodBoards } from "@/components/method-boards";
import { ScurveGallery, type GalleryPanel } from "@/components/scurve-gallery";
import {
  careerEntries,
  libraryModule,
  profile,
  profileBody,
  statement,
  systemCards,
  textPortfolioModule,
  timelineEntries,
  works,
  type Work,
} from "@/lib/content";
import { resolveFigures } from "@/lib/stills";

const featuredOrder = [
  "ai-custom-emoji",
  "libtv-ai-portrait",
  "duxinshu-storyboard",
  "find-the-next-story",
  "a-system-for-ideas",
  "style-library",
  "visual-materials",
  "asset-library",
];

function coverFor(work: Work) {
  return work.cover || resolveFigures(work.figures)[0] || "";
}

export default function HomePage() {
  const hasQr = fs.existsSync(path.join(process.cwd(), "public", "wechat-qr.png"));
  const catalog = new Map<string, Work>([
    ...works.map((work) => [work.slug, work] as const),
    [libraryModule.slug, libraryModule],
  ]);
  const panels: GalleryPanel[] = featuredOrder.flatMap((slug) => {
    const work = catalog.get(slug);
    const image = work ? coverFor(work) : "";
    if (!work || !image) return [];
    return [
      {
        id: work.slug,
        title: work.title,
        href: work.href ?? `/works/${work.slug}`,
        image,
        external: Boolean(work.href?.startsWith("http")),
        metric: work.metric,
      },
    ];
  });

  return (
    <div className="relative">
      <HeroPortal />

      <section className="overflow-x-hidden py-16 sm:py-20">
        <div className="mx-auto flex max-w-6xl items-end justify-between gap-6 px-4 sm:px-6">
          <div>
            <p className="font-mono text-[11px] tracking-[0.28em] text-[#e5ca7e]">FEATURED WORKS</p>
            <h2 className="mt-3 text-3xl text-[#f6eddf] sm:text-5xl">精选作品与工作方法</h2>
          </div>
          <a
            href={textPortfolioModule.href}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 font-mono text-[11px] tracking-[0.16em] text-[#e5ca7e]"
          >
            {textPortfolioModule.title}
          </a>
        </div>
        <div className="mt-6">
          <ScurveGallery panels={panels} />
        </div>
      </section>

      <section id="works" className="overflow-x-hidden px-4 pb-8 pt-6 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-[11px] tracking-[0.28em] text-[#e5ca7e]">《AIGC作品短片》</p>
        </div>
        <div className="mt-6">
          <FilmCoverflow />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="font-mono text-[11px] tracking-[0.28em] text-[#e5ca7e]">《完整工作流》</p>
        <div className="mt-6">
          <MethodBoards />
        </div>
      </section>

      <section id="profile" className="reveal-block bg-[#f3efe4] text-[#1b1915]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="font-mono text-[11px] tracking-[0.28em] text-[#8d7040]">PROFILE</p>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <h2 className="text-4xl font-medium leading-[1.05] tracking-tight sm:text-6xl">
              AI 内容编导
              <span className="mt-2 block text-[0.62em] text-[#1b1915]/80">{profile.role}</span>
            </h2>
            <div className="space-y-4 text-sm leading-7 text-[#3a372f] sm:text-base">
              {profileBody.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>

          <div id="system" className="mt-20">
            <p className="font-mono text-[11px] tracking-[0.28em] text-[#8d7040]">CREATIVE SYSTEM</p>
            <h3 className="mt-3 max-w-xl text-3xl leading-tight sm:text-4xl">选题、分镜、研究与方法</h3>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {systemCards.map((card) => (
                <li key={card.title} className="skill-card reveal-card rounded-2xl bg-white/80 p-6 shadow-[0_10px_30px_rgb(40_30_10/6%)]">
                  <h4 className="text-lg">{card.title}</h4>
                  <p className="mt-3 text-sm leading-7 text-[#4a463e]">{card.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="timeline" className="reveal-block mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <p className="font-mono text-[11px] tracking-[0.28em] text-[#e5ca7e]">TIMELINE</p>
        <h2 className="mt-4 max-w-3xl text-3xl leading-tight text-[#f6eddf] sm:text-5xl">
          中国传媒大学（动漫设计），以及三段编导与运营任职。
        </h2>
        <ol className="mt-14 border-l border-white/15 pl-6 sm:pl-10">
          {careerEntries.map((entry) => (
            <li key={entry.rail} className="reveal-card relative pb-12">
              <span className="absolute -left-[1.85rem] top-1.5 size-2.5 rounded-full bg-[#e5ca7e] sm:-left-[2.85rem]" />
              <article className="max-w-2xl rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
                <p className="font-mono text-[11px] tracking-[0.18em] text-[#d8bf79]">{entry.rail}</p>
                <h3 className="font-drama mt-2 text-2xl text-[#f6eddf]">{entry.title}</h3>
                <p className="mt-1 font-mono text-[10px] tracking-[0.14em] text-[#f6eddf]/40">{entry.meta}</p>
                <p className="mt-3 text-sm leading-7 text-[#f6eddf]/72">{entry.body}</p>
              </article>
            </li>
          ))}
          {timelineEntries.map((entry) => (
            <li key={entry.rail + entry.title} className="reveal-card relative pb-12">
              <span className="absolute -left-[1.85rem] top-1.5 size-2.5 rounded-full bg-[#e5ca7e] sm:-left-[2.85rem]" />
              <Link href={entry.href} className="block max-w-2xl rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
                <p className="font-mono text-[11px] tracking-[0.18em] text-[#d8bf79]">{entry.rail}</p>
                <h3 className="font-drama mt-2 text-2xl text-[#f6eddf]">{entry.title}</h3>
                <p className="mt-1 font-mono text-[10px] tracking-[0.14em] text-[#f6eddf]/40">{entry.meta}</p>
                <p className="mt-3 text-sm leading-7 text-[#f6eddf]/72">{entry.body}</p>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section id="statement" className="reveal-block px-4 pb-8 sm:px-6">
        <div className="mx-auto max-w-4xl py-16 text-center sm:py-24">
          <p className="font-mono text-[11px] tracking-[0.28em] text-[#e5ca7e]">STATEMENT</p>
          <p className="mt-6 text-3xl leading-snug text-[#f6eddf] sm:text-5xl">{statement}</p>
          <p className="mt-6 font-mono text-[11px] tracking-[0.2em] text-[#f6eddf]/50">
            {profile.nameZh} / {profile.role}
          </p>
        </div>
      </section>

      <section id="contact" className="reveal-block px-4 pb-20 sm:px-6">
        <div className="mx-auto max-w-5xl rounded-[1.6rem] border border-white/10 bg-[#0c1220] px-5 py-8 sm:px-10 sm:py-12">
          <ContactDesk hasQr={hasQr} />
        </div>
      </section>
    </div>
  );
}
