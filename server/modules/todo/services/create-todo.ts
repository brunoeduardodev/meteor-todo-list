import { z } from "zod";
import { TodoSchema } from "../schema";
import { TodoCollection } from "../collection";
import { Meteor } from "meteor/meteor";

export const CreateTodoSchema = TodoSchema.pick({ title: true });
export type CreateTodoInput = z.infer<typeof CreateTodoSchema>;

export const createTodo = async (input: CreateTodoInput) => {
  const userId = Meteor.userId();
  if (!userId) throw new Meteor.Error("Not authorized");

  const _id = await TodoCollection.insertAsync({
    ...input,
    userId,
    isCompleted: false,
    createdAt: new Date(),
  });

  return {
    _id,
  };
};
