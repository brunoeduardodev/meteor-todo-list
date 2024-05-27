import { z } from "zod";
import { Meteor } from "meteor/meteor";
import { TodoCollection } from "../collection";

export const UncheckTodoSchema = z.object({
  _id: z.string(),
});

export type UncheckTodoInput = z.infer<typeof UncheckTodoSchema>;

export const uncheckTodo = async ({ _id }: UncheckTodoInput) => {
  const userId = Meteor.userId();
  if (!userId) throw new Meteor.Error("Not authorized");

  const todo = await TodoCollection.updateAsync(
    {
      _id,
      userId,
    },
    {
      $set: {
        isCompleted: false,
      },
    }
  );

  if (!todo) throw new Meteor.Error("Todo not found");

  return {
    _id,
  };
};
