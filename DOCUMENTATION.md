# CPPO Project Page — 维护文档 / Maintenance Guide

> 这份文档是给"未来的你"看的。在**相同路径**下打开一个新窗口，只读这一篇，就能知道：
> 这个项目是什么、文件在哪、怎么改、怎么预览、怎么 push 到远程。
> （This doc is self-contained: open a new window in the same path, read this file, and you'll know how to edit, preview, and push.）

---

## 0. 一句话任务背景 / What this is

我们为论文 **CPPO**（*Beyond Uniform Token-Level Trust Region in LLM Reinforcement Learning*，Tencent Hunyuan）做了一个 **GitHub Pages 学术项目主页**，风格参考 Flow-DPPO 的 project page，但**重新设计**成"腾讯混元蓝 + 排版学术风"，并支持 **中英双语**。

- **论文 PDF 源**：仓库根目录 `cppo.pdf`（即 `/apdcephfs_cq8/share_1611098/sumailmao/hunyuan_projects/Angel-RL/cppo.pdf`）
- **线上地址（Live URL）**：https://chongqichuizi875.github.io/CPPO-Project-Page/
- **GitHub 仓库**：https://github.com/chongqichuizi875/CPPO-Project-Page
- **GitHub 账号**：`chongqichuizi875`

---

## 1. 文件在哪 / Where things live

项目页全部在这个目录里（**这就是项目根目录**，也是一个独立 git 仓库）：

```
/apdcephfs_cq8/share_1611098/sumailmao/hunyuan_projects/Angel-RL/cppo-project-page/
├── index.html          # 页面结构 + 所有中英文文案（最常改的文件）
├── css/style.css       # 全部样式（配色、字体、布局）
├── js/main.js          # 交互（语言切换、tab、滚动动画、token-weight 动画条）
├── cppo.pdf            # 论文 PDF（"Paper" 按钮指向它）
├── .nojekyll           # 告诉 GitHub Pages 不要用 Jekyll 处理（别删）
├── DOCUMENTATION.md    # ← 你正在读的这份文档
└── assets/
    ├── hunyuan-logo.png        # 左上角完整 logo（球 + "Tencent Hy"）
    ├── hunyuan-emblem.png      # 只有混元球（备用，当前页面未直接用）
    ├── hunyuan-emblem-256.png  # 球的小图（备用）
    └── figs/                   # 论文里抠出来的 6 张图
        ├── fig1_overview.png            # 当前未用（备用）
        ├── fig2_position_deviation.png  # Method 图 6
        ├── fig3_prefix_constraint.png   # Method 图 5
        ├── fig4_validation_curves.png   # Results → Validation Curves
        ├── fig5_ablations.png           # Results → Ablations 图 3
        └── fig6_base_ablations.png      # Results → Ablations 图 4
```

> ⚠️ 注意：外层 `Angel-RL` 是**腾讯内部仓库**（remote 是 `git.woa.com`）。`cppo-project-page/` 是一个**独立的 git 仓库**，remote 指向 **GitHub**。两者互不影响——所有页面相关的 git 操作都要先 `cd cppo-project-page`。

---

## 2. 页面结构（改文案时按这个找） / Page sections

`index.html` 里从上到下依次是：

| 区块 | HTML 锚点 | 内容 |
|---|---|---|
| 顶部 Masthead | `<header class="masthead">` | 左上角 logo、标题 CPPO、副标题、作者两行、Paper/arXiv/Code 按钮、语言切换、token-weight 动画条 |
| §01 TL;DR | `<section id="tldr">` | 一屏速览：Problem / Fix / Result 三点 |
| §02 Results | `<section id="results">` | 三个 tab：主结果表格 / 验证曲线 / 消融 |
| §03 Why Uniform Fails | `<section id="motivation">` | 残差界公式 + 不对称性说明 + 对比卡片 |
| §04 Method | `<section id="method">` | 三个机制（公式）+ 目标函数 + 两张图 |
| §05 Takeaways | `<section id="takeaways">` | 四个要点卡片 |
| Footer | `<footer class="colophon">` | 版权 / 字体说明 |

> 注：**Citation 区块已按要求删除**。如果以后要加回来，告诉我正确的 BibTeX。

---

## 3. 双语是怎么做的 / How bilingual works

**机制**：同一段文字写两份，用 `<span class="en">…</span>` 和 `<span class="zh">…</span>` 包起来。CSS 根据 `<html data-lang="…">` 决定显示哪个。

```html
<p>
  <span class="en">English text here.</span>
  <span class="zh">这里是中文。</span>
</p>
```

