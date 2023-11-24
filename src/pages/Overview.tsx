import { Box, useMediaQuery, useTheme } from "@mui/material";
import Todos from "../components/Todos";
import { todos } from "../mockData/todos";

const Overview = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const pendingTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "start",
        justifyContent: isMobile ? "flex-start" : "space-around",
        p: isMobile ? 0 : 2,
        pt: 2,
        gap: 2,
        width: "100%",
      }}
    >
      <Todos
        heading="Pending"
        pendingTodos={pendingTodos}
        total={pendingTodos.length}
      />
      <Todos
        heading="Completed"
        completedTodos={completedTodos}
        total={completedTodos.length}
      />
    </Box>
  );
};

export default Overview;

// https://firebase.google.com/docs/firestore/query-data/get-data#get_multiple_documents_from_a_collection

// https://stackoverflow.com/questions/72082115/how-do-i-get-the-document-id-of-a-specific-document-in-firebase-on-react-native
