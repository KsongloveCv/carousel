# 萌爪洗护 · 宠物洗护店官网

[carousel](https://github.com/KsongloveCv/carousel) 是一个纯静态的单页网站，用于展示宠物洗护店「萌爪洗护」的品牌形象、服务项目、价格套餐与在线预约入口。

## 功能概览

- **响应式布局**：适配桌面端与移动端
- **店内环境轮播**：三张 AI 生成的店内实景（接待区、洗浴区、造型区），支持自动播放、箭头、圆点与缩略图切换
- **服务与价格**：四大服务介绍 + 三档套餐说明
- **洗护流程**：四步标准化流程展示
- **用户评价**：客户口碑展示
- **在线预约**：表单提交（前端演示，无后端）

## 项目结构

```
.
├── index.html          # 单页主文件（HTML + CSS + JS）
├── assets/             # 轮播图片资源
│   ├── carousel-reception.png
│   ├── carousel-bathing.png
│   └── carousel-styling.png
├── .gitignore
└── README.md
```

## 本地预览

无需安装依赖，用浏览器直接打开即可：

```bash
# macOS
open index.html

# 或使用本地静态服务器（可选）
python3 -m http.server 8080
# 浏览器访问 http://localhost:8080
```

## 部署到 GitHub Pages

1. 打开仓库 [Settings → Pages](https://github.com/KsongloveCv/carousel/settings/pages)
2. **Source** 选择 `Deploy from a branch`
3. **Branch** 选择 `main`，目录选 `/ (root)`
4. 保存后等待几分钟，访问 `https://ksonglovecv.github.io/carousel/`

## 技术说明

- 单文件静态页面，无构建工具、无框架
- 样式与脚本内联于 `index.html`
- 字体通过 Google Fonts 加载（需联网）
- 轮播图为 AI 生成，仅作展示用途

## 自定义

修改店名、地址、电话、价格等内容，直接编辑 `index.html` 中对应文案即可。替换轮播图时，将新图片放入 `assets/` 并更新 HTML 中的 `src` 路径。

## 许可证

本项目为演示/学习用途，可自由 fork 与修改。
