import { AddCircle } from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonGroup,
  Chip,
  Input,
  Modal,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import AddTags from "./AddTags";
import { db } from "../config/firebase";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useForm, SubmitHandler } from "react-hook-form";

type AddTodoProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const AddTodo = ({ open, setOpen }: AddTodoProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { register, handleSubmit } = useForm();

  // states
  const [isAddTagsOpen, setIsAddTagsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  // event handlers
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "todos"), {
        title,
        description,
        tags,
        isCompleted: false,
        createdAt: Timestamp.now(),
      });

      setTitle("");
      setDescription("");
      setTags([]);
      console.log("updated one record!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="add-todo-modal"
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
        }}
      >
        {/* add todo */}
        <Typography
          variant="h6"
          component="h2"
          color="primary"
          sx={{ mb: 2, fontSize: "24px", fontWeight: "bold" }}
        >
          Add Todo
        </Typography>

        <form action="#" onSubmit={handleSubmit(onSubmit)}>
          {/* title */}
          <Typography sx={{ mb: 1 }}>Title</Typography>
          <Input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            sx={{
              mb: 2,
              border: "1px solid",
              borderColor: "secondary.contrastText",
              borderRadius: 1,
              px: 1,
            }}
            disableUnderline
            placeholder="enter title..."
            fullWidth
            required
            name="todo-title"
          />

          {/* description */}
          <Typography sx={{ mb: 1 }}>Description</Typography>
          <Input
            onChange={(e) => setDescription(e.target.value)}
            value={description}
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
            placeholder="enter description..."
            fullWidth
            name="todo-description"
          />

          {/* Tags */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            gap={1}
            sx={{ mb: 2 }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              gap={1}
            >
              <Typography>Tags:</Typography>
              {tags.length ? (
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  gap={1}
                >
                  {tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      variant="outlined"
                      color="success"
                      size="small"
                      onDelete={() =>
                        console.info("just clicked from addtodo modal tags")
                      }
                    />
                  ))}
                </Stack>
              ) : (
                <Typography sx={{ color: "rgba(0,0,0,0.8)" }}>
                  (No Tags Selected)
                </Typography>
              )}
            </Stack>

            <AddCircle
              onClick={() => setIsAddTagsOpen(true)}
              sx={{
                cursor: "pointer",
                color: "secondary.contrastText",
                "&:hover": {
                  transform: "translateY(-3px) scale(1.05)",
                  transition: "transform 0.3s",
                },
              }}
            />

            {/* tags modal */}
            <AddTags
              isAddTagsOpen={isAddTagsOpen}
              setIsAddTagsOpen={setIsAddTagsOpen}
            />
          </Stack>

          {/* buttons */}
          <ButtonGroup
            variant="outlined"
            color="primary"
            aria-label="add todo button"
            fullWidth
            sx={{ mb: 2 }}
          >
            <Button type="submit">Add</Button>
            <Button
              onClick={() => setOpen(false)}
              sx={{ maxWidth: "100px", color: "error" }}
            >
              Cancel
            </Button>
          </ButtonGroup>
        </form>
      </Box>
    </Modal>
  );
};

export default AddTodo;
