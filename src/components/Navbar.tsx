import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Input,
  InputAdornment,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import animationData from "../assets/checklist.json";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import { Mail, Notifications, Search } from "@mui/icons-material";

const StyledInput = styled(Input)({
  backgroundColor: "white",
  borderRadius: "5px",
  padding: "2px 5px",
  color: "black",
  width: "30%",
  marginLeft: "16px",
});

const StyledLink = styled(Link)(({ theme }) => ({
  color: "inherit",
  textDecoration: "none",
  display: "block",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
  "&:hover, &:focus, &:visited, &:link, &:active": {
    textDecoration: "none",
    border: "none",
    outline: "none",
  },
}));

const Navbar = () => {
  const [searchedTask, setSearchedTask] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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
            width: "full",
            p: isMobile ? 0 : 1,
          }}
        >
          <StyledLink to="/overview">
            <Lottie
              animationData={animationData}
              loop={false}
              autoplay={true}
              style={{ cursor: "pointer" }}
            />
          </StyledLink>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              p: isMobile ? 0 : 1,
            }}
          >
            {isMobile && !isSearchOpen ? (
              <Search onClick={() => setIsSearchOpen(true)} />
            ) : (
              <StyledInput
                onKeyDown={(event) => {
                  if (event.key === "Enter") handleClick();
                }}
                autoFocus={true}
                aria-label="search tasks"
                placeholder="search tasks…"
                name="searchedTask"
                endAdornment={
                  <InputAdornment position="end">
                    <Search
                      aria-label="Search tasks"
                      sx={{
                        cursor: "pointer",
                        "&:hover": {
                          transform: "translateY(-3px) scale(1.1)",
                          transition: "transform 0.3s",
                        },
                      }}
                      onClick={() => {
                        handleClick();
                      }}
                    />
                  </InputAdornment>
                }
                onChange={(e) => setSearchedTask(e.target.value)}
                onBlur={() => setIsSearchOpen(false)}
              />
            )}

            <Badge badgeContent={2} color="secondary">
              <Notifications sx={{ color: "white" }} />
            </Badge>
            <Badge badgeContent={4} color="secondary">
              <Mail sx={{ color: "white" }} />
            </Badge>
            <Avatar
              alt="Sujal Rajput"
              sx={{ backgroundColor: "white", color: "black" }}
            >
              S
            </Avatar>
          </Box>
        </Box>
      </AppBar>
    </Box>
  );
};

export default Navbar;
