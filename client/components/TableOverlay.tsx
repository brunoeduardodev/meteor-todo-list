import React, { ReactNode } from "react";
import { Flex, Loader, Table } from "@mantine/core";

type Props = {
  children: ReactNode;
};

export const TableOverlay = ({ children }: Props) => {
  return (
    <Table.Tbody>
      <Table.Tr pos="relative" style={{ border: "none" }}>
        <Flex w="100%" mih="12rem" bg="gray.1" />
        <Flex
          pos="absolute"
          inset={0}
          w="100%"
          justify={"center"}
          align={"center"}
        >
          {children}
        </Flex>
      </Table.Tr>
    </Table.Tbody>
  );
};
