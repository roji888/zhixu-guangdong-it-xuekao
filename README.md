# 知序 广东高中信息技术学考题库

面向广东高中信息技术合格性考试的浏览器练习网站。原生 HTML、CSS、JavaScript，无构建依赖。

## 功能

- 随机刷题、八大知识点专项练习，真题优先。
- 单选、多选、判断、程序填空、流程图及综合应用题。
- 原卷模考：60分钟、综合题二选一、保存作答、交卷统一评分。
- 每题提交后显示答案、考点、解析、易错提醒。
- 当前标签页临时错题本、考点速记、知识点得分报告。
- 学生版和教师版组卷，导出 HTML / Markdown，浏览器打印为 PDF。

## 题库与校核说明

共121道小题：用户提供的三套试卷105道，另补充16道对标模拟题。同套Word和PDF已去重。

|来源|小题数量|说明|
|---|---:|---|
|深圳市2023年3月卷|34|原稿缺第15题，原卷模考按97分计；参考PDF原稿蓝色答案标注|
|深圳市2023年12月卷|35|采用助教参考答案；原26(2)题B、D选项重复，均认可|
|福田区2024—2025测试卷|36|标注为区级模拟卷；家庭网络分支含9分人工评阅|
|补充模拟题|16|明确标注模拟题，对标已导入原卷的基础考点|

题干经过标点、冗余文字与代码排版整理，影响作答的修订有说明。12月第9题按未压缩PCM估算，原稿“经压缩”缺少计算条件。福田家庭网络第(4)题存在歧义、需教师复核；开放问答提供参考答案和评分点，由教师或学习者核对后录入得分。未声称这些参考答案是独立官方标准答案。

原卷内容及配图来自用户提供的学习材料，其相关权利属于原权利人。本项目未对原题、配图额外授予开源许可。

## 本地使用

可以直接打开 `dist/index.html`；推荐使用本地静态服务器获得更一致的浏览器存储行为：

```bash
python -m http.server 4173 --directory dist
```

访问 `http://localhost:4173`。

学习统计使用当前浏览器的 localStorage；答卷、报告、临时错题使用 sessionStorage。没有账号、后端或跨设备同步。前端包含评分参考答案，适用于练习和自测，不用于需要防止查看源码答案的正式考试。

## GitHub Pages 发布

仓库已经包含 `.github/workflows/pages.yml`。在 GitHub 仓库的 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**，随后从 Actions 手动运行 **Deploy static site to GitHub Pages**，或推送到 `main` 分支。

工作流先检查脚本语法和评分逻辑，再将 `dist/` 部署到 Pages。应用使用相对资源路径与 hash 路由，支持仓库子路径访问。参见 [GitHub 官方 Pages 文档](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)。

## 修改与检查

```bash
node --check dist/app.js
node tests/core.cjs
```

题库数据在 `dist/bank.json`。修改后运行 `node scripts/sync-bank.mjs` 同步生成 `dist/bank.js`，再运行检查。

## 设计参考

界面应用了 [UI UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) 的简洁学习工作台、对比度、键盘操作和响应式布局规范，并针对中文高中学考场景调整字体与颜色。设计记录位于 `design-system/`。


