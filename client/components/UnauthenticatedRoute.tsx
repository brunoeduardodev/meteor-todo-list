import React from "react";
import { Navigate } from "react-router-dom";
import { AppRoutes } from "/client/Router";
import { useCurrentUser } from "../hooks/useCurrentUser";

type Props = {
  route: () => React.JSX.Element;
};

export function UnauthenticatedRoute({ route: Route }: Props) {
  const { user } = useCurrentUser();

  if (user) {
    return <Navigate to={AppRoutes.Home} replace />;
  }

  return <Route />;
}
