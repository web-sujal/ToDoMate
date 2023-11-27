import { Box, Button, Chip, List, Paper, Typography } from "@mui/material";
import Todo from "./Todo";
import AddTodo from "./AddTodo";
import { useState } from "react";
import { TodoType } from "../types";

type TodosProps = {
  heading: string;
  pendingTodos?: Array<TodoType>;
  completedTodos?: Array<TodoType>;
  total: number;
};

const Todos = ({
  heading,
  pendingTodos,
  completedTodos,
  total,
}: TodosProps) => {
  const [open, setOpen] = useState(false);

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
        <Typography>
          <Chip
            label={total}
            color={heading && heading === "Completed" ? "success" : "primary"}
            variant="outlined"
          />
        </Typography>
      </Box>

      {/* add button */}
      {heading === "Completed" ? null : (
        <Button
          onClick={() => setOpen(true)}
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
      )}

      {/* Add todo modal */}
      <AddTodo open={open} setOpen={setOpen} />

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
          pendingTodos.map((todo) => (
            <Todo
              title={todo.title}
              key={todo.id}
              id={todo.id}
              tags={todo.tags}
            />
          ))}
        {completedTodos &&
          completedTodos.map((todo) => (
            <Todo
              title={todo.title}
              key={todo.id}
              id={todo.id}
              completed={todo.isCompleted}
              tags={todo.tags}
            />
          ))}
      </List>
    </Paper>
  );
};

export default Todos;
