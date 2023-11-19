import { DragIndicator } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useState } from "react";

type TodoProps = {
  text: string;
  completed?: boolean;
};

const Todo = ({ text, completed }: TodoProps) => {
  const [checked, setChecked] = useState(completed || false);
  const todo = text.length <= 24 ? text : text.substring(0, 24) + "...";

  return (
    <Box>
      <ListItem
        sx={{ mb: 0.5 }}
        secondaryAction={
          <IconButton edge="end" aria-label="drag-indicator">
            <DragIndicator />
          </IconButton>
        }
        disablePadding
      >
        <Checkbox
          edge="start"
          checked={checked}
          color="secondary"
          onClick={() => setChecked(!checked)}
        />

        <ListItemText
          primary={
            <Typography
              sx={{
                textDecoration: checked ? "line-through" : "none",
                transform: "translateY(4px)",
                fontSize: "large",
              }}
            >
              {todo}
            </Typography>
          }
          secondary={
            <Typography sx={{ textDecoration: "none", fontSize: "small" }}>
              anime | drama | mystery
            </Typography>
          }
        />
      </ListItem>
      <Divider />
    </Box>
  );
};

export default Todo;
