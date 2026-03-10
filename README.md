# 智绘IP · 企业景区数字IP设计平台

## 项目介绍

智绘IP是一个为企业与景区提供数字IP设计服务的平台，集成了腾讯云智能创作API与Luma AI API，通过API网关和云函数实现服务调用。

## 技术架构

- **前端**：HTML5 + CSS3 + JavaScript
- **后端**：腾讯云函数
- **API网关**：腾讯云API网关
- **AI服务**：腾讯云智能创作API、Luma AI API

## 部署指南

### 1. 部署云函数

1. 登录腾讯云控制台，进入云函数服务
2. 创建三个云函数：
   - `generate-ip`：用于生成IP形象
   - `generate-3d`：用于生成3D模型
   - `check-task-status`：用于检查任务状态（轮询）
3. 将 `generate-ip.js`、`generate-3d.js` 和 `check-task-status.js` 的代码分别复制到对应的云函数中
4. 在云函数的环境变量中添加以下配置：
   - `TENCENT_CLOUD_API_KEY`：腾讯云智能创作API密钥
   - `LUMA_AI_API_KEY`：Luma AI API密钥

### 2. 配置API网关

1. 登录腾讯云控制台，进入API网关服务
2. 创建一个API服务
3. 创建三个API路径：
   - `/prod/generate-ip`：POST方法，绑定到 `generate-ip` 云函数
   - `/prod/generate-3d`：POST方法，绑定到 `generate-3d` 云函数
   - `/prod/check-task-status`：POST方法，绑定到 `check-task-status` 云函数
4. 发布API服务，获取API网关URL

### 3. 更新前端配置

1. 打开 `h3.html` 文件
2. 将以下代码中的 `https://your-api-gateway-url` 替换为实际的API网关URL：
   ```javascript
   // 调用API网关
   fetch('https://your-api-gateway-url/prod/generate-ip', {
       // ...
   });
   
   // 调用API网关
   fetch('https://your-api-gateway-url/prod/generate-3d', {
       // ...
   });
   
   // 调用API网关检查任务状态
   fetch(`https://your-api-gateway-url/prod/check-task-status`, {
       // ...
   });
   ```

## 使用说明

1. 打开 `h3.html` 文件
2. 在"数字IP形象设计"部分，填写IP名称、类型、风格和详细描述，然后点击"生成IP形象"按钮
3. 在"3D建模与渲染"部分，填写模型名称、类型和详细描述，然后点击"生成3D模型"按钮
4. 系统会通过API网关调用云函数，云函数会调用相应的AI API生成结果
5. 对于需要较长时间处理的任务，系统会自动轮询任务状态，并显示实时进度
6. 生成结果会显示在页面上，包括生成的IP形象或3D模型图片

## 注意事项

1. 本项目使用模拟数据进行演示，实际部署时需要替换为真实的API密钥和调用逻辑
2. 腾讯云智能创作API和Luma AI API可能需要申请和付费使用
3. 云函数和API网关的配置可能需要根据实际情况进行调整
4. 轮询功能默认设置为最多轮询30次，每次间隔2秒，可根据实际需求调整

## 项目文件结构

```
├── h3.html              # 前端页面
├── generate-ip.js       # 生成IP形象的云函数
├── generate-3d.js       # 生成3D模型的云函数
├── check-task-status.js # 检查任务状态的云函数（轮询）
└── README.md            # 项目说明
```