import { Stack } from "@mui/material";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";

const Layout = () => {
  return (
    <Stack direction="row" spacing={2}>
      <Sidebar />
      <Home />
    </Stack>
  );
};

export default Layout;
