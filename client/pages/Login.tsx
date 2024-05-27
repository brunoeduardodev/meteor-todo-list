import React from "react";
import { AuthCard } from "../components/AuthCard";
import { z } from "zod";
import { useZodForm } from "../hooks/useZodForm";
import { AuthCardFooter } from "../components/AuthCardFooter";
import { Box, TextInput } from "@mantine/core";
import { Meteor } from "meteor/meteor";
import { showErrorToast } from "../utils/showErrorToast";
import { FormContainer } from "../components/FormContainer";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const LoginPage = () => {
  const form = useZodForm({
    schema: LoginSchema,
    initialValues: {
      email: "",
      password: "",
    },
  });

  const onSignIn = form.onSubmit((values) => {
    Meteor.loginWithPassword(values.email, values.password, (err) => {
      if (err) return;
      showErrorToast(err);
    });
  });

  return (
    <AuthCard title="Login">
      <FormContainer onSubmit={onSignIn}>
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

        <AuthCardFooter type="login" />
      </FormContainer>
    </AuthCard>
  );
};
