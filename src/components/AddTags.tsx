import {
  Modal,
  Box,
  Typography,
  Stack,
  Chip,
  Button,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Unsubscribe,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db, auth } from "../config/firebase";
import CreateTag from "./CreateTag";

type AddTodoProps = {
  isAddTagsOpen: boolean;
  setIsAddTagsOpen: Dispatch<SetStateAction<boolean>>;
};

type Tags = {
  name?: string;
  id: string;
};

const AddTags = ({ isAddTagsOpen, setIsAddTagsOpen }: AddTodoProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isCreateTagOpen, setIsCreateTagOpen] = useState(false);
  const [tags, setTags] = useState<Tags[]>([]);

  //firebase
  const user = auth.currentUser;

  // adding tag to tags subcollection
  useEffect(() => {
    const fetchTags = async () => {
      if (user) {
        const tagsCollection = collection(db, "users", user.uid, "tags");
        const q = query(tagsCollection, orderBy("name"));

        const tagsData = await getDocs(q);
        const tagsArray = tagsData.docs.map((tag) => ({
          ...tag.data(),
          id: tag.id,
        }));
        setTags(tagsArray);
      }
    };

    fetchTags();
  }, []);

  // subscribing to firestore
  useEffect(() => {
    let unsubscribe: Unsubscribe;

    if (user) {
      const tagsCollection = collection(db, "users", user.uid, "tags");
      const q = query(tagsCollection, orderBy("name"));
      unsubscribe = onSnapshot(q, (querySnapshot) => {
        const tagsArray = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setTags(tagsArray);
      });
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

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
          // height: 200,
          bgcolor: "white",
          borderTop: "5px solid",
          borderTopColor: "secondary.contrastText",
          boxShadow: 24,
          p: 4,
        }}
      >
        {/* heading : TAGS */}
        <Typography
          variant="h6"
          component="h2"
          color="primary"
          sx={{ mb: 3, fontSize: "24px", fontWeight: "bold" }}
        >
          Tags
        </Typography>
        <Divider />

        {/* tags */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="start"
          flexWrap="wrap"
          gap={1}
          mt={2}
          mb={4}
        >
          {tags.map((tag) => (
            <Chip
              key={tag.id}
              label={tag.name}
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
          <Button
            onClick={() => setIsCreateTagOpen(true)}
            size="small"
            variant="outlined"
            color="info"
          >
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
            <Button size="small" variant="outlined" color="success">
              Save
            </Button>
          </Stack>

          {/* CreateTag Modal */}
          <CreateTag
            isCreateTagOpen={isCreateTagOpen}
            setIsCreateTagOpen={setIsCreateTagOpen}
          />
        </Stack>
      </Box>
    </Modal>
  );
};

export default AddTags;
