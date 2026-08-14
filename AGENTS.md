# 项目协作说明

这是一个无需第三方依赖的原生 HTML、CSS 和 JavaScript 待办应用。

## 开发约定

- 修改前先阅读相关实现和测试；保持改动范围最小。
- 用户可见的功能应同步更新 `README.md`。
- 待办业务规则写在 `todo-store.mjs`；页面交互和 `localStorage` 读写保留在 `app.js`。
- 新增或修改业务规则时，为 `todo-store.test.mjs` 补充相应测试。
- 不要引入构建工具、包管理器或第三方运行时依赖，除非任务明确要求。

## 验证命令

每次修改 JavaScript 逻辑后运行：

```bash
node --check app.js
node --test todo-store.test.mjs
git diff --check
```

## 运行项目

使用本地静态服务器打开项目：

```bash
python3 -m http.server 8000
```

然后访问 `http://localhost:8000`。不要依赖直接双击 `index.html`，因为项目使用 JavaScript 模块。

## Git 工作流

- 新功能或修复使用 `codex/<简短描述>` 功能分支。
- 提交前先运行验证命令并审查 diff。
- 提交信息使用 Conventional Commits 风格，例如 `feat: add todo filter`。
- 推送和创建 Pull Request 仅在任务明确要求时执行。
- GitHub Actions 工作流位于 `.github/workflows/validate.yml`；修改验证命令时同步更新该文件。
