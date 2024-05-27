import React from "react";
import { Group, Pagination, Select } from "@mantine/core";
import { api } from "../api";

type Props = {
  page: number;
  limit: number;
  search: string;

  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
};

export const TodoListItemsPagination = ({
  limit,
  page,
  search,
  onPageChange,
  onLimitChange,
}: Props) => {
  const { data } = api.todo.listTodos.useQuery({
    limit,
    page,
    search,
  });

  return (
    <Group>
      <Pagination total={data.totalPages} onChange={onPageChange} />
      <Select
        label="Limit"
        styles={{
          root: {
            display: "flex",
            alignItems: "center",
            gap: 8,
          },
        }}
        value={String(limit)}
        data={["5", "10", "20", "50"]}
        onChange={(value) => onLimitChange(Number(value))}
      ></Select>
    </Group>
  );
};
