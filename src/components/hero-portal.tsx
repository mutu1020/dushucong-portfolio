"use client";

import { useEffect, useRef, useState } from "react";
import { profile, heroFoot } from "@/lib/content";

export function HeroPortal() {
  const root = useRef<HTMLElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (reduce || !fine) return;
    setCursor(true);
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let inside = false;
    const onMove = (event: PointerEvent) => {
      const bounds = root.current?.getBoundingClientRect();
      inside = Boolean(
        bounds &&
          event.clientY >= bounds.top &&
          event.clientY <= bounds.bottom &&
          event.clientX >= bounds.left &&
          event.clientX <= bounds.right,
      );
      x = event.clientX;
      y = event.clientY;
    };
    let frame = 0;
    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      const show = inside ? "1" : "0";
      if (dot.current) {
        dot.current.style.opacity = show;
        dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      if (ring.current) {
        ring.current.style.opacity = show;
        ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      }
      frame = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", onMove);
    frame = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="hero" ref={root} className={`hero-rays hero-portal relative flex min-h-[100svh] flex-col justify-between px-5 pb-8 pt-24 sm:px-8 ${cursor ? "hero-cursor" : ""}`}>
      <div className="hero-lens pointer-events-none absolute inset-0" aria-hidden />
      <header className="hero-chrome absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 py-5 sm:px-8">
        <p className="font-mono text-[11px] tracking-[0.22em] text-[#f6eddf]/70">{profile.nameZh}</p>
        <p className="font-mono text-[11px] tracking-[0.22em] text-[#f6eddf]/55">PORTFOLIO</p>
      </header>
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <p className="hero-kicker font-serif text-lg italic text-[#f6eddf]/80 [text-shadow:0_0_20px_#c9d2ff73]">
          Ideas in motion
        </p>
        <h1 className="hero-title mt-4 text-[clamp(4.6rem,16vw,11rem)] font-black leading-[0.86] tracking-[-0.07em] text-[#f6eddf]">
          {profile.nameZh}
        </h1>
        <p className="hero-chrome mt-6 text-xs tracking-[0.18em] text-[#e5ca7e] sm:text-sm">{profile.role}</p>
      </div>
      <div className="hero-chrome flex items-end justify-between gap-6">
        <p className="max-w-xs text-left font-mono text-[10px] leading-5 tracking-[0.12em] text-[#f6eddf]/55 sm:max-w-md sm:text-[11px]">
          {heroFoot}
        </p>
        <a href="#works" className="explore-link flex shrink-0 items-center gap-3 font-mono text-[10px] tracking-[0.28em] text-[#f6eddf]/80">
          EXPLORE
          <span className="explore-orb grid size-11 place-items-center rounded-full border border-white/40 text-base">↓</span>
        </a>
      </div>
      {cursor ? (
        <>
          <div ref={ring} className="cursor-ring" aria-hidden />
          <div ref={dot} className="cursor-dot" aria-hidden />
        </>
      ) : null}
    </section>
  );
}
