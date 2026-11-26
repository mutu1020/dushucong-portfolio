import Link from "next/link";
import type { Work } from "@/lib/content";
import { resolveFigures } from "@/lib/stills";

const scenes: Record<string, string> = {
  "ai-custom-emoji":
    "bg-[radial-gradient(ellipse_at_20%_10%,#8a6434_0%,#2a1c12_38%,#0a0c14_78%)]",
  "libtv-ai-portrait":
    "bg-[radial-gradient(ellipse_at_70%_20%,#6d7c8e_0%,#243040_42%,#070b14_80%)]",
  "duxinshu-storyboard":
    "bg-[radial-gradient(ellipse_at_30%_80%,#3d4a32_0%,#161910_46%,#070910_82%)]",
  "find-the-next-story":
    "bg-[radial-gradient(ellipse_at_80%_30%,#4a4032_0%,#1a1612_48%,#07080c_84%)]",
  "a-system-for-ideas":
    "bg-[radial-gradient(ellipse_at_50%_0%,#3c4658_0%,#141820_50%,#070910_86%)]",
  "text-portfolio":
    "bg-[radial-gradient(ellipse_at_18%_12%,#4a4032_0%,#16130f_46%,#07080c_82%)]",
};

const frameShape = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[16/10]",
  square: "aspect-square",
} as const;

export function FilmModule({
  work,
  shape = "landscape",
}: {
  work: Work;
  shape?: keyof typeof frameShape;
}) {
  const still = work.cover ?? resolveFigures(work.figures)[0];
  const focus =
    work.slug === "find-the-next-story" ||
    work.slug === "benshuo-pingqianpan" ||
    work.slug === "a-system-for-ideas"
      ? "object-top"
      : "object-center";

  return (
    <Link href={work.href ?? `/works/${work.slug}`} className="group block outline-none">
      <article
        className={`film-frame relative overflow-hidden rounded-[1.35rem] ring-1 ring-white/10 ${frameShape[shape]} ${still ? "bg-[#10141c]" : scenes[work.slug] ?? "bg-[#10141c]"}`}
      >
        {still ? (
          <div className="film-still-wrap absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={still}
              alt=""
              className={`film-still absolute inset-0 h-full w-full ${work.fit === "contain" ? "object-contain" : `object-cover ${focus}`}`}
            />
          </div>
        ) : null}
        <div className="film-glow pointer-events-none absolute inset-0" />
        <div className="vignette absolute inset-0" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(5_9_19/82%),rgb(5_9_19/25%)_42%,transparent_68%)]" />
        <p className="absolute left-5 top-5 font-mono text-[11px] tracking-[0.22em] text-[#e5ca7e] sm:left-8 sm:top-7">
          {work.index}
          <span className="mx-2 text-[#f6eddf]/35">/</span>
          {work.code ?? work.filedAs}
          <span className="mx-2 text-[#f6eddf]/35">/</span>
          {work.category}
        </p>
        {work.cardEn && !still ? (
          <p className="pointer-events-none absolute right-5 top-1/2 hidden max-w-[46%] -translate-y-1/2 text-right text-[clamp(1.6rem,3vw,3.2rem)] font-black leading-[0.86] tracking-[-0.05em] text-white/12 sm:block">
            {work.cardEn.split("\n").map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        ) : null}
        {work.play ? (
          <span className="play-orb pointer-events-none absolute left-1/2 top-[46%] z-10 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/80 bg-black/45 text-2xl text-white">
            ▶
          </span>
        ) : null}
        <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-8">
          <h3 className="font-drama text-[clamp(1.45rem,2.4vw,2.45rem)] leading-none text-[#f6eddf]">{work.title}</h3>
          {work.play ? <p className="mt-2 font-mono text-[11px] tracking-[0.16em] text-[#e5ca7e]">观看成片</p> : null}
          {work.note ? <p className="mt-3 max-w-xl text-sm leading-7 text-[#f6eddf]/78">{work.note}</p> : null}
          {work.role ? <p className="mt-3 max-w-xl text-sm leading-7 text-[#f6eddf]/78">{work.role}</p> : null}
          {work.cardEn && !work.role ? (
            <p className="mt-3 font-mono text-[11px] tracking-[0.16em] text-[#d8bf79]">
              {work.cardEn.replaceAll("\n", " ")}
            </p>
          ) : null}
          {work.metric ? (
            <div className="mt-5 inline-flex min-w-40 flex-col rounded-2xl border border-white/15 bg-[#050913]/55 px-4 py-3 backdrop-blur-md">
              <span className="text-3xl tracking-tight text-[#f6eddf]">{work.metric.value}</span>
              <span className="mt-1 font-mono text-[10px] tracking-[0.14em] text-[#e5ca7e]">{work.metric.label}</span>
            </div>
          ) : null}
        </div>
      </article>
    </Link>
  );
}

