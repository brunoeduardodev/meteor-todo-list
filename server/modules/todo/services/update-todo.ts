import { z } from "zod";
import { TodoSchema } from "../schema";
import { Meteor } from "meteor/meteor";
import { TodoCollection } from "../collection";

export const UpdateTodoSchema = TodoSchema.pick({
  title: true,
  isCompleted: true,
}).extend({
  _id: z.string(),
});

export type UpdateTodoInput = z.infer<typeof UpdateTodoSchema>;

export const updateTodo = async ({
  isCompleted,
  title,
  _id,
}: UpdateTodoInput) => {
  const userId = Meteor.userId();
  if (!userId) throw new Meteor.Error("Not authorized");

  const todo = await TodoCollection.updateAsync(
    {
      _id,
      userId,
    },
    {
      $set: {
        title,
        isCompleted,
      },
    }
  );

  if (!todo) throw new Meteor.Error("Todo not found");

  return {
    _id,
  };
};
