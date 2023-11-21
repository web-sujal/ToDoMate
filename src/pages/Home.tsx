import { Box, Fab, useMediaQuery, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Add } from "@mui/icons-material";
import AddTodo from "../components/AddTodo";
import { useState } from "react";

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);

  return (
    <Box
      flex={4}
      width={"100%"}
      bgcolor="background.paper"
      sx={{ minHeight: "100vh" }}
    >
      <Navbar />
      <Outlet />
      <Fab
        onClick={() => setOpen(true)}
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: "25px",
          left: "50%",
          transform: "translateX(-50%)",
          display: isMobile ? "" : "none",
          "&:hover": {
            bgcolor: "primary.light",
          },
        }}
      >
        <Add />
      </Fab>
      <AddTodo open={open} setOpen={setOpen} />
    </Box>
  );
};

export default Home;
