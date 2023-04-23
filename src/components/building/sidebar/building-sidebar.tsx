import { FC } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { getSidebarTools } from "./sidebar-tools";
import { useAppContext } from "../../../middleware/context-provider";

const items = ["Models", "Floorplans", "Issues", "Map", "Log out"];

export const BuildingSidebar: FC<{
  open: boolean;
  onToggleMenu: () => void;
}> = (props) => {
  const { open, onToggleMenu } = props;
  const [state, dispatch] = useAppContext();

  const tools = getSidebarTools(state, dispatch, onToggleMenu);

  return (
    <List>
      {items.map((text, index) => (
        <ListItem key={text} disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
