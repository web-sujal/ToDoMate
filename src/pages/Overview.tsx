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
        justifyContent: isMobile ? "flex-start" : "space-around",
        p: isMobile ? 0 : 2,
        pt: 2,
        gap: 2,
        width: "100%",
      }}
    >
      <TodosWrapper heading="Pending" />
      <TodosWrapper heading="Completed" />
    </Box>
  );
};

export default Overview;
