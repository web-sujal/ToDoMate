import {
  Add,
  ArchiveOutlined,
  DeleteOutlined,
  GroupsOutlined,
  HomeOutlined,
  ModeNightOutlined,
  SettingsOutlined,
  WbSunnyOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Fab,
  List,
  ListItemButton,
  ListItemIcon,
  Switch,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import SidebarItems from "./SidebarItems";
import animationData from "../assets/checklist.json";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import AddTodo from "./AddTodo";

const icons = [
  HomeOutlined,
  WbSunnyOutlined,
  ArchiveOutlined,
  DeleteOutlined,
  SettingsOutlined,
  GroupsOutlined,
];

const listItemText = [
  "Overview",
  "Today",
  "Archieve",
  "Trash",
  "Settings",
  "About",
];

const Sidebar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const animationRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      animationRef.current?.goToAndPlay(0);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    animationRef.current?.goToAndPlay(0);
  };

  return (
    <Box
      position="sticky"
      sx={{
        width: "100%",
        height: "100%",
        mr: 3,
        maxWidth: 280,
        bgcolor: "background.default",
        minHeight: "100vh",
      }}
    >
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"flex-start"}
        ml={2}
        mb={1}
      >
        <Lottie
          animationData={animationData}
          loop={false}
          autoplay={true}
          lottieRef={animationRef}
          onClick={handleClick}
          style={{ cursor: "pointer" }}
        />
        <Typography
          variant="h6"
          sx={{
            fontFamily: "Raleway, sans-serif",
            marginLeft: 1,
            fontWeight: "800",
            fontSize: "30px",
            pt: 1,
            color: "#121212",
          }}
        >
          ToDoMate
        </Typography>
      </Box>

      <Divider variant="middle" />

      <List component="nav" aria-label="sidebar items">
        {listItemText.map((text, index) => (
          <SidebarItems
            key={index}
            text={text}
            Icon={icons[index]}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            currentIndex={index}
          />
        ))}

        <ListItemButton>
          <ListItemIcon>
            <ModeNightOutlined />
          </ListItemIcon>
          <Switch color="primary" />
        </ListItemButton>
      </List>
      <Fab
        onClick={() => setOpen(true)}
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: "40px",
          left: "80px",
          transform: "translateX(-50%)",
          display: isMobile ? "none" : "",
          "&:hover": {
            bgcolor: "primary.light",
          },
        }}
      >
        <Add />
      </Fab>
      <AddTodo open={open} setOpen={setOpen} />
    </Box>
  );
};

export default Sidebar;
