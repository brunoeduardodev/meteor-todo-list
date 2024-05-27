import { Box } from "@mantine/core";
import React, { FormEventHandler, ReactNode } from "react";

type Props = {
  children: ReactNode;
  onSubmit: FormEventHandler<HTMLFormElement>;
};
export const FormContainer = ({ children, onSubmit }: Props) => {
  return (
    <Box
      component={"form"}
      onSubmit={onSubmit}
      display={"flex"}
      style={{
        flexDirection: "column",
        gap: "1rem",
        width: "100%",
      }}
    >
      {children}
    </Box>
  );
};
