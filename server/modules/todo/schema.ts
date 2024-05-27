import { z } from "zod";

export const TodoSchema = z.object({
  _id: z.string(),
  title: z.string(),
  isCompleted: z.boolean(),
  userId: z.string(),

  createdAt: z.date(),
});

export type Todo = z.infer<typeof TodoSchema>;
