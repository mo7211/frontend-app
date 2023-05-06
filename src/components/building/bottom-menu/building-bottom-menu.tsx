import { FC } from "react";
import { Card, IconButton } from "@mui/material";
import "./building-bottom-menu.css";
import { getBottomBarTools } from "./bottombar-tools";
import { useAppContext } from "../../../middleware/context-provider";

export const BuildingBottomMenu: FC = () => {
  const [state, dispatch] = useAppContext();
  const tools = getBottomBarTools(state, dispatch);

  return (
    <Card className="bottom-menu">
      {tools.map((tool) => (
        <IconButton onClick={tool.action} key={tool.name}>
          {tool.icon}
        </IconButton>
      ))}
    </Card>
  );
};
