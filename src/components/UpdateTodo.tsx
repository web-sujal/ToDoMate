import {
  Box,
  Button,
  Input,
  Modal,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Cancel, Edit } from "@mui/icons-material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Tag from "./Tag";

// firebase
import { auth, db } from "../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

type UpdateTodoProps = {
  isUpdateTodoOpen: boolean;
  setIsUpdateTodoOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  description: string;
  tags: string[];
  id: string;
};

const UpdateTodo = ({
  isUpdateTodoOpen,
  setIsUpdateTodoOpen,
  title,
  description,
  tags,
  id,
}: UpdateTodoProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const user = auth.currentUser;

  // states
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    setNewTitle(title);
    setNewDescription(newDescription);
  }, []);

  // event handlers
  const handleUpdate = async () => {
    if (newTitle === "") {
      return setShowError(true);
    }

    try {
      if (user) {
        const todoRef = doc(db, "users", user.uid, "todos", id);
        const todoSnapshot = await getDoc(todoRef);

        if (todoSnapshot.exists()) {
          await updateDoc(todoRef, {
            title: newTitle === "" ? title : newTitle,
            description: newDescription === "" ? description : newDescription,
          });
        }
      }
    } catch (err) {
      console.error(err);
    }

    setIsUpdateTodoOpen(false);
  };

  return (
    <Modal
      open={isUpdateTodoOpen}
      onClose={() => setIsUpdateTodoOpen(false)}
      aria-labelledby="todo-details-modal"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: isMobile ? "95vw" : 600,
          bgcolor: "white",
          borderTop: "5px solid",
          borderTopColor: "primary.main",
          boxShadow: 24,
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        {/* new title & isCompleted */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontWeight: "bold", fontSize: "large" }}>
            Title
          </Typography>
        </Box>
        <Input
          onChange={(e) => {
            setNewTitle(e.target.value);
            setShowError(false);
          }}
          defaultValue={title}
          sx={{
            mb: showError ? 0 : 2,
            border: "1px solid",
            borderColor: "secondary.contrastText",
            borderRadius: 1,
            px: 1,
          }}
          disableUnderline
          placeholder="enter new title..."
          fullWidth
          required
          name="new-todo-title"
        />
        {showError && (
          <Typography sx={{ fontSize: "small", color: "red" }}>
            *Title cannot be empty
          </Typography>
        )}

        {/* new description */}
        <Typography sx={{ fontWeight: "bold" }}>Description</Typography>
        <Input
          onChange={(e) => setNewDescription(e.target.value)}
          defaultValue={description}
          sx={{
            mb: 2,
            border: "1px solid",
            borderColor: "secondary.contrastText",
            borderRadius: 1,
            px: 1,
            py: 0.5,
          }}
          disableUnderline
          multiline
          rows={3}
          placeholder="enter new description..."
          fullWidth
          name="new-todo-description"
        />

        {/* Tags */}
        <Stack direction="row" alignItems="center" gap={1}>
          {tags && tags.map((tag, index) => <Tag key={index} label={tag} />)}
        </Stack>

        {/* buttons */}
        <Stack
          direction="row"
          justifyContent="end"
          gap={1}
          sx={{ width: "100%" }}
        >
          <Button
            onClick={handleUpdate}
            variant="outlined"
            color="info"
            startIcon={<Edit />}
          >
            Save
          </Button>
          <Button
            onClick={() => setIsUpdateTodoOpen(false)}
            variant="outlined"
            color="warning"
            startIcon={<Cancel />}
          >
            Cancel
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default UpdateTodo;
