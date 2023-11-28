import { Box, Stack } from "@mui/material";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import "./App.css";
import { Navigate, useLocation } from "react-router-dom";
import { auth } from "./config/firebase";

const Layout = () => {
  const user = auth.currentUser;
  const location = useLocation();

  if (location.pathname === "/")
    return user ? <Navigate to="/overview" /> : <Navigate to="/login" />;

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

{
  /*
import { Box, Stack } from "@mui/material";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import "./App.css";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { auth } from "./config/firebase";
import { useEffect } from "react";

const Layout = () => {
  const user = auth.currentUser;
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          navigate("/overview");
        } else {
          navigate("/login");
        }
      });
    };

    return () => unsubscribe();
  }, []);

  if (location.pathname === "/")
    return user ? <Navigate to="/overview" /> : <Navigate to="/login" />;

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
   */
}
