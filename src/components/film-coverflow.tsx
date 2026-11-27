"use client";

import { useEffect, useRef, useState } from "react";
import { assetUrl } from "@/lib/base-path";

type ShowcaseFilm = {
  id: string;
  title: string;
  src: string;
  poster: string;
  portrait?: boolean;
};

const films: ShowcaseFilm[] = [
  {
    id: "01-novagrid-xinyue",
    title: "新曜能源 NovaGrid",
    src: "/works/films/01-novagrid-xinyue.mp4",
    poster: "/works/films/01-novagrid-xinyue.jpg",
  },
  {
    id: "02-ziunsun-zhongsheng",
    title: "广东钛金中晟科技",
    src: "/works/films/02-ziunsun-zhongsheng.mp4",
    poster: "/works/films/02-ziunsun-zhongsheng.jpg",
  },
  {
    id: "06-mengniu",
    title: "蒙牛纯牛奶",
    src: "/works/films/06-mengniu.mp4",
    poster: "/works/films/06-mengniu.jpg",
  },
  {
    id: "emoji-banana-pro",
    title: "AI 定制表情包",
    src: "/works/emoji-banana-pro.mp4",
    poster: "/works/emoji-banana-pro-poster.jpg",
    portrait: true,
  },
  {
    id: "09-powall-ai-rewrite",
    title: "破壁·泡漫AI",
    src: "/works/films/09-powall-ai-rewrite.mp4",
    poster: "/works/films/09-powall-ai-rewrite.jpg",
  },
  {
    id: "10-short-glasses",
    title: "AI影像短片",
    src: "/works/films/10-short-glasses.mp4",
    poster: "/works/films/10-short-glasses.jpg",
  },
  {
    id: "11-short-phone",
    title: "AI影像短片",
    src: "/works/films/11-short-phone.mp4",
    poster: "/works/films/11-short-phone.jpg",
  },
  {
    id: "03-ai-drama-gufeng-a",
    title: "AI古风漫剧",
    src: "/works/films/03-ai-drama-gufeng-a.mp4",
    poster: "/works/films/03-ai-drama-gufeng-a.jpg",
  },
  {
    id: "04-ai-drama-shengnan",
    title: "AI现代剧",
    src: "/works/films/04-ai-drama-shengnan.mp4",
    poster: "/works/films/04-ai-drama-shengnan.jpg",
  },
  {
    id: "07-ai-drama-weiwandai",
    title: "AI现代剧",
    src: "/works/films/07-ai-drama-weiwandai.mp4",
    poster: "/works/films/07-ai-drama-weiwandai.jpg",
  },
  {
    id: "05-ai-drama-xujian",
    title: "AI现代剧",
    src: "/works/films/05-ai-drama-xujian.mp4",
    poster: "/works/films/05-ai-drama-xujian.jpg",
  },
  {
    id: "08-ai-drama-gufeng-b",
    title: "AI古风漫剧",
    src: "/works/films/08-ai-drama-gufeng-b.mp4",
    poster: "/works/films/08-ai-drama-gufeng-b.jpg",
  },
];

function signedOffset(index: number, active: number, count: number) {
  const normalized = ((active % count) + count) % count;
  let delta = index - normalized;
  if (delta > count / 2) delta -= count;
  if (delta < -count / 2) delta += count;
  return delta;
}

