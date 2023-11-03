import {
  ArchiveOutlined,
  DeleteOutlined,
  GroupsOutlined,
  HomeOutlined,
  ModeNightOutlined,
  SettingsOutlined,
  WbSunnyOutlined,
} from "@mui/icons-material";
import { Box, List, ListItemButton, ListItemIcon, Switch } from "@mui/material";
import { useState } from "react";
import SidebarItems from "./SidebarItems";

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

  return (
    <Box sx={{ width: "100%", maxWidth: 300, bgcolor: "background.paper" }}>
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
          <Switch />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default Sidebar;
