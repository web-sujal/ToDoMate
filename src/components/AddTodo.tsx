import {
  Box,
  Button,
  ButtonGroup,
  Input,
  Modal,
  Typography,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";

type AddTodoProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const AddTodo = ({ open, setOpen }: AddTodoProps) => {
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
          width: 500,
          bgcolor: "white",
          borderTop: "5px solid",
          borderTopColor: "primary.main",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography
          variant="h6"
          component="h2"
          sx={{ mb: 1, fontSize: "24px", fontWeight: "bold" }}
        >
          Add Todo...
        </Typography>
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
          placeholder="enter your todo..."
          fullWidth
          required
          name="todo"
        />
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
          placeholder="enter your todo..."
          fullWidth
          required
          name="todo"
        />
        <ButtonGroup
          variant="outlined"
          color="secondary"
          aria-label="add todo button"
          fullWidth
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
