# 🚀 部署到 GitHub Pages - 完整步骤

本指南将帮助您一步步将这个项目部署到 GitHub Pages。

## 前置条件

- 拥有一个 GitHub 账号（免费注册：https://github.com）
- 已下载或克隆本项目

## 📋 部署步骤

### 第一步：创建 GitHub 仓库

1. 登录 GitHub（https://github.com）
2. 点击右上角的 **+** 号，选择 **New repository**
3. 填写以下信息：
   - **Repository name**: `video-tags-backup`
   - **Description**: 视频关键词分类备份系统（可选）
   - **Visibility**: 选择 **Public**（GitHub Pages 免费版需要公开）
4. 点击 **Create repository**

### 第二步：上传代码到 GitHub

#### 方法 A：使用 Git 命令（推荐）

如果您已安装 Git，在项目文件夹中打开终端，执行：

```bash
# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 提交代码
git commit -m "Initial commit"

# 关联远程仓库（将 YOUR_USERNAME 替换为您的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/video-tags-backup.git

# 推送到 GitHub（如果分支是 main，则用 main；如果是 master，则用 master）
git branch -M main
git push -u origin main
```

#### 方法 B：网页上传（简单）

1. 在您的 GitHub 仓库页面，点击 **Add file** → **Upload files**
2. 将项目文件夹中的所有文件拖拽到网页中
3. 在底部的 "Commit changes" 处填写提交信息
4. 点击 **Commit changes**

### 第三步：配置 GitHub Pages

1. 进入您的仓库页面
2. 点击 **Settings** 选项卡
3. 在左侧菜单中找到 **Pages**
4. 在 **Build and deployment** 部分：
   - **Source** 选择 `GitHub Actions`
5. 配置完成！

### 第四步：查看构建状态

1. 点击仓库顶部的 **Actions** 选项卡
2. 您应该能看到一个名为 "Deploy to GitHub Pages" 的工作流
3. 等待工作流完成（通常需要 1-2 分钟）
   - 🟡 黄色旋转图标 = 正在构建
   - ✅ 绿色对勾 = 构建成功
   - ❌ 红色叉 = 构建失败

### 第五步：访问您的网站

1. 构建完成后，回到 **Settings** → **Pages**
2. 在顶部会看到：**Your site is live at...**
3. 点击那个链接，或者访问：
   ```
   https://YOUR_USERNAME.github.io/video-tags-backup/
   ```

## ✅ 完成！

恭喜！您的视频关键词备份系统已经上线了！

## 🔄 如何更新网站

以后如果您想更新网站内容：

1. 在本地修改代码
2. 执行：
   ```bash
   git add .
   git commit -m "Update description"
   git push
   ```
3. GitHub Actions 会自动检测变化并重新构建发布

## 🆘 常见问题

### Q: 网站打开是空白的？
**A**: 
- 确保您在 GitHub Pages 设置中选择了 `GitHub Actions`
- 等待 GitHub Actions 完成构建（查看 Actions 标签页）
- 刷新浏览器，清除缓存

### Q: 如何查看构建错误？
**A**: 
- 点击 **Actions** 标签页
- 点击失败的工作流
- 点击 **build** 任务
- 查看详细的错误日志

### Q: 可以使用自定义域名吗？
**A**: 可以的！在 GitHub Pages 设置中的 "Custom domain" 部分填写您的域名即可。

### Q: 数据会丢失吗？
**A**: 不会。您的数据保存在浏览器的本地存储中，不会因为网站更新而丢失。

## 📞 需要帮助？

如果遇到问题，请检查：
1. 仓库是否是 Public（公开）
2. GitHub Actions 工作流是否成功运行
3. 是否选择了 `GitHub Actions` 作为 Pages Source

---

**祝您部署顺利！** 🎉
