import { assetUrl } from "@/lib/base-path";

const films = [
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
] as const;

export function FilmGrid() {
  return (
    <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {films.map((film) => (
        <li key={film.id}>
          <figure>
            <div className="flex aspect-video items-center justify-center overflow-hidden rounded-[1.15rem] bg-black ring-1 ring-white/15">
              <video
                className="h-full w-full object-contain"
                controls
                playsInline
                preload="metadata"
                poster={assetUrl(film.poster)}
                src={assetUrl(film.src)}
                aria-label={film.title}
              />
            </div>
            <figcaption className="mt-3 text-sm text-[#f6eddf]">{film.title}</figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
