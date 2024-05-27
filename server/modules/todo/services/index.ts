import { checkTodo } from "./check-todo";
import { createTodo } from "./create-todo";
import { deleteTodo } from "./delete-todo";
import { listTodos } from "./list-todos";
import { uncheckTodo } from "./uncheck-todo";
import { updateTodo } from "./update-todo";

export const todoServices = {
  createTodo,
  listTodos,
  updateTodo,
  checkTodo,
  uncheckTodo,
  deleteTodo,
};
