import React, { ReactNode } from "react";
import { Paper, Stack, Title } from "@mantine/core";

type Props = {
  title: string;
  children: ReactNode;
};

export const AuthCard = ({ title, children }: Props) => {
  return (
    <Stack align="center" justify="center" flex={1}>
      <Paper shadow="md" p="md" bg="gray.0" miw={400}>
        <Stack flex={1} align="center" justify="center" gap="lg">
          <Title order={4}>{title}</Title>

          {children}
        </Stack>
      </Paper>
    </Stack>
  );
};
