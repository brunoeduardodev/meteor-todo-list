import React, { Suspense, useState } from "react";
import {
  Button,
  Group,
  Loader,
  Stack,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import { CreateTodoDrawer } from "./CreateTodoDrawer";
import { TodoListItems } from "./TodoListItems";
import { UpdateTodoDrawer } from "./UpdateTodoDrawer";
import { Todo } from "/server/modules/todo/schema";
import { TodoListItemsPagination } from "./TodoListItemsPagination";
import { TableOverlay } from "./TableOverlay";
import { modals } from "@mantine/modals";
import { api } from "../api";
import { useQueryClient } from "@tanstack/react-query";
import { SearchIcon } from "lucide-react";

export const TodoList = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState("");

  const [todoToEdit, setTodoToEdit] = useState<Todo>();

  const [isCreateOpen, createHandlers] = useDisclosure();
  const [isUpdateOpen, updateHandlers] = useDisclosure();

  const queryClient = useQueryClient();

  const [debouncedSearch] = useDebouncedValue(search, 300);
  const isDebouncing = debouncedSearch !== search;

  const deleteTodoMutation = api.todo.deleteTodo.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo.listTodos"] });
    },
  });

  return (
    <Stack>
      <CreateTodoDrawer isOpen={isCreateOpen} onClose={createHandlers.close} />
      <UpdateTodoDrawer
        isOpen={isUpdateOpen}
        onClose={() => {
          updateHandlers.close();
        }}
        todo={todoToEdit}
      />
      <Group gap="sm">
        <TextInput
          placeholder="Search"
          leftSection={<SearchIcon size={16} />}
          rightSection={isDebouncing ? <Loader size="xs" c="dark.0" /> : null}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          flex={1}
        />

        <Button onClick={createHandlers.open}>Create Todo</Button>
      </Group>

      <Table.ScrollContainer minWidth={800}>
        <Table striped stickyHeader>
          <Table.Thead>
            <Table.Tr>
              <Table.Th w="20%"># </Table.Th>
              <Table.Th w="40%">Title</Table.Th>
              <Table.Th w="10%">Completed</Table.Th>
              <Table.Th w="20%">Created</Table.Th>
              <Table.Th w="10%"></Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Suspense
            fallback={
              <TableOverlay>
                <Loader />
              </TableOverlay>
            }
          >
            <TodoListItems
              onUpdate={(todo) => {
                setTodoToEdit(todo);
                updateHandlers.open();
              }}
              onDelete={(todo) => {
                modals.openConfirmModal({
                  title: "Delete Todo",
                  children: (
                    <Text size="sm">
                      Are you sure you want to delete {todo.title}?
                    </Text>
                  ),
                  labels: { confirm: "Confirm", cancel: "Cancel" },
                  centered: true,
                  confirmProps: { color: "red" },
                  onConfirm: () => {
                    deleteTodoMutation.mutateAsync({ _id: todo._id });
                  },
                });
              }}
              search={debouncedSearch}
              page={page}
              limit={limit}
            />
          </Suspense>
        </Table>
      </Table.ScrollContainer>
      <Suspense fallback={<Loader size="xs" />}>
        <TodoListItemsPagination
          search={debouncedSearch}
          page={page}
          limit={limit}
          onLimitChange={setLimit}
          onPageChange={setPage}
        />
      </Suspense>
    </Stack>
  );
};
