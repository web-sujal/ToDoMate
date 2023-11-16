import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Drawer,
  ListItemIcon,
  Menu,
  MenuItem,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import {
  Logout,
  Mail,
  Notifications,
  Search,
  Menu as MenuIcon,
} from "@mui/icons-material";
import InputField from "./InputField";
import Sidebar from "./Sidebar";

const StyledBadge = styled(Badge)({
  "&:hover": {
    transform: "translateY(-3px) scale(1.05)",
    transition: "transform 0.3s",
  },
});

const Navbar = () => {
  const [searchedTask, setSearchedTask] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClick = () => {
    console.log("searched task: ", searchedTask);
  };

  return (
    <Box sx={{ width: "full" }}>
      <AppBar position="sticky" sx={{ p: 0.5 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 1,
            paddingX: 2,
          }}
        >
          {/* Left Side */}
          {isMobile ? (
            <MenuIcon
              aria-label="Sidebar Menu"
              onClick={() => setIsSidebarOpen(true)}
              sx={{
                mr: 4,
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-3px) scale(1.05)",
                  transition: "transform 0.3s",
                },
              }}
            />
          ) : (
            <InputField
              placeholder="search tasks..."
              type="search"
              ariaLabel="search tasks"
              name="searchedTask"
              onChange={(e) => setSearchedTask(e.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") handleClick();
              }}
              handleClick={handleClick}
              isMobile={false}
              Icon={Search}
            />
          )}

          {/* Drawer */}
          <Drawer
            variant="temporary"
            open={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            // onClick={() => setIsSidebarOpen(false)}
            sx={{ display: { xs: "block", sm: "none" }, mr: 3 }}
          >
            <Sidebar />
          </Drawer>

          {/* Right Side */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: isMobile ? "auto" : "100%",
              justifyContent: "space-between",
              gap: 3,
              cursor: "pointer",
            }}
          >
            {isMobile && !isSearchOpen ? (
              <Search onClick={() => setIsSearchOpen(true)} />
            ) : (
              <InputField
                placeholder="search tasks..."
                type="search"
                ariaLabel="search tasks"
                name="searchedTask"
                onChange={(e) => setSearchedTask(e.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") handleClick();
                }}
                handleClick={handleClick}
                isMobile={true}
                onBlur={() => setIsSearchOpen(false)}
                Icon={Search}
              />
            )}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 3,
              }}
            >
              <StyledBadge badgeContent={2} color="secondary">
                <Notifications sx={{ color: "white" }} />
              </StyledBadge>
              <StyledBadge badgeContent={4} color="secondary">
                <Mail sx={{ color: "white" }} />
              </StyledBadge>
              <Avatar
                alt="Sujal Rajput"
                onClick={() => setIsMenuOpen(true)}
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  "&:hover": {
                    transform: "translateY(-3px) scale(1.05)",
                    transition: "transform 0.3s",
                  },
                }}
              >
                S
              </Avatar>

              {/* menu */}
              <Menu
                open={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem onClick={() => setIsMenuOpen(false)} sx={{ gap: 2 }}>
                  <Avatar />
                  Profile
                </MenuItem>
                <MenuItem onClick={() => setIsMenuOpen(false)} sx={{ gap: 2 }}>
                  <ListItemIcon>
                    <Logout sx={{ ml: 1 }} fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Box>
      </AppBar>
    </Box>
  );
};

export default Navbar;
