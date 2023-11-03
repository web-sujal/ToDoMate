import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Overview from "./pages/Overview";
import ErrorPage from "./pages/ErrorPage";
import Settings from "./pages/Settings";
import Today from "./pages/Today";
import About from "./pages/About";
import Trash from "./pages/Trash";
import Archive from "./pages/Archive";

const routes = [
  {
    path: "/",
    element: <Layout />,
    // errorElement: <ErrorPage />,
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
];

export const router = createBrowserRouter(routes);

/*

Overview
Today
Archieve
Trash
Settings
About

*/