**规则（很重要，改文案时要遵守）**：
1. **`.en` 和 `.zh` 必须成对出现**，数量相等。
2. **论文标题、领域名词不翻译**：token / prefix / suffix / mask / baseline / rollout / loss / trust-region / divergence mask / Top-K reduced-TV / policy-improvement bound / remaining horizon / soft-gate / hard mask / AIME24/25/26 / Avg@16 / Qwen3 / 30B-A3B-Base 等，中文里保持英文原样。
3. **数学公式、表格、section 标题（TL;DR、Results…）不翻译**，两种语言共用。
4. 中文走**正式陈述句**，不要大白话、不要机翻腔。
5. **默认语言**：中国时区/`zh-CN` 浏览器 → 中文；其它 → 英文。用户手动切换后用 `localStorage` 记住。
6. **不要在 masthead 的纯英文元素（标题、副标题、按钮）上挂随语言变化的样式**，否则切换语言会上下抖动（我们已经修过这个 bug，CJK 字体只挂在 `.zh` 上，作者备注行用 `white-space:nowrap` + 固定行高锁定）。

---

## 4. 怎么本地预览 / How to preview locally

页面用了外部 CDN（字体、KaTeX）和相对路径资源，**直接双击 `index.html` 也能看个大概**，但最稳的是起一个本地静态服务器：

```bash
cd /apdcephfs_cq8/share_1611098/sumailmao/hunyuan_projects/Angel-RL/cppo-project-page
python3 -m http.server 8080
# 然后浏览器打开 http://localhost:8080
```

切换语言：点页面上的 `English / 简体中文`，或在浏览器控制台 `localStorage.setItem('cppo-lang','zh')` 后刷新。

---

## 5. 怎么改 / How to edit（最常见的几种）

> 改完**一定要本地预览**确认没问题，再按第 6 节 push。

### A. 改文案（中/英）
- 打开 `index.html`，找到对应 section（见第 2 节表格）。
- 找到 `<span class="en">…</span><span class="zh">…</span>`，**两份都改**。

### B. 加 / 换 Code 链接（你提到的典型场景）
当前 Code 是占位的灰色按钮，在 `index.html` 的 masthead 里：
```html
<span class="act dim" aria-disabled="true" title="Code release coming soon">&lt;/&gt;&nbsp; Code <span class="soon">soon</span></span>
```
代码 ready 后，把它换成真正的链接（仿照旁边的 arXiv 按钮）：
```html
<a href="https://github.com/你的仓库" class="act ghost" target="_blank" rel="noopener">&lt;/&gt;&nbsp; Code</a>
```
（`act ghost` 是描边按钮样式，`act primary` 是实心样式。去掉 `dim` 和 `soon`。）

### C. 换 / 加图
- 把新图放进 `assets/figs/`，在 `index.html` 里改对应 `<img src="assets/figs/…">`。
- 图里的中英文是图片本身的内容，无法靠双语切换改；要改得重新生成图。

### D. 改配色 / 字体 / 间距
- 全部在 `css/style.css` 顶部的 `:root { … }` 变量里。比如主色 `--accent: #0a54d6`（混元蓝）、纸张底色 `--paper`、字体 `--display / --serif / --mono / --cjk`。

### E. 改作者 / 单位
- `index.html` masthead 里的 `.byline`（作者两行，每行 5 个）和 `.affil`。

---

## 6. 怎么 push 到远程 / How to push

> ✅ **本机已配置好 SSH（一次性），现在 push 不再需要任何 token。**
> 这台机器的 SSH 公钥已加到 GitHub 账号 `chongqichuizi875`，
> 且因为本环境端口 22 被墙，已在 `~/.ssh/config` 把 `github.com` 走 `ssh.github.com:443`。
> remote 也已切成 SSH（`git@github.com:…`）。所以下面三行就够了。

### 6.1 提交并推送（日常就用这个）

```bash
cd /apdcephfs_cq8/share_1611098/sumailmao/hunyuan_projects/Angel-RL/cppo-project-page

git add -A
git -c user.name=sumailmao -c user.email=sumailmao@tencent.com \
    commit -m "在此写本次改动说明，例如：Add Code link / 更新结果表"
git push origin main
```

就这样，没有 token、不会过期、不用复制粘贴。

### 6.2 确认上线
- GitHub Pages 会在 ~30–60 秒内自动重建。
- 打开（最好用无痕窗口 / 强制刷新 Cmd+Shift+R）：
  **https://chongqichuizi875.github.io/CPPO-Project-Page/**
