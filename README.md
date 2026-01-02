# 📹 VideoTags - 视频关键词分类备份系统

一个简洁美观的网站，用于备份和管理您的视频关键词分类标签。支持本地数据存储、交互式可视化报告和零成本 GitHub Pages 托管。

## ✨ 功能特性

- 📝 **标签管理**：轻松添加、删除和搜索视频关键词
- 🏷️ **分类系统**：为标签分配不同的分类
- 📊 **可视化报告**：饼图和柱状图展示数据分析
- 🎨 **双视图模式**：网格视图和标签云视图
- 💾 **本地存储**：数据保存在浏览器本地，无需服务器
- 🚀 **零成本托管**：使用 GitHub Pages 免费托管

## 🎯 快速开始

### 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build
```

### 部署到 GitHub Pages

详见 **DEPLOY_STEPS.md** 文件。

## 📁 项目结构

```
video-tags-backup/
├── .github/workflows/      # GitHub Actions 自动化部署
├── client/                 # 前端代码
│   ├── src/
│   │   ├── pages/          # 页面组件
│   │   ├── components/     # UI 组件
│   │   ├── contexts/       # 数据上下文
│   │   └── App.tsx         # 主应用
│   ├── index.html          # HTML 入口
│   └── public/             # 静态资源
├── package.json            # 项目依赖
├── vite.config.ts          # Vite 配置
└── tsconfig.json           # TypeScript 配置
```

## 🛠️ 技术栈

- **React 19** - UI 框架
- **Tailwind CSS 4** - 样式
- **Vite** - 构建工具
- **Framer Motion** - 动画
- **Recharts** - 数据可视化
- **shadcn/ui** - UI 组件库

## 📖 使用指南

1. **添加标签**：在标签管理页面输入标签名称，选择分类，点击"添加"
2. **查看统计**：在概览页面查看标签总数、分类数量等统计信息
3. **切换视图**：在标签管理页面可以在网格视图和标签云视图之间切换
4. **查看报告**：在可视化报告页面查看数据分析和趋势

## 🌐 部署

这个项目已配置为可以直接部署到 GitHub Pages。详见 **DEPLOY_STEPS.md**。

## 📄 许可证

MIT

---

**祝您使用愉快！** 🎉
