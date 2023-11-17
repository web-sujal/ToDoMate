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
    outline: "none",
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
    <StyledLink to={text.toLowerCase()}>
      <ListItemButton
        selected={selectedIndex === currentIndex}
        onClick={() => setSelectedIndex(currentIndex)}
        sx={{
          "&.Mui-selected": {
            borderRight: "4px solid #283618",
          },
        }}
        // tabIndex={currentIndex}
      >
        <ListItemIcon>
          <Icon sx={{ color: "primary.light" }} />
        </ListItemIcon>
        <ListItemText
          primary={text}
          primaryTypographyProps={{ fontSize: "20px" }}
        />
      </ListItemButton>
    </StyledLink>
  );
};

export default SidebarItems;
