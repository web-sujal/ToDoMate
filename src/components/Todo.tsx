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
import { db, auth } from "../config/firebase";
import { FieldValue, doc, getDoc, updateDoc } from "firebase/firestore";

type TodoProps = {
  title: string;
  completed?: boolean;
  tags: string[];
  id: string;
};

const Todo = ({ title, completed, tags, id }: TodoProps) => {
  const [checked, setChecked] = useState(completed || false);
  const todo =
    title && title.length <= 24
      ? title
      : title && title.substring(0, 24) + "...";

  // firebase
  const user = auth.currentUser;

  // event handlers
  const handleUpdate = async () => {
    if (user) {
      setChecked(!checked);

      const todoRef = doc(db, "users", user.uid, "todos", id);
      const todoSnapshot = await getDoc(todoRef);

      if (todoSnapshot.exists()) {
        const currentStatus = todoSnapshot.data().isCompleted;
        await updateDoc(todoRef, {
          isCompleted: !currentStatus,
        });
      }
    }
  };

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
          onClick={handleUpdate}
        />

        <ListItemText
          primary={
            <Typography
              sx={{
                textDecoration: checked ? "line-through" : "none",
                transform: "translateY(4px)",
                fontSize: "large",
                cursor: "pointer",
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
