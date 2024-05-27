import React from "react";
import { Navigate } from "react-router-dom";
import { AppRoutes } from "/client/Router";
import { useCurrentUser } from "../hooks/useCurrentUser";

type Props = {
  route: () => React.ReactNode;
};

export function AuthenticatedRoute({ route: Route }: Props) {
  const { user } = useCurrentUser();

  if (!user) {
    return <Navigate to={AppRoutes.Login} replace />;
  }

  return <Route />;
}
