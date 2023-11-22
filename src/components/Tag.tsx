import { Chip } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

// type TagsData = {
//   key: number;
//   label: string;
// };

type TagProps = {
  label: string;
  currentTag: string;
  tags: string[];
  // setTags: Dispatch<SetStateAction<TagsData[]>>;
};

const Tag = ({ label, currentTag, tags }: TagProps) => {
  // const handleDelete = (currentTag: TagsData) => () => {
  //   setTags(() => tags.filter((tag) => tag.key !== currentTag.key));
  // };

  return (
    <Chip
      label={label}
      variant="outlined"
      color="success"
      size="small"
      // onDelete={handleDelete(currentTag)}
    />
  );
};

export default Tag;
