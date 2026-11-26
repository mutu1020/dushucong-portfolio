/** Public URL prefix. Empty locally; `/dushucong-portfolio` on GitHub Pages. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** Prefix a root-absolute public asset. Next `<Link>` already applies `basePath`; do not use this on those hrefs. */
export function assetUrl(path: string) {
  if (!path.startsWith("/")) return path;
  return `${basePath}${path}`;
}
