import { Box } from "@mui/material";

const FlexRowAlign = ({ children, ...props }): JSX.Element => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" {...props}>
      {children}
    </Box>
  );
};

export default FlexRowAlign;
