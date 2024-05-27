import React from "react";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { SignUpPage } from "./pages/SignUp";
import { LoginPage } from "./pages/Login";
import { Home } from "./pages/Home";
import { NotFoundPage } from "./pages/NotFound";
import { RootLayout } from "./layouts/RootLayout";
import { RootProviders } from "./components/providers/RootProviders";
import { UnauthenticatedRoute } from "./components/UnauthenticatedRoute";
import { AuthenticatedRoute } from "./components/AuthenticatedRoute";

export const AppRoutes = {
  Home: "/",
  Login: "/login",
  SignUp: "/signup",
};

const routes = createRoutesFromElements(
  <Route path={AppRoutes.Home} element={<RootLayout />}>
    <Route
      path={AppRoutes.Login}
      element={<UnauthenticatedRoute route={LoginPage} />}
    />
    <Route
      path={AppRoutes.SignUp}
      element={<UnauthenticatedRoute route={SignUpPage} />}
    />
    <Route index element={<AuthenticatedRoute route={Home} />} />

    <Route path="*" element={<NotFoundPage />} />
  </Route>
);

const router = createBrowserRouter(routes);

export function Router() {
  return (
    <RootProviders>
      <RouterProvider router={router} />
    </RootProviders>
  );
}
