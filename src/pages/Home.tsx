import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <Box flex={4} width={"100%"}>
      <Navbar />
      <Outlet />
    </Box>
  );
};

export default Home;
