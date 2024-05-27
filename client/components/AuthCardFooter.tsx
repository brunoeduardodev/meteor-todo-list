import React from "react";
import { Button, Stack, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { AppRoutes } from "../Router";

type Props = {
  type: "login" | "signup";
};
export function AuthCardFooter({ type }: Props) {
  return (
    <Stack gap="md" align="center" w="100%">
      <Button type="submit" color="indigo" mt="md" fullWidth>
        {type === "login" ? "Login" : "Sign Up"}
      </Button>
      <Text ta="center" size="sm">
        {type === "login"
          ? "Don't have an account?"
          : "Already have an account?"}
      </Text>

      <Button
        component={Link}
        to={type === "login" ? AppRoutes.SignUp : AppRoutes.Login}
        color="indigo"
        variant="outline"
        fullWidth
      >
        {type === "login" ? "Sign Up" : "Login"}
      </Button>
    </Stack>
  );
}
