import { Chip } from "@mui/material";

type TagProps = {
  label: string;
  currentTag: string;
  tags: string[];
};

const Tag = ({ label }: TagProps) => {
  return <Chip label={label} variant="outlined" color="success" size="small" />;
};

export default Tag;
