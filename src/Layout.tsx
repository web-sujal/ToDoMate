import { Box, CircularProgress, Stack } from "@mui/material";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import "./App.css";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext, AuthContextType } from "./contexts/AuthContext";
import { useContext } from "react";

const Layout = () => {
  const { user, loading } = useContext(AuthContext) as AuthContextType;
  const location = useLocation();

  if (location.pathname === "/") {
    if (loading) {
      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            height: "100vh",
            width: "100vw",
          }}
        >
          <CircularProgress />
          <h2>Layout</h2>
        </Box>
      );
    } else if (user) {
      return <Navigate to="/overview" />;
    } else {
      return <Navigate to="/login" />;
    }
  }

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
