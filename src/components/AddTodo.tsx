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
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import AddTags from "./AddTags";
import { db, auth } from "../config/firebase";
import {
  DocumentData,
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
} from "firebase/firestore";

type AddTodoProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const AddTodo = ({ open, setOpen }: AddTodoProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // states
  const [isAddTagsOpen, setIsAddTagsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<DocumentData>([]);
  const [initialTags, setInitialTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showError, setShowError] = useState(false);

  // firebase
  const user = auth.currentUser;

  useEffect(() => {
    const fetchTags = async () => {
      let fetchedTags: DocumentData = [];

      if (user) {
        try {
          for (const tagId of initialTags) {
            const docRef = doc(db, "users", user.uid, "tags", tagId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              fetchedTags.push(docSnap.data());
            }
          }
          setTags(fetchedTags);
        } catch (err) {
          console.error(err);
        }
      }
    };

    fetchTags();
  }, [initialTags]);

  // event handlers
  const handleClick = async () => {
    if (title.length === 0) {
      return setShowError(true);
    }

    if (user) {
      try {
        const todosRef = collection(db, "users", user.uid, "todos");
        await addDoc(todosRef, {
          title,
          description,
          tags: initialTags,
          isCompleted: false,
          createdAt: Timestamp.now(),
        });

        setTitle("");
        setDescription("");
        setTags([]);
        setInitialTags([]);
        setSelectedTags([]);
        setIsAddTagsOpen(false);
        console.log("updated one record!");
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setTags([]);
    setInitialTags([]);
    setSelectedTags([]);
    setIsAddTagsOpen(false);
    setOpen(false);
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

        {/* title */}
        <Typography sx={{ mb: 1 }}>Title</Typography>
        <Input
          onChange={(e) => {
            setTitle(e.target.value);
            setShowError(false);
          }}
          value={title}
          sx={{
            mb: showError ? 0 : 2,
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
        {showError && (
          <Typography color={"error"} fontSize={"small"}>
            *Title cannot be blank
          </Typography>
        )}

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
            flexWrap="wrap"
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
                {tags.map((tag: DocumentData) => (
                  <Chip
                    key={tag.name}
                    label={tag.name}
                    variant="outlined"
                    color="success"
                    size="small"
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
            setInitialTags={setInitialTags}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
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
          <Button onClick={handleClick}>Add</Button>
          <Button
            onClick={handleCancel}
            sx={{ maxWidth: "100px", color: "error" }}
          >
            Cancel
          </Button>
        </ButtonGroup>
      </Box>
    </Modal>
  );
};

export default AddTodo;
