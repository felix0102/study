function createId() {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function createTodo(title, id = createId()) {
  return { id, title, completed: false };
}

export function normalizeTodos(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((todo) => todo && typeof todo.title === "string")
    .map((todo) => ({
      id: typeof todo.id === "string" ? todo.id : createId(),
      title: todo.title,
      completed: Boolean(todo.completed),
    }));
}

export function filterTodos(todos, filter) {
  if (filter === "active") {
    return todos.filter((todo) => !todo.completed);
  }

  if (filter === "completed") {
    return todos.filter((todo) => todo.completed);
  }

  return todos;
}

export function toggleTodo(todos, id) {
  return todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo,
  );
}

export function removeTodo(todos, id) {
  return todos.filter((todo) => todo.id !== id);
}
