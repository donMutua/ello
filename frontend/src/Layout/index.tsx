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
        width: "100%",
        margin: "20px",
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
      <Box
        className="test"
        sx={{ width: "100%", margin: "0 auto", overflowY: "scroll" }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
