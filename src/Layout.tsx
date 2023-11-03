import { Stack } from "@mui/material";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import "./App.css";

const Layout = () => {
  return (
    <Stack direction="row">
      <Sidebar />
      <Home />
    </Stack>
  );
};

export default Layout;