export function FilmCoverflow() {
  const activeRef = useRef(0);
  const dragging = useRef(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const reducedRef = useRef(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      reducedRef.current = media.matches;
      setReduced(media.matches);
    };
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (reducedRef.current) {
        frame = requestAnimationFrame(tick);
        return;
      }
      if (!dragging.current) activeRef.current += dt * 0.085;
      setActive(activeRef.current);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const onWheel = (event: WheelEvent) => {
      if (reducedRef.current) return;
      const bounds = stage.getBoundingClientRect();
      const mid = bounds.top + bounds.height / 2;
      const engaged = Math.abs(mid - window.innerHeight / 2) < window.innerHeight * 0.28;
      if (!engaged && Math.abs(event.deltaX) < 8) return;
      if (Math.abs(event.deltaX) < 4 && Math.abs(event.deltaY) < 4) return;
      if (engaged || Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
        event.preventDefault();
        activeRef.current += (event.deltaX + event.deltaY * 0.35) / 520;
      }
    };
    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => stage.removeEventListener("wheel", onWheel);
  }, []);

  const count = films.length;
  const focus = ((Math.round(active) % count) + count) % count;

  if (reduced) {
    return (
      <div>
        <ul className="flex gap-4 overflow-x-auto px-1 pb-2">
          {films.map((film) => {
            const playing = openId === film.id;
            return (
              <li key={film.id} className="w-[min(78vw,320px)] shrink-0">
                {playing ? (
                  <video
                    className="aspect-video w-full rounded-[1.1rem] bg-black object-contain ring-1 ring-white/15"
                    controls
                    muted
                    playsInline
                    preload="metadata"
                    poster={assetUrl(film.poster)}
                    src={assetUrl(film.src)}
                    aria-label={film.title}
                  />
                ) : (
                  <button
                    type="button"
                    className="block w-full overflow-hidden rounded-[1.1rem] bg-[#10141c] ring-1 ring-white/15"
                    onClick={() => setOpenId(film.id)}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={assetUrl(film.poster)} alt="" className="aspect-video w-full object-cover" />
                  </button>
                )}
                <p className="mt-2 text-sm text-[#f6eddf]">{film.title}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return (
    <div>
      <div
        ref={stageRef}
        className="coverflow-stage relative mx-auto h-[min(58vh,460px)] min-h-[280px] w-full max-w-[1100px] cursor-grab touch-pan-y active:cursor-grabbing"
        onPointerDown={(event) => {
          dragging.current = true;
          const stage = stageRef.current;
          if (!stage) return;
          stage.setPointerCapture(event.pointerId);
          stage.dataset.x = String(event.clientX);
          stage.dataset.a = String(activeRef.current);
        }}
        onPointerMove={(event) => {
          if (!dragging.current || !stageRef.current?.dataset.x) return;
          const startX = Number(stageRef.current.dataset.x);
          const startA = Number(stageRef.current.dataset.a);
          activeRef.current = startA - (event.clientX - startX) / 210;
        }}
        onPointerUp={() => {
          dragging.current = false;
        }}
        onPointerCancel={() => {
          dragging.current = false;
        }}
      >
        <div className="relative h-full w-full [transform-style:preserve-3d]">
        {films.map((film, index) => {
          const delta = signedOffset(index, active, count);
          const distance = Math.abs(delta);
          if (distance > 4.2) return null;
          const width = film.portrait ? "min(28vw, 168px)" : "min(46vw, 420px)";
          const playing = distance < 0.42;
          return (
            <article
              key={film.id}
              className="absolute left-1/2 top-1/2 overflow-hidden rounded-[1.15rem] bg-black shadow-[0_28px_70px_rgb(0_0_0/50%)] ring-1 ring-white/15"
              style={{
                width,
                aspectRatio: film.portrait ? "9 / 16" : "16 / 9",
                transform: `translate(-50%, -50%) translateX(${delta * 250}px) translateZ(${-distance * 170}px) rotateY(${delta * -38}deg) scale(${1 - Math.min(distance, 2.4) * 0.07})`,
                filter: distance < 0.7 ? "none" : `blur(${Math.min(5, (distance - 0.7) * 1.5)}px)`,
                opacity: distance > 3.4 ? 0 : 1,
                zIndex: 40 - Math.round(distance * 8),
                pointerEvents: playing ? "auto" : "none",
              }}
            >
              {playing ? (
                <video
                  className="h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={assetUrl(film.poster)}
                  src={assetUrl(film.src)}
                  aria-label={film.title}
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={assetUrl(film.poster)} alt="" className="h-full w-full object-cover" />
              )}
            </article>
          );
        })}
        </div>
      </div>
      <p className="mt-4 text-center text-sm tracking-wide text-[#f6eddf]">{films[focus]?.title}</p>
    </div>
  );
}
