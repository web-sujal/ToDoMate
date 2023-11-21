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
import { Dispatch, SetStateAction, useState } from "react";
import AddTags from "./AddTags";

type AddTodoProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const tags: string[] = ["anime", "shounen", "thrill"];

const AddTodo = ({ open, setOpen }: AddTodoProps) => {
  const [isAddTagsOpen, setIsAddTagsOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
          sx={{
            mb: 2,
            border: "1px solid",
            borderColor: "primary.main",
            borderRadius: 1,
            px: 1,
          }}
          disableUnderline
          placeholder="enter title..."
          fullWidth
          required
          name="todo"
        />

        {/* description */}
        <Typography sx={{ mb: 1 }}>Description</Typography>
        <Input
          sx={{
            mb: 2,
            border: "1px solid",
            borderColor: "primary.main",
            borderRadius: 1,
            px: 1,
            py: 0.5,
          }}
          disableUnderline
          multiline
          rows={3}
          placeholder="enter description..."
          fullWidth
          required
          name="todo"
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
              color: "primary.main",
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

        <ButtonGroup
          variant="outlined"
          color="secondary"
          aria-label="add todo button"
          fullWidth
          sx={{ mb: 2 }}
        >
          <Button>Add</Button>
          <Button
            onClick={() => setOpen(false)}
            sx={{ maxWidth: "100px", color: "red" }}
          >
            Cancel
          </Button>
        </ButtonGroup>
      </Box>
    </Modal>
  );
};

export default AddTodo;
