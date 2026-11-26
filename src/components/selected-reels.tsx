import type { ReactNode } from "react";
import Link from "next/link";
import { assetUrl } from "@/lib/base-path";
import { works } from "@/lib/content";
import { resolveFigure } from "@/lib/stills";

type Reel = {
  id: string;
  title: string;
  src: string;
  poster: string;
  duration: string;
  span: string;
};

const corporate: Reel[] = [
  {
    id: "01-novagrid-xinyue",
    title: "新曜能源 NovaGrid",
    src: "/works/films/01-novagrid-xinyue.mp4",
    poster: "/works/films/01-novagrid-xinyue.jpg",
    duration: "15s",
    span: "md:col-span-7",
  },
  {
    id: "02-ziunsun-zhongsheng",
    title: "广东钛金中晟科技",
    src: "/works/films/02-ziunsun-zhongsheng.mp4",
    poster: "/works/films/02-ziunsun-zhongsheng.jpg",
    duration: "76s",
    span: "md:col-span-5 md:mt-16",
  },
  {
    id: "06-mengniu",
    title: "蒙牛纯牛奶",
    src: "/works/films/06-mengniu.mp4",
    poster: "/works/films/06-mengniu.jpg",
    duration: "30s",
    span: "md:col-span-8 md:col-start-4 md:-mt-4",
  },
];

const dramas: Reel[] = [
  {
    id: "03-ai-drama-gufeng-a",
    title: "AI古风漫剧",
    src: "/works/films/03-ai-drama-gufeng-a.mp4",
    poster: "/works/films/03-ai-drama-gufeng-a.jpg",
    duration: "3:47",
    span: "md:col-span-7",
  },
  {
    id: "04-ai-drama-shengnan",
    title: "AI现代剧",
    src: "/works/films/04-ai-drama-shengnan.mp4",
    poster: "/works/films/04-ai-drama-shengnan.jpg",
    duration: "4:20",
    span: "md:col-span-5 md:mt-14",
  },
  {
    id: "07-ai-drama-weiwandai",
    title: "AI现代剧",
    src: "/works/films/07-ai-drama-weiwandai.mp4",
    poster: "/works/films/07-ai-drama-weiwandai.jpg",
    duration: "2:12",
    span: "md:col-span-6 md:col-start-4 md:mt-6",
  },
  {
    id: "05-ai-drama-xujian",
    title: "AI现代剧",
    src: "/works/films/05-ai-drama-xujian.mp4",
    poster: "/works/films/05-ai-drama-xujian.jpg",
    duration: "4:00",
    span: "md:col-span-5 md:mt-12",
  },
  {
    id: "08-ai-drama-gufeng-b",
    title: "AI古风漫剧",
    src: "/works/films/08-ai-drama-gufeng-b.mp4",
    poster: "/works/films/08-ai-drama-gufeng-b.jpg",
    duration: "3:42",
    span: "md:col-span-7 md:mt-4",
  },
];

const shorts: Reel[] = [
  {
    id: "09-powall-ai-rewrite",
    title: "破壁·泡漫AI",
    src: "/works/films/09-powall-ai-rewrite.mp4",
    poster: "/works/films/09-powall-ai-rewrite.jpg",
    duration: "20s",
    span: "md:col-span-7 md:mt-6",
  },
  {
    id: "10-short-glasses",
    title: "AI影像短片",
    src: "/works/films/10-short-glasses.mp4",
    poster: "/works/films/10-short-glasses.jpg",
    duration: "26s",
    span: "md:col-span-5 md:-mt-8",
  },
  {
    id: "11-short-phone",
    title: "AI影像短片",
    src: "/works/films/11-short-phone.mp4",
    poster: "/works/films/11-short-phone.jpg",
    duration: "23s",
    span: "md:col-span-6 md:col-start-2 md:mt-10",
  },
];

function ReelPlayer({ film }: { film: Reel }) {
  return (
    <figure className={film.span}>
      <video
        className="h-auto max-h-[46vh] w-full rounded-[1.25rem] bg-black object-contain shadow-[0_24px_70px_rgb(0_0_0/45%)] ring-1 ring-white/15"
        aria-label={film.title}
        controls
        playsInline
        preload="metadata"
        poster={assetUrl(film.poster)}
        src={assetUrl(film.src)}
      />
      <figcaption className="mt-3 flex items-baseline justify-between gap-3">
        <span className="text-sm text-[#f6eddf]">{film.title}</span>
        <span className="font-mono text-[10px] tracking-[0.14em] text-[#e5ca7e]">{film.duration}</span>
      </figcaption>
    </figure>
  );
}

function Group({ label, id, children }: { label: string; id?: string; children: ReactNode }) {
  return (
    <div id={id} className="mt-16 first:mt-10">
      <h3 className="font-mono text-[11px] tracking-[0.28em] text-[#e5ca7e]">{label}</h3>
      {children}
    </div>
  );
}

export function SelectedReels() {
  const film = works.find((work) => work.slug === "ai-custom-emoji");
  const filmStill = resolveFigure("01-ai-emoji-finished-frames");

  return (
    <section id="works" className="mx-auto max-w-6xl px-4 pb-8 pt-16 sm:px-6 sm:pt-24">
      <p className="font-mono text-[11px] tracking-[0.28em] text-[#e5ca7e]">精选影像</p>
      <Group label="企业宣传片">
        <div className="mt-6 grid grid-cols-1 items-start gap-x-6 gap-y-8 md:grid-cols-12">
          {corporate.map((item) => (
            <ReelPlayer key={item.id} film={item} />
          ))}
        </div>
      </Group>
      {film ? (
        <Group label="已发布成片">
          <div className="mt-6 grid items-start gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4 lg:mt-2 lg:max-w-[280px]">
              <p className="font-mono text-[11px] tracking-[0.2em] text-[#f6eddf]/55">{film.filedAs}</p>
              <h2 className="mt-3 text-3xl text-[#f6eddf]">{film.title}</h2>
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
                    {film.code} / {film.navTitle}
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
        </Group>
      ) : null}
      <Group label="短片">
        <div className="mt-6 grid grid-cols-1 items-start gap-x-6 gap-y-8 md:grid-cols-12">
          {shorts.map((item) => (
            <ReelPlayer key={item.id} film={item} />
          ))}
        </div>
      </Group>
      <Group id="ai-drama" label="AI漫剧">
        <div className="mt-6 grid grid-cols-1 items-start gap-x-6 gap-y-8 md:grid-cols-12">
          {dramas.map((item) => (
            <ReelPlayer key={item.id} film={item} />
          ))}
        </div>
      </Group>
    </section>
  );
}
