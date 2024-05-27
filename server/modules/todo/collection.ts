import { Mongo } from "meteor/mongo";
import { Todo } from "./schema";

export const TodoCollection = new Mongo.Collection<Todo>("todos");
