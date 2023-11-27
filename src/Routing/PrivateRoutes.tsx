import { Navigate } from "react-router";
import { auth } from "../config/firebase";
import Layout from "../Layout";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";

const PrivateRoutes = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = () => {
      auth.onAuthStateChanged((user) => {
        console.log("Auth state changed");
        if (user) {
          setUser(user);
          console.log("Navigating to /overview");
          navigate("/overview");
        } else {
          console.log("Navigating to /login");
          navigate("/login");
        }
      });
    };

    return () => unsubscribe();
  }, []);

  return user ? <Layout /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
