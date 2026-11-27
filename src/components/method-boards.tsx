import { assetUrl } from "@/lib/base-path";

const boards = [
  { file: "/works/method-boards/01-ai-tools-efficiency.png", title: "AI工具提效" },
  { file: "/works/method-boards/02-project-case-library.png", title: "项目案例素材库" },
  { file: "/works/method-boards/03-short-video-sop.png", title: "短视频创作 SOP" },
  { file: "/works/method-boards/04-ip-brain-skill.png", title: "IP大脑 / Skill" },
] as const;

export function MethodBoards() {
  return (
    <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {boards.map((board) => (
        <li key={board.file}>
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={assetUrl(board.file)}
              alt={board.title}
              className="h-auto w-full rounded-[1.15rem] ring-1 ring-white/10"
            />
            <figcaption className="mt-3 text-sm text-[#f6eddf]">{board.title}</figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
