# VPS 推广链接生成器

基于 Cloudflare Workers 的 VPS 推广链接生成工具，一键将普通购买链接转换为带推广码的佣金追踪链接。

> **特点**：支持批量处理、多系统兼容、零外部依赖、全球边缘加速。

<p align="center">
  <img src="https://img.shields.io/badge/Deploy-Cloudflare%20Workers-F38020?style=for-the-badge&logo=cloudflare&logoColor=white" alt="Deploy to Cloudflare Workers">
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License">
</p>

## 📖 目录

- [✨ 功能特性](#-功能特性)
- [📦 支持的推广系统](#-支持的推广系统)
- [🚀 快速使用](#-快速使用)
- [🛠️ 部署指南](#️-部署指南)
- [🔧 技术栈](#-技术栈)
- [❓ 常见问题](#-常见问题)
- [🤝 致谢](#-致谢)

---

## ✨ 功能特性

- 🚀 **批量处理** — 支持一次性粘贴多个购买链接，批量生成推广链接。
- 🎯 **智能识别** — 自动识别 15+ 种推广码参数格式（`aff` / `affid` / `ref` / `aff_code` 等）。
- 🧹 **链接净化** — 自动清理购买链接中原有的推广参数，防止佣金冲突。
- 📋 **一键导入** — 支持从剪贴板快速导入购买链接。
- 🌐 **零依赖部署** — 纯单文件架构，无需数据库、API、CDN 或外部资源。
- ⚡ **极速体验** — 基于 Cloudflare Workers 全球边缘网络，首屏 <100ms。
- 🔒 **安全可靠** — 内置 XSS 防护、全局错误捕获、剪贴板降级兼容。

## 📦 支持的推广系统

| 系统类型 | 支持参数 | 识别方式 |
| :--- | :--- | :--- |
| **WHMCS 标准** | `aff=` / `affid=` / `affiliate=` | URL 参数匹配 |
| **现代 SaaS** | `aff_code=` / `ref_code=` | URL 参数匹配 |
| **通用推广** | `ref=` / `refid=` / `partner=` / `tracking=` | URL 参数匹配 |
| **其他格式** | `sid=` / `promo=` / `code=` / `via=` / `invite=` | URL 参数匹配 |
| **路径邀请码** | `/r/邀请码` / `/ref/邀请码` | 路径正则匹配 |
| **纯数字模式** | `12345` | 自动识别为 WHMCS |

## 🚀 快速使用

### 在线体验
直接访问部署后的 Worker URL 即可使用。

### 操作步骤

**1. 输入推广链接**
粘贴您的推广链接（如 `https://domain.com/aff.php?aff=123`），或直接输入推广码数字。

**2. 输入购买链接**
每行一个购买链接，支持别名格式：
```text
香港VPS|https://domain.com/store/tiktok-vps/hk-vps
日本VPS|https://domain.com/cart.php?pid=2
https://domain.com/cart.php?gid=5
```

**3. 生成推广链接**
点击按钮或使用快捷键 `Ctrl + Enter`。

**4. 获取结果**
每个结果提供"复制链接"和"打开链接"按钮，一键复制全部链接到剪贴板。

### 效果示例

<details>
<summary><strong>👉 点击查看输入/输出示例</strong></summary>

**输入：**
```text
推广链接: https://domain.com/aff.php?aff=663

购买链接:
https:/domain.com/cart.php?pid=1
https://domain.com/store/tiktok-vps/hk-vps
```

**输出：**
```text
VPS 1 [WHMCS Cart]
👉 https:/domain.com/cart.php?a=add&pid=1&aff=663

VPS 2 [WHMCS Store]
👉 https://domain.com/store/tiktok-vps/hk-vps?aff=663
```
</details>

## 🛠️ 部署指南

### 方式一：Dashboard 快速部署（推荐）

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages**。
2. 点击 **Create Application** → **Create Worker**。
3. 点击 **Edit code**，清空默认代码。
4. 复制本仓库的 `aff.js` 全部代码粘贴进去。
5. 点击 **Save and Deploy**。
6. 访问分配的 `*.workers.dev` 域名即可使用。

### 方式二：Wrangler CLI 部署

```bash
# 1. 安装 Wrangler CLI
npm install -g wrangler

# 2. 登录 Cloudflare
wrangler login

# 3. 创建项目
mkdir vps-aff-tool && cd vps-aff-tool
wrangler init

# 4. 将 workers.js 替换为入口文件
cp /path/to/aff.js src/index.js

# 5. 部署到生产环境
wrangler deploy
```

### wrangler.toml 配置示例

```toml
name = "vps-aff-generator"
main = "src/index.js"
compatibility_date = "2024-01-01"

[observability]
enabled = true
```

### 绑定自定义域名

1. Workers Dashboard → 选择你的 Worker → **Triggers** → **Custom Domains**。
2. 点击 **Add Custom Domain**。
3. 输入你的域名（如 `tools.yourdomain.com`）。
4. Cloudflare 自动处理 DNS 和 SSL 证书。

## 🔧 技术栈

| 层级 | 技术 |
| :--- | :--- |
| **运行时** | Cloudflare Workers (V8 Isolates) |
| **前端** | Vanilla JS (零框架) |
| **样式** | CSS3 (响应式 / 暗黑主题) |
| **安全** | 内联 CSP / XSS 转义 / 错误隔离 |
| **构建** | 无（单文件直出） |

## ❓ 常见问题

<details>
<summary><strong>Q: 为什么生成的链接是 <code>?aff=xxx</code> 而不是 <code>aff.php?redirect=xxx</code>？</strong></summary>

当前版本采用**直接追加查询参数**策略。这是 WHMCS 官方推荐的标准方式，兼容性覆盖 5.x ~ 8.x 所有版本。对于 `/store/` 路径，WHMCS 原生支持直接追加 `?aff=xxx`，无需 redirect 中转。
</details>

<details>
<summary><strong>Q: 剪贴板导入按钮在 HTTP 下为什么不工作？</strong></summary>

浏览器安全策略要求 `navigator.clipboard.readText()` 必须在 HTTPS 环境下使用。Cloudflare Workers 默认提供 HTTPS，部署后无此问题。
</details>

<details>
<summary><strong>Q: 如何自定义支持的推广参数？</strong></summary>

编辑 `aff.js` 中的 `detectAff` 函数，修改 `keys` 数组即可添加或移除支持的参数名。
</details>

<details>
<summary><strong>Q: 是否支持非 WHMCS 的推广系统？</strong></summary>

支持。只要推广系统使用 URL 参数传递推广码（如 `ref=xxx`、`partner=xxx`），均可正常识别和生成。
</details>

## 🤝 致谢

感谢 [37VPS主机评测](https://www.1373737.xyz/) 对本项目的支持。


