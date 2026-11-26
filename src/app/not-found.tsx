import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70svh] flex-col justify-center px-6">
      <p className="font-mono text-[11px] tracking-[0.28em] text-[#e5ca7e]">404</p>
      <h1 className="mt-4 text-4xl text-[#f6eddf]">这一页不在作品集里</h1>
      <Link href="/" className="mt-8 font-mono text-xs tracking-[0.16em] text-[#e5ca7e]">
        ← 杜书从
      </Link>
    </div>
  );
}
