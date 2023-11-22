import { DragIndicator } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Tag from "./Tag";

type TodoProps = {
  text: string;
  completed?: boolean;
  tags: string[];
};

const Todo = ({ text, completed, tags }: TodoProps) => {
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
          color="primary"
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
            <Stack direction="row" gap={1}>
              {tags &&
                tags.map((tag, index) => (
                  <Tag key={index} label={tag} currentTag={tag} tags={tags} />
                ))}
            </Stack>
          }
        />
      </ListItem>
      <Divider />
    </Box>
  );
};

export default Todo;
