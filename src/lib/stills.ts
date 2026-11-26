import fs from "node:fs";
import path from "node:path";
import { assetUrl } from "@/lib/base-path";

const exts = [".jpg", ".jpeg", ".png", ".webp"];

function worksDir() {
  return path.join(process.cwd(), "public", "works");
}

export function resolveFigure(basename: string): string | undefined {
  const dir = worksDir();
  if (!fs.existsSync(dir)) return undefined;
  const files = fs.readdirSync(dir);
  const exact = files.find((file) => exts.some((ext) => file === `${basename}${ext}`));
  if (exact) return assetUrl(`/works/${exact}`);
  const prefixed = files.find(
    (file) => file.startsWith(basename) && exts.some((ext) => file.toLowerCase().endsWith(ext)),
  );
  return prefixed ? assetUrl(`/works/${prefixed}`) : undefined;
}

export function resolveFigures(names: string[] | undefined): string[] {
  if (!names) return [];
  return names.map((name) => resolveFigure(name)).filter((src): src is string => Boolean(src));
}
