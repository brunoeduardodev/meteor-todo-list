import { z } from "zod";
import { TodoCollection } from "../collection";
import { Meteor } from "meteor/meteor";

export const DeleteTodoSchema = z.object({
  _id: z.string(),
});

export type DeleteTodoInput = z.infer<typeof DeleteTodoSchema>;

export const deleteTodo = async ({ _id }: DeleteTodoInput) => {
  const userId = Meteor.userId();
  if (!userId) {
    throw new Meteor.Error("Not authorized");
  }

  await TodoCollection.removeAsync({ _id, userId });
  return {
    _id,
  };
};
