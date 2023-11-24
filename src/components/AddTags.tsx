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
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../config/firebase";
import CreateTag from "./CreateTag";

type AddTodoProps = {
  isAddTagsOpen: boolean;
  setIsAddTagsOpen: Dispatch<SetStateAction<boolean>>;
};

const tags: string[] = [
  "anime",
  "shounen",
  "thrill",
  "anime",
  "shounen",
  "thrill",
  "anime",
  "shounen",
  "thrill",
];

const AddTags = ({ isAddTagsOpen, setIsAddTagsOpen }: AddTodoProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isCreateTagOpen, setIsCreateTagOpen] = useState(false);

  //firebase
  const user = auth.currentUser;
  const todosRef = collection(db, "todos");

  console.log("user: ", user);
  console.log("user uid: ", user?.uid);

  // useEffect(() => {
  //   const querySnapshot = async () => {
  //     (await getDocs(todosRef)).forEach((doc) => {
  //       console.log(doc.id, " => ", doc.data());
  //     });
  //   };

  //   querySnapshot();
  // }, []);

  // useEffect(() => {
  //   const fetchTodos = async () => {};
  // }, []);

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
        {/* heading */}
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
          {tags.map((tag, index) => (
            <Chip
              key={index}
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
