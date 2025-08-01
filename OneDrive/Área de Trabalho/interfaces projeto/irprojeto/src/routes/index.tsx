// src/routes/index.tsx
import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  Outlet,
  Navigate,
} from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";

import Listagem from "../pages/Listagem";
import Detalhe from "../pages/Detalhe";
import Perfil from "../pages/Perfil";
import Formulario from "../pages/Formulario";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import wallp from "../assets/wallp2.jpg";

const Layout: React.FC = () => (
  <div
    style={{
      backgroundImage: `url(${wallp})`,
      minHeight: "100vh",
      backgroundSize: "cover",
    }}
  >

    <Outlet />
  </div>
);

const Routes: React.FC = () => {
  const { token } = useAuth();

  // Rotas públicas
  const routesForPublic = [
    { path: "/detalhe/:id", element: <Detalhe /> },
    { path: "/perfil/:id", element: <Perfil /> },
  ];

  // Rotas só para NÃO autenticados
  const routesForNotAuthenticatedOnly = [
    { path: "/login", element: <Login /> },
  ];

  // Rotas só para autenticados
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, // checa token e devolve <Outlet/>
      children: [
        { index: true, element: <Listagem /> }, // “/”
        { path: "novo", element: <Formulario /> }, // “/novo”
        { path: "editar/:id", element: <Formulario /> }, // “/editar/:id”
      ],
    },
  ];

  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        ...routesForPublic,
        ...(!token ? routesForNotAuthenticatedOnly : []),
        ...(token ? routesForAuthenticatedOnly : []),
        {
          path: "*",
          element: token ? (
            <Navigate to="/" replace />
          ) : (
            <Navigate to="/login" replace />
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
