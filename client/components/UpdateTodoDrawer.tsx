import React, { useEffect } from "react";
import { Button, Checkbox, Drawer, TextInput } from "@mantine/core";
import { useZodForm } from "../hooks/useZodForm";
import { z } from "zod";
import { FormContainer } from "./FormContainer";
import { api } from "../api";
import { showErrorToast } from "../utils/showErrorToast";
import { useQueryClient } from "@tanstack/react-query";
import { Todo } from "/server/modules/todo/schema";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  todo?: Todo;
};

const CreateTodoSchema = z.object({
  title: z.string(),
  isCompleted: z.boolean(),
});

export const UpdateTodoDrawer = ({ isOpen, onClose, todo }: Props) => {
  const queryClient = useQueryClient();
  const updateTodoMutation = api.todo.updateTodo.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo.listTodos"] });
    },
  });
  const form = useZodForm({
    schema: CreateTodoSchema,
    initialValues: {
      title: todo?.title || "",
      isCompleted: todo?.isCompleted || false,
    },
  });

  useEffect(() => {
    if (!todo) return;
    form.setValues({
      title: todo.title,
      isCompleted: todo.isCompleted,
    });
  }, [form.setValues, todo]);

  const onCreateTodo = form.onSubmit(async ({ title, isCompleted }) => {
    if (!todo) return;
    try {
      await updateTodoMutation.mutateAsync({
        title,
        isCompleted,
        _id: todo._id,
      });
      onClose();
    } catch (err) {
      showErrorToast(err);
    }
  });

  return (
    <Drawer
      title="Update Todo"
      position="right"
      withCloseButton
      opened={isOpen}
      onClose={onClose}
    >
      <FormContainer onSubmit={onCreateTodo}>
        <TextInput label="Title" {...form.getInputProps("title")} />
        <Checkbox
          label="Is Completed"
          {...form.getInputProps("isCompleted")}
          checked={form.getInputProps("isCompleted").value}
        />
        <Button type="submit">Update Todo</Button>
      </FormContainer>
    </Drawer>
  );
};
