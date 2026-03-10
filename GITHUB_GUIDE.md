# GitHub 仓库创建与代码推送指南

## 步骤1：在GitHub上创建仓库

1. **登录GitHub账号**：打开 [GitHub官网](https://github.com) 并登录您的账号。

2. **创建新仓库**：
   - 点击右上角的 "+" 号，选择 "New repository"。
   - 在 "Repository name" 字段中输入仓库名称，例如 `smart-cultural-tourism`。
   - 选择仓库类型：
     - 对于公开分享：选择 "Public"
     - 对于私人使用：选择 "Private"
   - 点击 "Create repository" 按钮。

## 步骤2：推送代码到GitHub

创建仓库后，GitHub会显示推送代码的命令。在本地项目目录中运行以下命令：

### 方法1：使用HTTPS

```bash
git remote add origin https://github.com/您的用户名/仓库名称.git
git branch -M main
git push -u origin main
```

### 方法2：使用SSH（推荐，需要配置SSH密钥）

```bash
git remote add origin git@github.com:您的用户名/仓库名称.git
git branch -M main
git push -u origin main
```

## 步骤3：启用GitHub Pages

要将网站部署为静态网页：

1. 在GitHub仓库页面，点击 "Settings" 选项卡。
2. 在左侧菜单中，点击 "Pages"。
3. 在 "Source" 部分，选择 "main" 分支，然后点击 "Save"。
4. 等待几分钟，GitHub会生成网站URL，通常格式为：`https://您的用户名.github.io/仓库名称/`

## 步骤4：访问网站

部署完成后，您可以通过生成的GitHub Pages URL访问您的网站。

## 注意事项

- 确保仓库名称不包含特殊字符和空格。
- 如果使用HTTPS方式推送，可能需要输入GitHub账号密码或个人访问令牌。
- 如果使用SSH方式，需要先配置SSH密钥。
- GitHub Pages部署可能需要几分钟时间生效。