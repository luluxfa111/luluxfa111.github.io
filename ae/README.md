# AE 动效交付说明

当前环境未检测到 Adobe After Effects，因此网站先用原生 CSS/JS 实现了同构动效；这些动效可以直接上线，也可以在 AE 里重制后导出 Lottie。

## 推荐合成

- `XL_Hero_Fan`：1920×1080，25fps，6秒。5 张项目卡从中心依次展开，最终形成扇形。
- `XL_Idea_To_Product`：1920×1080，25fps，5秒。IDEA → STRUCTURE → EXPERIENCE → PRODUCT，节奏对应网页“动效概念片”。
- `XL_Skin_Scan`：1080×1080，25fps，3秒循环。扫描线从上向下扫过界面。
- `XL_Logo_Loop`：512×512，25fps，2秒循环。XL 字母由两条路径描边生成。

## 导出建议

使用 Bodymovin/LottieFiles 导出 JSON，避免位图模糊；仅使用 Position、Scale、Rotation、Opacity、Trim Paths 和基础 Shape Layer。导出后放入 `assets/motion/`，再将网页中的 CSS 动效替换为 Lottie 播放器即可。

`build-motion.jsx` 用于生成“IDEA 到 PRODUCT”文字节奏片；`hero-card-fan.jsx` 会生成与网站首屏对应的五张作品卡展开动画。两者均可在 AE 的 File → Scripts → Run Script File 中运行。
