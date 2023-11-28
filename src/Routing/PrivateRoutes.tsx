import { Navigate } from "react-router";
import { auth } from "../config/firebase";
import Layout from "../Layout";

const PrivateRoutes = () => {
  const user = auth.currentUser;

  return user ? <Layout /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
