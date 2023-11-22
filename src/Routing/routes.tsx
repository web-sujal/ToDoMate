import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import Overview from "../pages/Overview";
import ErrorPage from "../pages/ErrorPage";
import Settings from "../pages/Settings";
import Today from "../pages/Today";
import About from "../pages/About";
import Trash from "../pages/Trash";
import Archive from "../pages/Archive";
import Login from "../pages/Login";
import PrivateRoutes from "./PrivateRoutes";

const routes = [
  {
    path: "/",
    element: <Layout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
  {
    element: <PrivateRoutes />,
    children: [
      {
        path: "overview",
        element: <Overview />,
      },
      {
        path: "today",
        element: <Today />,
      },
      {
        path: "archieve",
        element: <Archive />,
      },
      {
        path: "trash",
        element: <Trash />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
