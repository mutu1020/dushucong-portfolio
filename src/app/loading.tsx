export default function Loading() {
  return (
    <div className="px-6 py-28" aria-busy="true" aria-live="polite">
      <p className="font-mono text-[11px] tracking-[0.28em] text-[#e5ca7e]">载入中</p>
      <div className="mt-8 h-[52vh] animate-pulse rounded-[1.35rem] bg-white/5" />
    </div>
  );
}
