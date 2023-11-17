import { Box, useMediaQuery, useTheme } from "@mui/material";
import TodosWrapper from "../components/TodosWrapper";

const Overview = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        justifyContent: "space-around",
        gap: 2,
        p: 2,
        bgcolor: "coral",
      }}
    >
      <TodosWrapper heading="Pending" />
      <TodosWrapper heading="Completed" />
    </Box>
  );
};

export default Overview;
