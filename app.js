import {
  countActiveTodos,
  createTodo,
  filterTodos,
  normalizeTodos,
  removeCompletedTodos,
  removeTodo,
  toggleTodo,
} from "./todo-store.mjs";

const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const list = document.querySelector("#todo-list");
const emptyState = document.querySelector("#empty-state");
const remainingCount = document.querySelector("#remaining-count");
const clearCompletedButton = document.querySelector("#clear-completed");
const filterButtons = document.querySelectorAll(".filter-button");
const STORAGE_KEY = "codex-learning-todos";

const todos = loadTodos();
let currentFilter = "all";

function loadTodos() {
  const savedTodos = localStorage.getItem(STORAGE_KEY);

  if (!savedTodos) {
    return [];
  }

  try {
    return normalizeTodos(JSON.parse(savedTodos));
  } catch {
    return [];
  }
}

function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function replaceTodos(updatedTodos) {
  todos.splice(0, todos.length, ...updatedTodos);
}

function renderTodos() {
  list.replaceChildren();
  const visibleTodos = filterTodos(todos, currentFilter);
  const activeCount = countActiveTodos(todos);

  remainingCount.textContent = `剩余 ${activeCount} 项未完成`;
  clearCompletedButton.disabled = activeCount === todos.length;
  emptyState.hidden = visibleTodos.length > 0;
  emptyState.textContent = todos.length === 0
    ? "还没有待办事项，先添加一条吧。"
    : "这个筛选条件下没有待办事项。";

  visibleTodos.forEach((todo) => {
    const item = document.createElement("li");
    item.className = "todo-item";

    if (todo.completed) {
      item.classList.add("is-completed");
    }

    const actions = document.createElement("div");
    actions.className = "todo-actions";

    const toggleButton = document.createElement("button");
    toggleButton.type = "button";
    toggleButton.className = "todo-toggle";
    toggleButton.textContent = todo.title;
    toggleButton.setAttribute("aria-pressed", String(todo.completed));
    toggleButton.addEventListener("click", () => {
      replaceTodos(toggleTodo(todos, todo.id));
      saveTodos();
      renderTodos();
    });

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "todo-delete";
    deleteButton.textContent = "删除";
    deleteButton.setAttribute("aria-label", `删除待办事项：${todo.title}`);
    deleteButton.addEventListener("click", () => {
      replaceTodos(removeTodo(todos, todo.id));
      saveTodos();
      renderTodos();
    });

    actions.append(toggleButton, deleteButton);
    item.append(actions);
    list.append(item);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = input.value.trim();
  if (!title) {
    return;
  }

  todos.push(createTodo(title));
  saveTodos();
  input.value = "";
  input.focus();
  renderTodos();
});

clearCompletedButton.addEventListener("click", () => {
  replaceTodos(removeCompletedTodos(todos));
  saveTodos();
  renderTodos();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;

    filterButtons.forEach((filterButton) => {
      const isCurrentFilter = filterButton === button;
      filterButton.classList.toggle("is-active", isCurrentFilter);
      filterButton.setAttribute("aria-pressed", String(isCurrentFilter));
    });

    renderTodos();
  });
});

renderTodos();
