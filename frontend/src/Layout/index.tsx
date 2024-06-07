import { ReactNode } from "react";
import { Box } from "@mui/material";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: {
          xs: "column",
          lg: "row",
        },
        color: "white",
        padding: 3,
        gap: 3,
        overflowY: "hidden",
        height: "100vh",
      }}
    >
      <Box sx={{ width: "80%", margin: "0 auto" }}>{children}</Box>
    </Box>
  );
};

export default Layout;
