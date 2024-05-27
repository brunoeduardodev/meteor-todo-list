import { z } from "zod";
import { Meteor } from "meteor/meteor";
import { TodoCollection } from "../collection";

export const CheckTodoSchema = z.object({
  _id: z.string(),
});

export type CheckTodoInput = z.infer<typeof CheckTodoSchema>;

export const checkTodo = async ({ _id }: CheckTodoInput) => {
  const userId = Meteor.userId();
  if (!userId) throw new Meteor.Error("Not authorized");

  const todo = await TodoCollection.updateAsync(
    {
      _id,
      userId,
    },
    {
      $set: {
        isCompleted: true,
      },
    }
  );

  if (!todo) throw new Meteor.Error("Todo not found");

  return {
    _id,
  };
};
