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
import { Dispatch, SetStateAction, useState } from "react";
import { auth, db } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";

type CreateTagProps = {
  isCreateTagOpen: boolean;
  setIsCreateTagOpen: Dispatch<SetStateAction<boolean>>;
};

const CreateTag = ({ isCreateTagOpen, setIsCreateTagOpen }: CreateTagProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const user = auth.currentUser;

  // states
  const [tag, setTag] = useState("");
  const [showError, setShowError] = useState(false);
  const [wordError, setWordError] = useState(false);

  // event handlers
  const handleClick = async () => {
    // tag input validation
    if (tag.trim() === "") {
      setShowError(true);
      return;
    }

    if (tag.includes(" ")) {
      setWordError(true);
      return;
    }

    // creating tag into tags subcollection
    if (user) {
      try {
        const tagsCollection = collection(db, "users", user.uid, "tags");
        const docRef = await addDoc(tagsCollection, {
          name: tag.trim().toLowerCase(),
        });

        setTag("");
        console.log("Document written with ID: ", docRef.id);
      } catch (err) {
        console.error(err);
      }
    }

    setIsCreateTagOpen(false);
  };

  return (
    <Modal
      open={isCreateTagOpen}
      // onClose={() => setCreateTagOpen(false)}
      aria-labelledby="create-tag-modal"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: isMobile ? "90vw" : 550,
          // height: 150,
          bgcolor: "white",
          borderTop: "5px solid",
          borderTopColor: "secondary.contrastText",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography
          variant="h6"
          component="h2"
          color="primary"
          sx={{ mb: 3, fontSize: "24px", fontWeight: "bold" }}
        >
          Create Tag
        </Typography>

        <Input
          onChange={(e) => {
            setTag(e.target.value);
            setShowError(false);
            setWordError(false);
          }}
          value={tag}
          sx={{
            mb: 0.5,
            border: "1px solid",
            borderColor: "secondary.contrastText",
            borderRadius: 1,
            px: 1,
          }}
          disableUnderline
          placeholder="for example: gym, school, etc..."
          fullWidth
          required
          name="create-tag"
        />
        {showError && (
          <Typography color={"error"} fontSize={"small"}>
            *Tag cannot be an empty string
          </Typography>
        )}
        {wordError && (
          <Typography color={"error"} fontSize={"small"}>
            *Tag should contain a single word
          </Typography>
        )}

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mt={2}
          gap={1}
        >
          <Button
            onClick={handleClick}
            size="small"
            variant="outlined"
            color="primary"
          >
            Create
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={() => setIsCreateTagOpen(false)}
          >
            Cancel
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default CreateTag;
