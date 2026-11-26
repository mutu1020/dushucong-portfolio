"use client";

import { useEffect } from "react";

export function SectionJump({ hash }: { hash: string }) {
  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
    window.location.replace(`${base}/#${hash}`);
  }, [hash]);

  return (
    <p className="px-6 py-24 font-mono text-xs tracking-[0.2em] text-[#f6eddf]/60">正在回到作品集…</p>
  );
}
