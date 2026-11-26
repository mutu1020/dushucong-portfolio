import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { ContactDesk } from "@/components/contact-desk";
import { FilmModule } from "@/components/film-modules";
import { HeroPortal } from "@/components/hero-portal";
import { assetUrl } from "@/lib/base-path";
import {
  careerEntries,
  libraryModule,
  profile,
  profileBody,
  statement,
  systemCards,
  timelineEntries,
  works,
} from "@/lib/content";
import { resolveFigure } from "@/lib/stills";

const placements: Record<string, { span: string; shape: "portrait" | "landscape" | "square" }> = {
  "ai-custom-emoji": { span: "md:col-span-7 md:mt-8", shape: "landscape" },
  "libtv-ai-portrait": { span: "md:col-span-5 md:mt-24", shape: "portrait" },
  "duxinshu-storyboard": { span: "md:col-span-5 md:-mt-10", shape: "portrait" },
  "find-the-next-story": { span: "md:col-span-7 md:mt-14", shape: "landscape" },
  "benshuo-pingqianpan": { span: "md:col-span-4 md:mt-6", shape: "square" },
  "a-system-for-ideas": { span: "md:col-span-8 md:-mt-4", shape: "landscape" },
  "visual-materials": { span: "md:col-span-6 md:mt-16", shape: "portrait" },
  "style-library": { span: "md:col-span-6 md:mt-4", shape: "square" },
};

export default function HomePage() {
  const hasQr = fs.existsSync(path.join(process.cwd(), "public", "wechat-qr.png"));
  const film = works.find((work) => work.slug === "ai-custom-emoji");
  const filmStill = resolveFigure("01-ai-emoji-finished-frames");
  const reel = [...works, libraryModule];

  return (
    <div className="relative">
      <HeroPortal />

      {film ? (
        <section id="works" className="mx-auto max-w-6xl px-4 pb-8 pt-16 sm:px-6 sm:pt-24">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="font-mono text-[11px] tracking-[0.28em] text-[#e5ca7e]">精选影像</p>
              <h2 className="mt-3 text-3xl text-[#f6eddf] sm:text-5xl">{film.title}</h2>
            </div>
            <p className="font-mono text-[11px] tracking-[0.2em] text-[#f6eddf]/45">{film.code}</p>
          </div>
          <div className="mt-10 grid items-start gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4 lg:mt-2 lg:max-w-[280px]">
              <p className="font-mono text-[11px] tracking-[0.2em] text-[#f6eddf]/55">{film.filedAs}</p>
              <video
                className="mt-4 h-auto max-h-[56vh] w-auto max-w-full rounded-[1.25rem] bg-black shadow-[0_24px_70px_rgb(0_0_0/45%)] ring-1 ring-white/15"
                aria-label={film.title}
                controls
                playsInline
                preload="metadata"
                poster={assetUrl("/works/emoji-banana-pro-poster.jpg")}
                src={assetUrl("/works/emoji-banana-pro.mp4")}
              />
              <p className="mt-3 font-mono text-[11px] tracking-[0.16em] text-[#e5ca7e]">观看成片</p>
            </div>
            <div className="lg:col-span-8 lg:mt-20">
              {filmStill ? (
                <figure className="overflow-hidden rounded-[1.5rem] bg-[#10141c] ring-1 ring-white/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={filmStill} alt="" className="max-h-[58vh] w-full object-contain" />
                </figure>
              ) : null}
              <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
                <div className="max-w-xl">
                  {film.role ? <p className="text-sm leading-7 text-[#f6eddf]/78">{film.role}</p> : null}
                  <Link href={`/works/${film.slug}`} className="mt-4 inline-block font-mono text-[11px] tracking-[0.18em] text-[#e5ca7e]">
                    {film.index} / {film.navTitle}
                  </Link>
                </div>
                {film.metric ? (
                  <div className="inline-flex min-w-40 flex-col rounded-2xl border border-white/15 bg-[#050913]/55 px-4 py-3">
                    <span className="text-3xl tracking-tight text-[#f6eddf]">{film.metric.value}</span>
                    <span className="mt-1 font-mono text-[10px] tracking-[0.14em] text-[#e5ca7e]">{film.metric.label}</span>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] tracking-[0.28em] text-[#e5ca7e]">FEATURED WORKS</p>
            <h2 className="mt-3 text-3xl text-[#f6eddf] sm:text-5xl">精选作品与工作方法</h2>
          </div>
          <p className="font-mono text-[11px] tracking-[0.2em] text-[#f6eddf]/45">08</p>
        </div>
        <div className="mt-10 grid grid-cols-1 items-start gap-x-5 gap-y-8 md:grid-cols-12">
          {reel.map((work) => {
            const place = placements[work.slug] ?? { span: "md:col-span-6", shape: "landscape" as const };
            return (
              <div key={work.slug} className={place.span}>
                <FilmModule work={work} shape={place.shape} />
              </div>
            );
          })}
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
