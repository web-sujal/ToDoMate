import { ReactNode, createContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { User, onAuthStateChanged } from "firebase/auth";

export type AuthContextType = {
  user: User | null;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  console.log("in auth context");

  useEffect(() => {
    const unsub = () => {
      console.log("Auth state changed:", user);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
        setLoading(false);
      });
    };

    unsub();

    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
