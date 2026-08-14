import assert from "node:assert/strict";
import test from "node:test";

import {
  countActiveTodos,
  createTodo,
  filterTodos,
  normalizeTodos,
  removeTodo,
  toggleTodo,
} from "./todo-store.mjs";

const todos = [
  { id: "first", title: "学习 Codex", completed: false },
  { id: "second", title: "完成练习", completed: true },
];

test("createTodo creates an incomplete todo", () => {
  assert.deepEqual(createTodo("写测试", "third"), {
    id: "third",
    title: "写测试",
    completed: false,
  });
});

test("filterTodos returns the requested todos without changing the source", () => {
  assert.deepEqual(filterTodos(todos, "active"), [todos[0]]);
  assert.deepEqual(filterTodos(todos, "completed"), [todos[1]]);
  assert.equal(filterTodos(todos, "all"), todos);
});

test("countActiveTodos returns the number of incomplete todos", () => {
  assert.equal(countActiveTodos(todos), 1);
  assert.equal(countActiveTodos([]), 0);
});

test("toggleTodo changes only the selected todo", () => {
  const updatedTodos = toggleTodo(todos, "first");

  assert.equal(updatedTodos[0].completed, true);
  assert.equal(updatedTodos[1].completed, true);
  assert.equal(todos[0].completed, false);
});

test("removeTodo removes only the selected todo", () => {
  assert.deepEqual(removeTodo(todos, "first"), [todos[1]]);
  assert.deepEqual(removeTodo(todos, "unknown"), todos);
});

test("normalizeTodos ignores invalid saved data and normalizes completion", () => {
  assert.deepEqual(normalizeTodos({}), []);
  assert.deepEqual(normalizeTodos([{ id: "first", title: "学习", completed: 1 }]), [
    { id: "first", title: "学习", completed: true },
  ]);
});
