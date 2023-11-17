import {
  Box,
  Button,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Todo from "./Todo";

type TodosWrapperProps = {
  heading: string;
};

const TodosWrapper = ({ heading }: TodosWrapperProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          p: 2,
          bgcolor: "white",
          minWidth: "35vw",
        }}
      >
        {/* label and counter */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography fontWeight={800} fontSize="large">
            {heading}
          </Typography>

          {/* Counter */}
          <Typography>2</Typography>
        </Box>

        {/* add button */}
        <Button
          sx={{
            width: "100%",
            bgcolor: "primary.main",
            color: "white",
            cursor: "pointer",
            fontSize: "large",
            "&:hover": {
              bgcolor: "primary.light",
              transform: "translateY(-3px)",
              transition: "transform 0.3s",
            },
          }}
        >
          +
        </Button>

        {/* Todos */}
        <Box sx={{ width: "100%" }}>
          <Todo text="Watch Loki s2" />
          <Todo text="Collect Fanny LightBorn Skin with ablazing skill animations" />
          <Todo text="Download Vinland Saga" />
        </Box>
      </Paper>
    </Box>
  );
};

export default TodosWrapper;
