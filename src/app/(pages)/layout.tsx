"use client";

import Header from "@/components/header/header";
import Sidebar from "@/components/Sidebar/Sidebar";
import { Box, useMediaQuery, useTheme } from "@mui/material";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ display: "flex", height: isMobile ? "100vh":"97vh", overflow: "hidden" ,m:isMobile ? 0 : 1}}>
      <Sidebar />
      <Box
        sx={{ width: "100%", ml: isMobile ? 0 : 1, display: "flex", flexDirection: "column" }}
      >
        <Header />
        <Box
          sx={{
            backgroundColor: isMobile? "#FFF":"#EFFFD2",
            mt: isMobile ? 8 : 1,
            borderRadius: isMobile ? 0 : 2,
            flexGrow: 1,
            mb: isMobile ? 6 : 0,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
