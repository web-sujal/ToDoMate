import {
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
  List,
  ListItemButton,
  ListItemIcon,
  Switch,
  Typography,
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
      sx={{
        width: "100%",
        maxWidth: 300,
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
          // onComplete={handleLoopAnimation}
          lottieRef={animationRef}
          onClick={handleClick}
          style={{ cursor: "pointer" }}
        />
        <Typography
          variant="h6"
          sx={{
            fontFamily: "Raleway, sans-serif",
            marginLeft: 1,
            fontSize: "25px",
          }}
        >
          ToDoMate
        </Typography>
      </Box>

      <Divider />

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
    </Box>
  );
};

export default Sidebar;
