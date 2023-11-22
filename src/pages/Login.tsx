import { Google } from "@mui/icons-material";
import {
  Button,
  Input,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";

// firebase imports
import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // event handlers
  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/overview");
    } catch (err) {
      if ((err as FirebaseError).code === "auth/invalid-login-credentials") {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          navigate("/overview");
        } catch (err) {
          console.error(err);
        }
      }
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log(auth.currentUser);
      navigate("/overview");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Paper
      sx={{
        p: 2,
        bgcolor: "white",
        width: isMobile ? "80vw" : "40vw",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        justifyContent: "space-between",
      }}
    >
      <Typography
        variant="h6"
        component="h2"
        color="primary"
        sx={{ mb: 3, fontSize: "24px", fontWeight: "bold" }}
      >
        Login
      </Typography>

      {/* Email */}
      <Typography sx={{ mb: 1 }}>Email</Typography>
      <Input
        onChange={(e) => setEmail(e.target.value)}
        sx={{
          mb: 2,
          border: "1px solid",
          borderColor: "secondary.contrastText",
          borderRadius: 1,
          px: 1,
        }}
        disableUnderline
        placeholder="enter your email..."
        fullWidth
        required
        name="email"
      />

      {/* Password */}
      <Typography sx={{ mb: 1 }}>Password</Typography>
      <Input
        onChange={(e) => setPassword(e.target.value)}
        sx={{
          mb: 2,
          border: "1px solid",
          borderColor: "secondary.contrastText",
          borderRadius: 1,
          px: 1,
        }}
        disableUnderline
        placeholder="enter your password..."
        type="password"
        fullWidth
        required
        name="password"
      />

      <Stack
        direction={isMobile ? "column" : "row"}
        gap={isMobile ? 0 : 3}
        mt={1}
        width={"100%"}
        alignItems={"center"}
      >
        <Button
          onClick={signIn}
          variant="contained"
          fullWidth={isMobile ? true : false}
          sx={{
            mt: 1,
            mb: isMobile ? 1 : 2,
            "&:hover": {
              transform: "translateY(-3px) scale(1.02)",
              transition: "transform 0.2s",
            },
          }}
        >
          Sign In
        </Button>

        <Typography sx={{ color: "rgba(0, 0, 0, 0.6)", mb: 1 }}>OR</Typography>

        <Button
          onClick={signInWithGoogle}
          variant="contained"
          startIcon={<Google />}
          sx={{
            mt: isMobile ? 0 : 1,
            mb: 2,
            bgcolor: "rgba(0,0,0,0.8)",
            color: "white",
            "&:hover": {
              transform: "translateY(-3px) scale(1.02)",
              transition: "transform 0.2s",
              bgcolor: "rgba(0,0,0,0.9)",
            },
          }}
        >
          Sign In With Google
        </Button>
      </Stack>
    </Paper>
  );
};

export default Login;
