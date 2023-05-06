import React from "react";
import { Tool } from "../../../types";
import CutIcon from "@mui/icons-material/ContentCut";
import RulerIcon from "@mui/icons-material/Straighten";
import ExplodeIcon from "@mui/icons-material/ImportExport";
import LayersIcon from "@mui/icons-material/Layers";

export function getBottomBarTools(): Tool[] {
  const tools = [
    {
      name: "Schnittwerkzeug",
      active: false,
      icon: <CutIcon />,
      action: () => {
        console.log("Cutting with planes!");
      },
    },
    {
      name: "Bemaßung",
      active: false,
      icon: <RulerIcon />,
      action: () => {
        console.log("Measure model!");
      },
    },
    {
      name: "Explodieren",
      active: false,
      icon: <ExplodeIcon />,
      action: (dispatch: any) => {
        const tool = tools.find((tool) => tool.name === "Explodieren");
        if (tool) {
          tool.active = !tool.active;
          dispatch({ type: "EXPLODE_MODEL", payload: tool.active });
        }
      },
    },
    {
      name: "Floor plan navigation",
      icon: <LayersIcon />,
      active: false,
      action: (dispatch: any) => {
        console.log("hei");
      },
    },
  ];
  return tools;
}
