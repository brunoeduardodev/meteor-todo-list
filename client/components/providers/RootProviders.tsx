import React, { PropsWithChildren } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Notifications } from "@mantine/notifications";
import { mantine } from "/client/theme/mantine";

const queryClient = new QueryClient();

export function RootProviders({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />

      <MantineProvider theme={mantine}>
        <ModalsProvider>
          <Notifications />
          {children}
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
}
