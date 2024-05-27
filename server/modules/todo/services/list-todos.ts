import { z } from "zod";
import { TodoCollection } from "../collection";
import { Meteor } from "meteor/meteor";
import { Todo } from "../schema";

export const ListTodoSchema = z.object({
  page: z.number().optional().default(1),
  limit: z.number().min(1).max(50).optional().default(10),
  search: z.string().optional(),
});

export type ListTodosInput = z.infer<typeof ListTodoSchema>;

export const listTodos = async ({ limit, page, search }: ListTodosInput) => {
  const userId = Meteor.userId();
  if (!userId) {
    throw new Meteor.Error("Not authorized");
  }

  const RawTodos = TodoCollection.rawDatabase().collection<Todo>("todos");

  const [result] = await RawTodos.aggregate([
    {
      $match: {
        userId,
        ...(search ? { title: { $regex: new RegExp(search, "i") } } : {}),
      },
    },
    {
      $facet: {
        data: [
          {
            $sort: { createdAt: -1 },
          },
          {
            $skip: (page - 1) * limit,
          },
          {
            $limit: limit,
          },
        ],
        metadata: [{ $count: "totalCount" }],
      },
    },
  ]).toArray();

  return {
    data: result.data as Todo[],
    totalPages: Math.ceil((result.metadata[0]?.totalCount ?? 0) / limit),
  };
};
