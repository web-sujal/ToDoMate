import { Box, Button, List, Paper, Typography } from "@mui/material";
import Todo from "./Todo";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
};

type TodosProps = {
  heading: string;
  pendingTodos?: Array<Todo>;
  completedTodos?: Array<Todo>;
};

const Todos = ({ heading, pendingTodos, completedTodos }: TodosProps) => {
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
      <List
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
        {pendingTodos &&
          pendingTodos.map((todo) => <Todo text={todo.text} key={todo.id} />)}
        {completedTodos &&
          completedTodos.map((todo) => (
            <Todo text={todo.text} key={todo.id} completed={todo.completed} />
          ))}
      </List>
    </Paper>
  );
};

export default Todos;
