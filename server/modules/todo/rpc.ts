import * as grubba from "grubba-rpc";
import { CreateTodoSchema } from "./services/create-todo";
import { todoServices } from "./services";
import { ListTodoSchema } from "./services/list-todos";
import { UpdateTodoSchema } from "./services/update-todo";
import { CheckTodoSchema } from "./services/check-todo";
import { UncheckTodoSchema } from "./services/uncheck-todo";
import { DeleteTodoSchema } from "./services/delete-todo";

export const todoRpc = grubba
  .createModule("todo")
  .addMethod("createTodo", CreateTodoSchema, todoServices.createTodo)
  .addMethod("listTodos", ListTodoSchema, todoServices.listTodos)
  .addMethod("updateTodo", UpdateTodoSchema, todoServices.updateTodo)
  .addMethod("checkTodo", CheckTodoSchema, todoServices.checkTodo)
  .addMethod("uncheckTodo", UncheckTodoSchema, todoServices.uncheckTodo)
  .addMethod("deleteTodo", DeleteTodoSchema, todoServices.deleteTodo)
  .buildSubmodule();
