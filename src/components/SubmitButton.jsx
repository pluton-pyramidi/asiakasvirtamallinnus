import { Button } from "@mui/material";

export const SubmitButton = ({ onClick, isModified, label = "Submit", ...props }) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        backgroundColor: isModified ? "orange" : "gray",
        color: "white",
        "&:hover": {
          backgroundColor: isModified ? "#cc7a00" : "#555",
        },
      }}
      {...props}
    >
      {label}
    </Button>
  );
};
