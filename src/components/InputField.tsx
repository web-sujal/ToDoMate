import { styled, Input, InputAdornment } from "@mui/material";

type InputboxProps = {
  placeholder: string;
  type: string;
  ariaLabel: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
  handleClick: () => void;
  isMobile: boolean;
  onBlur?: () => void;
  Icon?: any;
};

const StyledInput = styled(Input)({
  backgroundColor: "white",
  borderRadius: "5px",
  padding: "2px 5px",
  color: "black",
  width: "40%",
  minWidth: "30%",
});

const InputField = ({
  placeholder,
  type,
  ariaLabel,
  name,
  onChange,
  onKeyDown,
  handleClick,
  isMobile,
  onBlur,
  Icon,
}: InputboxProps) => {
  return (
    <StyledInput
      autoFocus={true}
      type={type}
      placeholder={placeholder}
      aria-label={ariaLabel}
      name={name}
      onChange={onChange}
      onKeyDown={onKeyDown}
      sx={{ display: isMobile ? "" : "none" }}
      onBlur={onBlur}
      endAdornment={
        <InputAdornment position="end">
          <Icon
            onClick={handleClick}
            aria-label="Search tasks"
            sx={{
              cursor: "pointer",
              "&:hover": {
                transform: "translateY(-3px) scale(1.05)",
                transition: "transform 0.3s",
              },
            }}
          />
        </InputAdornment>
      }
    />
  );
};

export default InputField;
