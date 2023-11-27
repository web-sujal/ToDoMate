import {
  Box,
  Button,
  Modal,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Delete, Edit, Verified } from "@mui/icons-material";
import { Dispatch, SetStateAction } from "react";
import Tag from "./Tag";

// firebase
import { auth, db } from "../config/firebase";
import { doc, deleteDoc } from "firebase/firestore";

type TodoDetailsProps = {
  isTodoDetailsOpen: boolean;
  setIsTodoDetailsOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  description: string;
  tags: string[];
  isCompleted?: boolean;
  id: string;
};

const TodoDetails = ({
  isTodoDetailsOpen,
  setIsTodoDetailsOpen,
  title,
  description,
  tags,
  isCompleted,
  id,
}: TodoDetailsProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const user = auth.currentUser;

  // event handlers
  const handleDelete = async () => {
    try {
      if (user) {
        await deleteDoc(doc(db, "users", user.uid, "todos", id));
        setIsTodoDetailsOpen(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal
      open={isTodoDetailsOpen}
      onClose={() => setIsTodoDetailsOpen(false)}
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
          gap: 3,
        }}
      >
        {/* title & isCompleted */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontWeight: "bold", fontSize: "x-large" }}>
            {title}
          </Typography>
          {isCompleted && <Verified color="success" />}
        </Box>

        {/* description */}
        <Typography>{description}</Typography>

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
          <Button variant="outlined" color="info" startIcon={<Edit />}>
            Edit
          </Button>
          <Button
            onClick={handleDelete}
            variant="outlined"
            startIcon={<Delete />}
          >
            Delete
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default TodoDetails;
