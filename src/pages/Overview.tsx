import { Box, useMediaQuery, useTheme } from "@mui/material";
import Todos from "../components/Todos";
// import { todos } from "../mockData/todos";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  DocumentData,
  onSnapshot,
  Unsubscribe,
  query,
  orderBy,
} from "firebase/firestore";
import { db, auth } from "../config/firebase";
import { TodoType } from "../types";

const Overview = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [todos, setTodos] = useState<DocumentData | TodoType[]>();

  const pendingTodos = todos?.filter((todo: TodoType) => !todo.isCompleted);
  const completedTodos = todos?.filter((todo: TodoType) => todo.isCompleted);

  // firebase
  const user = auth.currentUser;

  // fetching all todos
  useEffect(() => {
    const fetchAllTodos = async () => {
      if (user) {
        const todosRef = collection(db, "users", user.uid, "todos");
        const todosSnapshot = await getDocs(todosRef);
        const todosData = todosSnapshot.docs;

        const todosArray: DocumentData = [];
        for (const element of todosData) {
          let todo = element.data();
          const tagIds = todo.tags;

          const tagNames = [];
          for (const tagId of tagIds) {
            const tagRef = doc(db, "users", user.uid, "tags", tagId);
            const tagSnapshot = await getDoc(tagRef);
            const tag = tagSnapshot.data();
            const tagName = tag && tag.name;
            tagNames.push(tagName);
          }

          todo = { ...todo, tags: tagNames };
          todosArray.push(todo);
        }
        setTodos(todosArray);
      }
    };

    fetchAllTodos();
  }, []);

  // subscribing to firestore
  useEffect(() => {
    let unsubscribe: Unsubscribe;

    if (user) {
      const todosRef = collection(db, "users", user.uid, "todos");
      const q = query(todosRef, orderBy("createdAt"));
      unsubscribe = onSnapshot(q, async (querySnapshot) => {
        const todosData = querySnapshot.docs;

        const todosArray: DocumentData = [];
        for (const element of todosData) {
          let todo = element.data();
          const tagIds = todo.tags;

          const tagNames = [];
          for (const tagId of tagIds) {
            const tagRef = doc(db, "users", user.uid, "tags", tagId);
            const tagSnapshot = await getDoc(tagRef);
            const tag = tagSnapshot.data();
            const tagName = tag && tag.name;
            tagNames.push(tagName);
          }

          todo = { ...todo, tags: tagNames };
          todosArray.push(todo);
        }

        setTodos(todosArray);
      });
    }
    return () => unsubscribe();
  }, []);

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
        total={pendingTodos && pendingTodos.length}
      />
      <Todos
        heading="Completed"
        completedTodos={completedTodos}
        total={completedTodos && completedTodos.length}
      />
    </Box>
  );
};

export default Overview;
