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
};

type TagsData = {
  key: number;
  label: string;
};

const Todo = ({ text, completed }: TodoProps) => {
  const [checked, setChecked] = useState(completed || false);
  const todo = text.length <= 24 ? text : text.substring(0, 24) + "...";
  const [tags, setTags] = useState<TagsData[]>([
    { key: 0, label: "anime" },
    { key: 1, label: "suspense" },
    { key: 2, label: "horror" },
    { key: 3, label: "drama" },
  ]);

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
            <Stack direction="row" gap={1}>
              {tags.map((tag) => (
                <Tag
                  key={tag.key}
                  label={tag.label}
                  currentTag={tag}
                  tags={tags}
                  setTags={setTags}
                />
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
