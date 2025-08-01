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

  // Rotas só para NÃO autenticados
  const rotasNaoAutenticado = [
    { path: "/login", element: <Login /> },
  ];

  // Rotas só para autenticados
  const rotasAutenticado = [
    {
      path: "/",
      element: <ProtectedRoute />, // checa token e devolve <Outlet/>
      children: [
        { index: true, element: <Listagem /> },
        { path: "novo", element: <Formulario /> },
        { path: "editar/:id", element: <Formulario /> },
        { path: "detalhe/:id", element: <Detalhe /> },
        { path: "perfil/:id", element: <Perfil /> },
      ],
    },
  ];

  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        ...(!token ? rotasNaoAutenticado : []),
        ...(token ? rotasAutenticado : []),
        {
          path: "*",
          element: <Navigate to="/login" replace />
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
