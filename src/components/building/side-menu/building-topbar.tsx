import { IconButton, Toolbar, Typography } from "@mui/material";
import { FC } from "react";
import { getAppBar } from "./mui-utils";
import MenuIcon from "@mui/icons-material/Menu";

export const BuildingTopbar: FC<{
  open: boolean;
  onOpen: () => void;
  width: number;
}> = (props) => {
  const { open, onOpen, width } = props;

  const Appbar = getAppBar(width);

  return (
    <>
      <Appbar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={onOpen}
            edge="start"
            sx={{ marginRight: 5, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Modell-Viewer
          </Typography>
        </Toolbar>
      </Appbar>
    </>
  );
};
