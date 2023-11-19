import { Box, Button, Paper, Typography } from "@mui/material";
import Todo from "./Todo";

type TodosWrapperProps = {
  heading: string;
};

const TodosWrapper = ({ heading }: TodosWrapperProps) => {
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        p: 2,
        bgcolor: "white",
        width: "100%",
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
      <Box
        sx={{
          width: "100%",
          overflowY: "scroll",
          maxHeight: "55vh",
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "primary.main",
          },
          "&::-webkit-scrollbar": {
            width: 3,
          },
        }}
      >
        <Todo text="Watch Loki s2" />
        <Todo text="Collect Fanny LightBorn Skin with ablazing skill animations" />
        <Todo text="Download Vinland Saga" />
        <Todo text="Watch Loki s2" />
        <Todo text="Collect Fanny LightBorn Skin with ablazing skill animations" />
        <Todo text="Download Vinland Saga" />
        <Todo text="Watch Loki s2" />
        <Todo text="Collect Fanny LightBorn Skin with ablazing skill animations" />
        <Todo text="Download Vinland Saga" />
        <Todo text="Watch Loki s2" />
        <Todo text="Collect Fanny LightBorn Skin with ablazing skill animations" />
        <Todo text="Download Vinland Saga" />
      </Box>
    </Paper>
  );
};

export default TodosWrapper;
