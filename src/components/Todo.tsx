import { DragIndicator } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";

type TodoProps = {
  text: string;
};

const Todo = ({ text }: TodoProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [checked, setChecked] = useState(false);

  const todo = text.length <= 24 ? text : text.substring(0, 24) + "...";

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          gap: 1,
          cursor: "pointer",
          // width: "100%",
        }}
      >
        <Checkbox
          checked={checked}
          onClick={() => setChecked(!checked)}
          color="secondary"
        />
        {/* sx={{ width: isMobile ? "60vw" : "30vw" }} */}
        <Typography
          noWrap={true}
          sx={{
            textDecoration: checked ? "line-through" : "none",
          }}
        >
          {todo}
        </Typography>
        <DragIndicator sx={{ ml: "auto" }} />
      </Box>
      <Divider />
    </Box>
  );
};

export default Todo;
