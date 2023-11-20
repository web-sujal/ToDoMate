import { Box, Stack } from "@mui/material";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import "./App.css";

const Layout = () => {
  return (
    <Stack direction="row">
      <Box sx={{ display: { xs: "none", sm: "block", height: "100vh" } }}>
        <Sidebar />
      </Box>
      <Home />
    </Stack>
  );
};

export default Layout;

// I'm building this on my own.
// It's a to-do app. I've already incorporated react-router and built many components like a sidebar, navbar, and overview page with all necessary reusable components like Input, add todo modal, FAB, etc.

// currently, I'm working on a feature that allows users to add tags to the to-do.
// it's static data for now I haven't built backend yet.

// please review my code