- 想确认远端已收到：`git status -sb`（应显示 `## main...origin/main`，没有 `ahead`）。

### 6.3 如果 push 报错怎么办 / Troubleshooting push

| 报错 | 原因 / 解决 |
|---|---|
| `Permission denied (publickey)` | GitHub 不认这台机器的 key。重新把 `~/.ssh/id_rsa.pub` 加到 GitHub → Settings → SSH and GPG keys。 |
| `Connection timed out` / 卡住 | 端口 22 被墙。确认 `~/.ssh/config` 里 `github.com` 的 `HostName ssh.github.com` + `Port 443`（见下方"环境备注"）。 |
| `could not read Username for https://github.com` | remote 还是 HTTPS。执行 `git remote set-url origin git@github.com:chongqichuizi875/CPPO-Project-Page.git` 改回 SSH。 |

**环境备注**：本机 `~/.ssh/config` 里应有这段（已配好，仅供排查时核对）：
```
Host github.com
    HostName ssh.github.com
    Port 443
    User git
```
> ⚠️ 这是**共享 CephFS 路径**，能读到本机 `~/.ssh/id_rsa` 的人都能以你的身份 push 到这个仓库。仅用于公开 project page 没问题；若要收回权限，去 GitHub → Settings → SSH and GPG keys 删掉对应 key 即可。

---

## 7. 如果是让 Claude（AI 助手）帮你改 / If you ask the AI to do it

你说的工作流是：**下次在相同路径开新窗口 → 让 AI 读这份文档 → 说"帮我 xxx" → push**。给 AI 的话可以是：

> 读一下 `cppo-project-page/DOCUMENTATION.md`。然后帮我 [把 Code 按钮换成 https://github.com/xxx 的链接 / 更新结果表里 XX 的数字 / 改一句中文文案……]。改完本地验证一下，没问题就直接 push。

AI 应当：
1. 读本文档了解结构和规则（尤其第 3 节双语规则、第 5 节改法）。
2. 做改动，保证 `.en/.zh` 成对、公式不被破坏、masthead 不抖动。
3. 本地用 headless 浏览器或 `python3 -m http.server` 预览确认。
4. 直接按第 6.1 节 `git push origin main`（**已配好 SSH，无需 token**），然后回报 Live URL。

> 给 AI 的硬性提醒：① 所有东西都在 `cppo-project-page/` 这个独立 git 仓库里，不要碰外层 `Angel-RL`（内部仓库）。② push 走已配置好的 SSH-over-443，**不需要也不要**再用 token / HTTPS。③ 数学公式里如果要写 `<`，必须用 KaTeX 的 `\lt`，否则会被 HTML 解析器吃掉（这个坑踩过）。

---

## 8. 提交信息（commit message）参考 / Commit message examples

保持简洁、说清"为什么/改了什么"。例子：

- `Add Code link now that the repo is public`
- `Update main results table (corrected 8B-Base numbers)`
- `Tweak Chinese wording in TL;DR for clarity`
- `Swap teaser figure with higher-res version`

英文/中文都行，团队习惯用英文。

---

## 9. 常见问题 / Troubleshooting

| 现象 | 原因 / 解决 |
|---|---|
| 改了没生效 | 浏览器缓存。强制刷新 **Cmd/Ctrl + Shift + R**。 |
| Pages 没更新 | 等 1 分钟；或去仓库 **Actions / Settings → Pages** 看构建状态。 |
| push 报 `Permission denied (publickey)` | GitHub 不认本机 key。把 `~/.ssh/id_rsa.pub` 重新加到 GitHub → Settings → SSH and GPG keys。 |
| push `Connection timed out` / 卡住 | 端口 22 被墙。核对 `~/.ssh/config` 里 `github.com` → `HostName ssh.github.com` + `Port 443`（见第 6.3 节）。 |
| push 报 `could not read Username for https://github.com` | remote 退回了 HTTPS。执行 `git remote set-url origin git@github.com:chongqichuizi875/CPPO-Project-Page.git`。 |
| 切换语言页面抖动 | 别在 masthead 纯英文元素上挂随语言变化的样式（见第 3 节第 6 条）。 |
| 公式显示成乱码/被截断 | 数学里别用裸 `<`/`>`，用 `\lt`/`\gt`；`$…$` 行内、`$$…$$` 独行。 |
| `.en`/`.zh` 数量不一致 | 漏写了一种语言的 span；检查成对。 |

---

_最后更新：2026-06-10 · 维护者：sumailmao · 账号：chongqichuizi875_
