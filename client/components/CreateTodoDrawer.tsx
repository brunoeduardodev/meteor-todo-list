import React from "react";
import { Button, Drawer, Stack, TextInput } from "@mantine/core";
import { useZodForm } from "../hooks/useZodForm";
import { z } from "zod";
import { FormContainer } from "./FormContainer";
import { api } from "../api";
import { showErrorToast } from "../utils/showErrorToast";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateTodoSchema = z.object({
  title: z.string(),
});

export const CreateTodoDrawer = ({ isOpen, onClose }: Props) => {
  const queryClient = useQueryClient();
  const createTodoMutation = api.todo.createTodo.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo.listTodos"] });
    },
  });
  const form = useZodForm({
    schema: CreateTodoSchema,
    initialValues: { title: "" },
  });

  const onCreateTodo = form.onSubmit(async ({ title }) => {
    try {
      await createTodoMutation.mutateAsync({ title });
      form.reset();
      onClose();
    } catch (err) {
      showErrorToast(err);
    }
  });

  return (
    <Drawer
      title="Create Todo"
      position="right"
      withCloseButton
      opened={isOpen}
      onClose={onClose}
    >
      <FormContainer onSubmit={onCreateTodo}>
        <TextInput label="Title" {...form.getInputProps("title")} />
        <Button type="submit">Create Todo</Button>
      </FormContainer>
    </Drawer>
  );
};
