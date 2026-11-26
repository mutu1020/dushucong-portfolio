# 杜书从 · 作品集与简历

杜书从（Du Shucong）的个人站点。他是 AI 内容编导与创作者。首页是一条长片式作品集：开场、作品、简历、工作方法、时间线、一句话，最后是联系。

视觉结构参考单页电影感作品集：深色片场、浅色简历带、全宽画面，而不是作品卡片墙。文案只用杜书从自己的目录。

## 本地运行

需要 Node.js 20 或更高版本。

```bash
npm install
npm run dev
```

浏览器打开 [http://127.0.0.1:4317](http://127.0.0.1:4317)。

生产构建是静态导出。本地预览在站点根路径：

```bash
npm run build
npx serve out -p 4317
```

GitHub Pages 项目站点使用子路径。Actions 在构建时设置 `NEXT_PUBLIC_BASE_PATH=/dushucong-portfolio`，发布到 [https://mutu1020.github.io/dushucong-portfolio/](https://mutu1020.github.io/dushucong-portfolio/)。本地不设置这个变量时，链接仍指向 `/`。

## 页面

| 路径 | 内容 |
| --- | --- |
| `/` | 整页作品集：英雄区、作品模块、PROFILE、CREATIVE SYSTEM、TIMELINE、STATEMENT、联系 |
| `/works/ai-custom-emoji` | 《AI 定制表情包》案例，可播放成片 |
| `/library/index.html` | 341 画风库。风格提示词来自《俯仰观照》免费分享，不是杜书从独立创作的全部 341 种风格 |
| `/about` `/works` `/practice` `/contact` | 回到首页对应段落 |

联系没有后端。选好方向、写好话，复制后通过微信发送。

## 文案从哪里来

姓名、定位「IDEAS IN MOTION / 关于 AI、内容和新的可能」、六则作品的标题、编号、归档、画面标题，以及《AI 定制表情包》的分工和「70 万 / 自然播放量」，都来自飞书秒搭《杜书从AI内容作品集》里能读到的条目。

教育为中国传媒大学（动漫设计）。任职按来源写了彬彬AI说 / 流星韵（杭州）传媒有限公司、Gary科技宅 / 海宁盐漫文化传媒有限公司、超哥研究所Ultra / 小糖豆文化传媒（北京）有限公司。粉丝与发布量标明是团队成果。没有邮箱和电话。已发布成片写明「本人负责选题与脚本，团队完成成片」，页面保持这个分工。

Wiki 视频没有提供，站内没有视频文件。作品画面是按目录做的片场占位，不是别人的成片截图。

## 微信二维码

把二维码放到 `public/wechat-qr.png`。放好之后，联系区会显示并提供保存。没有这个文件时，页面留空，不会换成别的二维码。
