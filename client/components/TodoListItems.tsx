import React from "react";
import { ActionIcon, Checkbox, Group, Table, Text } from "@mantine/core";
import { api } from "../api";
import { useQueryClient } from "@tanstack/react-query";
import { showErrorToast } from "../utils/showErrorToast";
import { EditIcon, TrashIcon } from "lucide-react";
import { Todo } from "/server/modules/todo/schema";
import { TableOverlay } from "./TableOverlay";
import { format } from "date-fns";

type Props = {
  page: number;
  limit: number;
  search: string;

  onUpdate: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
};

export const TodoListItems = ({
  page,
  limit,
  search,
  onUpdate,
  onDelete,
}: Props) => {
  const queryClient = useQueryClient();

  const checkTodoMutation = api.todo.checkTodo.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo.listTodos"] });
    },
  });

  const uncheckTodoMutation = api.todo.uncheckTodo.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo.listTodos"] });
    },
  });
  const { data } = api.todo.listTodos.useQuery({
    page,
    limit,
    search,
  });
  const todos = data?.data || [];

  if (!todos?.length) {
    return (
      <TableOverlay>
        <Text fw={500}>{search ? "No todos found" : "You have no todos"}</Text>
      </TableOverlay>
    );
  }

  return (
    <Table.Tbody mah={300}>
      {todos?.map((todo) => (
        <Table.Tr key={todo._id}>
          <Table.Td>{todo._id}</Table.Td>
          <Table.Td>{todo.title}</Table.Td>
          <Table.Td>
            <Checkbox
              checked={todo.isCompleted}
              onChange={(e) => {
                const { checked } = e.target;
                try {
                  checked
                    ? checkTodoMutation.mutateAsync({ _id: todo._id })
                    : uncheckTodoMutation.mutateAsync({ _id: todo._id });
                } catch (err) {
                  showErrorToast(err);
                }
              }}
            />
          </Table.Td>
          <Table.Td>{format(todo.createdAt, "MMM d, h:mm a")}</Table.Td>
          <Table.Td>
            <Group gap="xs">
              <ActionIcon
                size="xs"
                variant="transparent"
                onClick={() => onUpdate(todo)}
              >
                <EditIcon size={16} />
              </ActionIcon>

              <ActionIcon
                size="xs"
                color="red"
                variant="transparent"
                onClick={() => {
                  onDelete(todo);
                }}
              >
                <TrashIcon />
              </ActionIcon>
            </Group>
          </Table.Td>
        </Table.Tr>
      ))}
    </Table.Tbody>
  );
};
