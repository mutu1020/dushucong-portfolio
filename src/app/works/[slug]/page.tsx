import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { assetUrl } from "@/lib/base-path";
import { getNextWork, getWork, works } from "@/lib/content";
import { resolveFigure, resolveFigures } from "@/lib/stills";

type Params = { slug: string };

const scenes: Record<string, string> = {
  "ai-custom-emoji": "bg-[radial-gradient(ellipse_at_25%_20%,#9a7344_0%,#2a1c12_42%,#050913_78%)]",
  "libtv-ai-portrait": "bg-[radial-gradient(ellipse_at_70%_15%,#7d8b9c_0%,#1c2836_46%,#050913_80%)]",
  "duxinshu-storyboard": "bg-[radial-gradient(ellipse_at_30%_70%,#4d5a40_0%,#14180f_48%,#050913_82%)]",
  "find-the-next-story": "bg-[radial-gradient(ellipse_at_80%_30%,#5a4e3c_0%,#1a1612_50%,#050913_84%)]",
  "benshuo-pingqianpan": "bg-[radial-gradient(ellipse_at_40%_20%,#6a5a48_0%,#1a1612_52%,#050913_84%)]",
  "a-system-for-ideas": "bg-[radial-gradient(ellipse_at_50%_0%,#465066_0%,#12161e_52%,#050913_86%)]",
};

export const dynamicParams = false;

export function generateStaticParams() {
  return works.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) return { title: "作品" };
  return { title: work.title, description: `${work.title}。${work.filedAs}。` };
}

export default async function WorkPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  if (slug === "juxinshu-storyboard") redirect("/works/duxinshu-storyboard");
  const work = getWork(slug);
  if (!work) notFound();
  const next = getNextWork(work.slug);
  const cover = resolveFigures(work.figures)[0];
  const hasFilm = work.slug === "ai-custom-emoji";
  const frames = (work.shots ?? [])
    .map((shot) => ({ ...shot, src: shot.figure ? resolveFigure(shot.figure) : undefined }))
    .filter((shot) => shot.src);
  const extra = resolveFigures(work.figures).filter(
    (src) => src !== cover && !frames.some((shot) => shot.src === src),
  );

  return (
    <article className="bg-[#050913]">
      <div className={`relative min-h-[100svh] ${cover && !hasFilm ? "" : scenes[work.slug] ?? "bg-[#050913]"}`}>
        {cover && !hasFilm ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cover}
            alt=""
            className={`absolute inset-0 h-full w-full ${work.fit === "contain" ? "object-contain" : "object-cover"}`}
          />
        ) : null}
        <div className="vignette pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgb(5_9_19/92%),rgb(5_9_19/28%)_46%,transparent_70%)]" />
        <header className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 py-5 sm:px-8">
          <Link href="/#works" className="font-mono text-[11px] tracking-[0.18em] text-[#f6eddf]/80">
            ← 杜书从
          </Link>
          <p className="font-mono text-[11px] tracking-[0.18em] text-[#e5ca7e]">{work.code ?? work.index}</p>
        </header>
        <ol className="absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-3 md:flex">
          {works.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/works/${item.slug}`}
                aria-current={item.slug === work.slug ? "page" : undefined}
                className={item.slug === work.slug ? "font-mono text-[11px] text-[#e5ca7e]" : "font-mono text-[11px] text-[#f6eddf]/35"}
              >
                {item.index}
              </Link>
            </li>
          ))}
        </ol>
        <div className={`relative z-10 flex min-h-[100svh] flex-col px-5 pb-16 pt-24 sm:px-10 lg:px-16 ${hasFilm ? "items-center justify-start text-center" : "justify-end"}`}>
          {hasFilm ? (
            <video
              className="h-[min(72vh,820px)] w-auto max-w-[min(92vw,420px)] rounded-[1.5rem] bg-black shadow-[0_30px_80px_rgba(0,0,0,0.45)] ring-1 ring-white/20"
              controls
              playsInline
              preload="metadata"
              poster={assetUrl("/works/emoji-banana-pro-poster.jpg")}
              src={assetUrl("/works/emoji-banana-pro.mp4")}
            />
          ) : null}
          <p className="font-mono text-[11px] tracking-[0.22em] text-[#e5ca7e]">
            {work.index} / {work.filedAs}
          </p>
          <h1 className={`font-drama mt-4 max-w-4xl text-[#f6eddf] ${hasFilm ? "text-4xl sm:text-5xl" : "text-[clamp(3rem,8vw,6.5rem)] leading-[0.92]"}`}>{work.title}</h1>
          {work.cardEn ? (
            <p className="mt-4 font-mono text-[11px] tracking-[0.16em] text-[#d8bf79]">{work.cardEn.replaceAll("\n", " ")}</p>
          ) : null}
          {work.note ? <p className="mt-6 max-w-xl text-base leading-8 text-[#f6eddf]/80">{work.note}</p> : null}
          {work.role ? <p className="mt-6 max-w-xl text-base leading-8 text-[#f6eddf]/80">{work.role}</p> : null}
          {work.metric ? (
            <div className="mt-8 inline-flex w-fit flex-col rounded-2xl border border-white/15 bg-[#050913]/55 px-5 py-4 backdrop-blur-md">
              <span className="text-5xl tracking-tight">{work.metric.value}</span>
              <span className="mt-2 font-mono text-[10px] tracking-[0.16em] text-[#e5ca7e]">{work.metric.label}</span>
            </div>
          ) : null}
        </div>
      </div>

      {frames.length > 0 || extra.length > 0 ? (
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6">
          {frames.map((shot) => (
            <figure key={shot.code} className="overflow-hidden rounded-[1.35rem] ring-1 ring-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={shot.src} alt={shot.label} className="w-full bg-[#10141c]" />
              <figcaption className="flex flex-wrap items-baseline justify-between gap-3 bg-[#0c1220] px-5 py-4 text-sm">
                <span className="font-mono text-[11px] text-[#e5ca7e]">{shot.code}</span>
                <span className="text-[#f6eddf]/75">{shot.label}</span>
              </figcaption>
            </figure>
          ))}
          {extra.map((src) => (
            <figure key={src} className="overflow-hidden rounded-[1.35rem] ring-1 ring-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="w-full" />
            </figure>
          ))}
        </div>
      ) : null}

      <div className="px-5 pb-16 sm:px-10">
        <Link href={`/works/${next.slug}`} className="inline-flex items-baseline gap-4 text-[#f6eddf]">
          <span className="font-mono text-[10px] tracking-[0.22em] text-[#e5ca7e]">NEXT</span>
          <span className="font-drama text-2xl">{next.title}</span>
        </Link>
      </div>
    </article>
  );
}
