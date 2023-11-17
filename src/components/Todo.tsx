import { DragIndicator } from "@mui/icons-material";
import { Box, Checkbox, Divider, Typography } from "@mui/material";
import { useState } from "react";

type TodoProps = {
  text: string;
};

const Todo = ({ text }: TodoProps) => {
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
        }}
      >
        <Checkbox
          checked={checked}
          onClick={() => setChecked(!checked)}
          color="secondary"
        />
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
