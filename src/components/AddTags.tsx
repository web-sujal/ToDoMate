import {
  Modal,
  Box,
  Typography,
  Stack,
  Chip,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";

type AddTodoProps = {
  isAddTagsOpen: boolean;
  setIsAddTagsOpen: Dispatch<SetStateAction<boolean>>;
};

const tags: string[] = ["anime", "shounen", "thrill"];

const AddTags = ({ isAddTagsOpen, setIsAddTagsOpen }: AddTodoProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Modal
      open={isAddTagsOpen}
      onClose={() => setIsAddTagsOpen(false)}
      aria-labelledby="add-todo-modal"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: isMobile ? "90vw" : 580,
          height: 200,
          bgcolor: "white",
          borderTop: "5px solid",
          borderTopColor: "secondary.main",
          boxShadow: 24,

          p: 4,
        }}
      >
        {/* heading */}
        <Typography
          variant="h6"
          component="h2"
          color="primary"
          sx={{ mb: 2, fontSize: "24px", fontWeight: "bold" }}
        >
          Tags
        </Typography>

        {/* tags */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="start"
          gap={1}
          mb={2}
        >
          {tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              variant="outlined"
              color="warning"
              size="small"
              onClick={() =>
                console.info("Onclick just clicked from addtodo modal tags")
              }
            />
          ))}
        </Stack>

        {/* buttons */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap={1}
        >
          <Button size="small" variant="outlined" color="primary">
            New
          </Button>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            gap={1}
          >
            <Button
              size="small"
              variant="outlined"
              color="error"
              onClick={() => setIsAddTagsOpen(false)}
            >
              Cancel
            </Button>
            <Button size="small" variant="outlined" color="primary">
              Save
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default AddTags;
