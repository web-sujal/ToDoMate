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
  const [selectedIndex, setSelectedIndex] = useState(0);
  const animationRef = useRef<LottieRefCurrentProps>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
            color: "#283618",
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
        color="secondary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: "40px",
          left: "80px",
          transform: "translateX(-50%)",
          display: isMobile ? "none" : "",
          "&:hover": {
            bgcolor: "secondary.light",
          },
        }}
      >
        <Add />
      </Fab>
    </Box>
  );
};

export default Sidebar;
