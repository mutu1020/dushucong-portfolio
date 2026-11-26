"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { assetUrl } from "@/lib/base-path";
import { talkTopics, type TalkTopic } from "@/lib/content";
import { cn } from "@/lib/utils";

const fieldClass =
  "h-11 rounded-none border-0 border-b border-white/25 bg-transparent px-0 text-base text-[#f6eddf] shadow-none placeholder:text-[#f6eddf]/40 focus-visible:border-[#e5ca7e] focus-visible:ring-0 md:text-sm dark:border-white/25 dark:bg-transparent";

export function ContactDesk({ hasQr }: { hasQr: boolean }) {
  const [topic, setTopic] = useState<TalkTopic | null>("工作机会");
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const [draft, setDraft] = useState("");

  const message = useMemo(() => {
    const lines = [
      "你好，我想和杜书从聊聊。",
      topic ? `想聊：${topic}` : null,
      name.trim() ? `怎么称呼：${name.trim()}` : null,
      from.trim() ? `来自：${from.trim()}` : null,
      note.trim() ? `想说：${note.trim()}` : null,
    ].filter(Boolean);
    return lines.join("\n");
  }, [topic, name, from, note]);

  const ready = Boolean(topic || name.trim() || from.trim() || note.trim());

  async function copy() {
    if (!ready) return;
    try {
      await navigator.clipboard.writeText(message);
      setDraft("");
      setStatus("copied");
    } catch {
      setDraft(message);
      setStatus("failed");
    }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
      <div>
        <p className="font-mono text-[11px] tracking-[0.28em] text-[#e5ca7e]">CONTACT</p>
        <h2 className="mt-4 text-3xl leading-tight text-[#f6eddf] sm:text-4xl">扫码，加个微信。</h2>
        <p className="mt-4 text-sm leading-7 text-[#f6eddf]/70">关于 AI、内容和新的可能。</p>
        <p className="mt-6 text-xs leading-6 text-[#f6eddf]/45">
          填写的内容仅留在当前页面，可以复制后通过微信发给我。
        </p>
        <div className="mt-8">
          {hasQr ? (
            <a href={assetUrl("/wechat-qr.png")} download className="inline-block bg-white p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={assetUrl("/wechat-qr.png")} alt="杜书从的微信二维码" width={220} height={220} className="size-44" />
            </a>
          ) : (
            <div className="grid size-36 place-items-center bg-[#f6eddf] p-3 text-center text-[11px] leading-5 text-[#1c1914]">
              微信二维码还没放进站点。这里留空，避免加错人。
            </div>
          )}
          {hasQr ? (
            <a href={assetUrl("/wechat-qr.png")} download className="mt-3 block font-mono text-[11px] tracking-[0.14em] text-[#e5ca7e]">
              保存二维码
            </a>
          ) : null}
        </div>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          void copy();
        }}
      >
        <p className="font-serif text-sm italic text-[#f6eddf]/70">Hello, let&apos;s talk.</p>
        <p className="mt-3 text-lg text-[#f6eddf]">你想聊些什么？</p>
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="想聊的方向">
          {talkTopics.map((item) => {
            const on = topic === item;
            return (
              <button
                key={item}
                type="button"
                aria-pressed={on}
                onClick={() => setTopic(on ? null : item)}
                className={cn(
                  "h-8 border px-3 text-xs transition",
                  on
                    ? "border-[#e5ca7e] bg-[#e5ca7e] text-[#1a1408]"
                    : "border-white/20 text-[#f6eddf]/75 hover:border-[#e5ca7e]/70",
                )}
              >
                {item}
              </button>
            );
          })}
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <label className="grid gap-2 font-mono text-[10px] tracking-[0.16em] text-[#f6eddf]/50">
            你的称呼
            <Input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="怎么称呼你"
              autoComplete="name"
              className={fieldClass}
            />
          </label>
          <label className="grid gap-2 font-mono text-[10px] tracking-[0.16em] text-[#f6eddf]/50">
            公司 / 项目
            <Input
              value={from}
              onChange={(event) => setFrom(event.target.value)}
              placeholder="来自哪里"
              autoComplete="organization"
              className={fieldClass}
            />
          </label>
        </div>
        <label className="mt-6 grid gap-2 font-mono text-[10px] tracking-[0.16em] text-[#f6eddf]/50">
          想聊的内容
          <Textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="简单说说岗位、项目，或者你的想法。"
            className="min-h-24 rounded-none border-0 border-b border-white/25 bg-transparent px-0 text-sm text-[#f6eddf] shadow-none placeholder:text-[#f6eddf]/40 focus-visible:border-[#e5ca7e] focus-visible:ring-0 dark:bg-transparent"
          />
        </label>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Button type="submit" disabled={!ready} className="h-10 rounded-md px-4">
            微信聊聊
          </Button>
          <Button type="button" variant="ghost" disabled={!ready} className="text-[#f6eddf]/70" onClick={() => void copy()}>
            复制沟通内容
          </Button>
        </div>
        <p className="mt-3 text-xs text-[#f6eddf]/45" aria-live="polite">
          {status === "copied"
            ? "已复制。打开微信，粘贴发给杜书从。"
            : status === "failed"
              ? "浏览器没有写入剪贴板。下面这段可以直接选中复制。"
              : ready
                ? "内容只留在这一页。"
                : "先选一个方向，或写一句你想聊的。"}
        </p>
        {status === "failed" ? (
          <textarea
            readOnly
            value={draft}
            rows={5}
            aria-label="待复制的沟通内容"
            className="mt-3 w-full border border-white/15 bg-black/30 p-3 text-sm text-[#f6eddf]"
            onFocus={(event) => event.currentTarget.select()}
          />
        ) : null}
      </form>
    </div>
  );
}
