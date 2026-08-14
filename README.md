# 我的待办清单

一个用原生 HTML、CSS 和 JavaScript 编写的 Codex 学习项目。

## 当前功能

- 添加待办事项
- 点击待办事项，切换完成或未完成状态
- 删除待办事项
- 使用浏览器 `localStorage` 保存待办事项
- 按“全部 / 未完成 / 已完成”筛选待办事项
- 显示剩余未完成事项数量
- 一键清除已完成事项

## 如何运行

因为项目使用 JavaScript 模块，请通过本地静态服务器打开，而不要直接双击 `index.html`。在项目目录运行：

```bash
python3 -m http.server 8000
```

然后访问 [http://localhost:8000](http://localhost:8000)。待办事项会保存在当前浏览器中；刷新或重新打开页面后仍会显示。

## 运行测试

需要安装 Node.js 18 或更高版本。在项目目录运行：

```bash
node --test todo-store.test.mjs
```

测试覆盖新增待办、筛选、切换完成状态、删除和已保存数据的规范化处理。
