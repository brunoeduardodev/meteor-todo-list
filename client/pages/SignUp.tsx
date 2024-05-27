import React from "react";
import { AuthCard } from "../components/AuthCard";
import { z } from "zod";
import { useZodForm } from "../hooks/useZodForm";
import { AuthCardFooter } from "../components/AuthCardFooter";
import { Box, TextInput } from "@mantine/core";
import { Accounts } from "meteor/accounts-base";
import { showErrorToast } from "../utils/showErrorToast";
import { FormContainer } from "../components/FormContainer";
import { useQueryClient } from "@tanstack/react-query";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const SignUpPage = () => {
  const form = useZodForm({
    schema: LoginSchema,
    initialValues: {
      email: "",
      password: "",
    },
  });

  const queryClient = useQueryClient();

  const onSignUp = form.onSubmit(({ email, password }) => {
    Accounts.createUser({ email, password }, (err) => {
      queryClient.invalidateQueries({ queryKey: ["todo.listTodos"] });

      if (err) return;
      showErrorToast(err);
    });
  });

  return (
    <AuthCard title="Sign Up">
      <FormContainer onSubmit={onSignUp}>
        <TextInput
          label="Email"
          placeholder="brunomedeiros@gmail.com"
          {...form.getInputProps("email")}
        />

        <TextInput
          label="Password"
          placeholder="123456"
          type="password"
          {...form.getInputProps("password")}
        />

        <AuthCardFooter type="signup" />
      </FormContainer>
    </AuthCard>
  );
};
