import { FC, useState } from "react";
import Box from "@mui/material/Box";
import { CssBaseline } from "@mui/material";
import { BuildingDrawer } from "./side-menu/building-drawer";
import { BuildingTopbar } from "./side-menu/building-topbar";
import { getDrawerHeader } from "./side-menu/mui-utils";
import { useAppContext } from "../../middleware/context-provider";
import { Navigate } from "react-router-dom";
import { BuildingFrontMenu } from "./front-menu/building-front-menu";
import Footer from "../Footer";
import { FrontMenuMode } from "./types";
import { BuildingViewport } from "./viewport/building-viewport";
import { BuildingBottomMenu } from "./bottom-menu/building-bottom-menu";

export const BuildingViewer: FC = () => {
  const [width] = useState(240);
  const [sideOpen, setSideOpen] = useState(false);
  const [frontOpen, setFrontOpen] = useState(false);
  const [frontMode, setFrontMode] = useState<FrontMenuMode>("BuildingInfo");

  const [{ building, user }] = useAppContext();

  if (!building) {
    return <Navigate to="/map" />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  const toggleFrontMenu = (active: boolean, mode?: FrontMenuMode) => {
    if (mode) {
      setFrontMode(mode);
    }
    setFrontOpen(active);
  };

  const toggleDrawer = (active: boolean) => {
    setSideOpen(active);
  };

  const DrawerHeader = getDrawerHeader();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <BuildingTopbar
        width={width}
        open={sideOpen}
        onOpen={() => toggleDrawer(true)}
      />

      <BuildingDrawer
        width={width}
        open={sideOpen}
        onClose={() => toggleDrawer(false)}
        onToggleMenu={toggleFrontMenu}
      />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

        <BuildingViewport />
        <BuildingFrontMenu
          onToggleMenu={() => toggleFrontMenu(false)}
          open={frontOpen}
          mode={frontMode}
        />

        <BuildingBottomMenu />
      </Box>
      <Footer />
    </Box>
  );
};
