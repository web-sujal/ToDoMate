import { Navigate } from "react-router";
import { auth } from "../config/firebase";
import Layout from "../Layout";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PrivateRoutes = () => {
  // const user = auth.currentUser;
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

  return <Layout />;
};

export default PrivateRoutes;
