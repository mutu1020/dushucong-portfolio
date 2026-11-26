"use client";

import { Button } from "@/components/ui/button";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex min-h-[70svh] flex-col justify-center px-6">
      <p className="font-mono text-[11px] tracking-[0.28em] text-[#e5ca7e]">载入中断</p>
      <h1 className="mt-4 text-4xl text-[#f6eddf]">这一页没有打开</h1>
      <Button type="button" onClick={reset} className="mt-8 w-fit">
        再试一次
      </Button>
    </div>
  );
}
