# H0ll0w's Space - 个人静态博客

这是一个基于 **Vue 3 + Vite + Tailwind CSS** 构建的现代化、极简风个人静态博客。项目专为展示技术文章、面经（如大模型、前端、算法等）设计，拥有极佳的阅读体验和强大的 Markdown 渲染能力。

## 🏗 架构设计：读写分离

本项目采用轻量级的 **“读写分离 (Read-Write Separation)”** 纯前端架构，无需任何后端服务器或数据库：

- **写入端 (数据源)**：文章数据、图片素材通过独立的 GitHub 仓库（`lcp-data`）管理，方便在移动端（如 iPad）或其他工具中随时记录和推送。
- **展示端 (本项目)**：作为纯粹的 UI 容器。在页面加载时，通过 `fetch` 动态拉取数据源仓库的 `data.json` (GitHub Raw)，在浏览器端完成解析、路由和渲染。

## ✨ 核心特性

- ⚡️ **极致轻量**：基于 Vue 3 组合式 API 与 Vite 构建，SPA 体验，秒级响应。
- 🎨 **极简排版**：采用 Tailwind CSS + Typography 插件，定制了高度贴合白底阅读环境的文章排版。
- 💻 **极客代码块**：深度定制的 VSCode 暗黑视窗风格代码块，支持一键复制，无缝剥离了多余的样式干扰。
- 🧮 **全量 LaTeX 支持**：集成 `markdown-it-mathjax3`，完美渲染复杂的大模型公式、算法推导（自动支持横向滚动，防止溢出）。
- 📑 **智能悬浮目录 (TOC)**：自动抓取正文 `H2` - `H4` 标题生成侧边栏悬浮目录，支持平滑滚动与锚点跳转。
- ⚙️ **动态个性化设置**：右下角悬浮控制台，支持全局动态调整**正文字体**与**代码字体**大小，配置自动保存在 LocalStorage。

## 🛠 技术栈

- **框架**：[Vue 3](https://vuejs.org/) (Composition API) + [Vue Router 4](https://router.vuejs.org/)
- **构建工具**：[Vite](https://vitejs.dev/)
- **样式**：[Tailwind CSS](https://tailwindcss.com/) + `@tailwindcss/typography`
- **Markdown 渲染**：
  - `markdown-it` (核心解析)
  - `highlight.js` (代码高亮 - Atom One Dark 主题)
  - `markdown-it-mathjax3` (数学公式渲染)

## 🚀 本地开发与运行

确保你已经安装了 Node.js (推荐 v18+)。

```bash
# 1. 克隆项目
git clone [https://github.com/h0ll0w-akuzr0guy/my-blog.git](https://github.com/h0ll0w-akuzr0guy/my-blog.git)
cd my-blog

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev
```

