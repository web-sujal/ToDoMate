import { SvgIconComponent } from "@mui/icons-material";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";

type SidebarItemsProps = {
  text: string;
  Icon: SvgIconComponent;
  selectedIndex: number;
  setSelectedIndex: Dispatch<SetStateAction<number>>;
  currentIndex: number;
};

const StyledLink = styled(Link)({
  color: "inherit",
  textDecoration: "none",
  "&:hover, &:focus, &:visited, &:link, &:active": {
    textDecoration: "none",
    border: "none",
  },
});

const SidebarItems = ({
  text,
  Icon,
  selectedIndex,
  setSelectedIndex,
  currentIndex,
}: SidebarItemsProps) => {
  return (
    <StyledLink to={text}>
      <ListItemButton
        selected={selectedIndex === currentIndex}
        onClick={() => setSelectedIndex(currentIndex)}
      >
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </StyledLink>
  );
};

export default SidebarItems;
