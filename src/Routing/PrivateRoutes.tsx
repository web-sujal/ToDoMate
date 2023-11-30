import { Navigate } from "react-router";
import Layout from "../Layout";
import { AuthContext, AuthContextType } from "../contexts/AuthContext";
import { useContext } from "react";
import { Box, CircularProgress } from "@mui/material";

const PrivateRoutes = () => {
  const { user, loading } = useContext(AuthContext) as AuthContextType;

  if (loading)
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
        <h2>Private Routes</h2>
      </Box>
    );

  return user ? <Layout /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
