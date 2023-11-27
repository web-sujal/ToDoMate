import { Box, Stack } from "@mui/material";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import "./App.css";
import { useNavigate } from "react-router-dom";
import { auth } from "./config/firebase";
import { useEffect } from "react";

const Layout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = () => {
      auth.onAuthStateChanged((currentUser) => {
        if (currentUser) {
          navigate("/overview");
        } else {
          navigate("/settings");
        }
      });
    };

    return () => unsubscribe();
  }, []);

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
