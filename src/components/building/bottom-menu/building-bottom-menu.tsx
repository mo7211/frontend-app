import { FC } from "react";
import { Card, Icon, IconButton } from "@mui/material";
import "./building-bottom-menu.css";
import { getBottomBarTools } from "./bottombar-tools";
import { useAppContext } from "../../../middleware/context-provider";

const tools = getBottomBarTools();

export const BuildingBottomMenu: FC = () => {
  const dispatch = useAppContext()[1];

  return (
    <Card className="bottom-menu">
      {tools.map((tool) => {
        return (
          <IconButton
            color={tool.active ? "primary" : "default"}
            onClick={() => tool.action(dispatch)}
            key={tool.name}
          >
            {tool.icon}
          </IconButton>
        );
      })}
    </Card>
  );
};
