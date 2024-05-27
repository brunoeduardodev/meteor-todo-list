import { Anchor, Button, Group, Image, Title } from "@mantine/core";
import { Link } from "react-router-dom";

import React from "react";
import { Meteor } from "meteor/meteor";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { AppRoutes } from "/client/Router";

export function Header() {
  const { user } = useCurrentUser();

  const handleLogout = () => {
    Meteor.logout();
  };

  return (
    <Group
      component="header"
      align="center"
      justify="space-between"
      py="sm"
      px="sm"
    >
      <Anchor component={Link} to={AppRoutes.Home}>
        <Title order={4}>Todo List</Title>
      </Anchor>

      {user ? (
        <Button color="dark" onClick={handleLogout}>
          Log out
        </Button>
      ) : (
        <Link to={AppRoutes.Login}>
          <Button color="dark">Login</Button>
        </Link>
      )}
    </Group>
  );
}
