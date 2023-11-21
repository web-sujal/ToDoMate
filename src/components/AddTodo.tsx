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
import { Dispatch, SetStateAction } from "react";

type AddTodoProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const AddTodo = ({ open, setOpen }: AddTodoProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Modal
      open={open}
      // open={true}
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
        <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 2 }}>
          <Typography>Tags:</Typography>
          <Chip
            label="latreen"
            variant="outlined"
            color="success"
            size="small"
            onDelete={() => console.info("just clicked from addtodo")}
          />
          <Chip
            label="tatti"
            variant="outlined"
            color="success"
            size="small"
            onDelete={() => console.info("just clicked from addtodo")}
          />
          <Chip
            label="pesaap"
            variant="outlined"
            color="success"
            size="small"
            onDelete={() => console.info("just clicked from addtodo")}
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
