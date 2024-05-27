import React from "react";
import { Flex } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { RootSuspenseAndErrorBoundary } from "../components/RootSuspenseAndErrorBoundary";
import { Header } from "../components/Header";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export function RootLayout() {
  return (
    <RootSuspenseAndErrorBoundary>
      <Flex direction="column" flex={1} bg="gray.1">
        <Header />
        <Flex
          flex={1}
          direction="column"
          gap="md"
          p="md"
          maw="80rem"
          mx="auto"
          w="100%"
        >
          <Outlet />
        </Flex>
      </Flex>
    </RootSuspenseAndErrorBoundary>
  );
}
