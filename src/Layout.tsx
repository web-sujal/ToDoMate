import { Box, Stack } from "@mui/material";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import "./App.css";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { User } from "@firebase/auth";
import { auth } from "./config/firebase";

const Layout = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setUser(user);
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
