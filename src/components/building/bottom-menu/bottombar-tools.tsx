import React from "react";
import { State } from "../../../middleware/state";
import { Action } from "../../../middleware/actions";
import { Tool } from "../../../types";
import CutIcon from "@mui/icons-material/ContentCut";
import RulerIcon from "@mui/icons-material/Straighten";
import ExplodeIcon from "@mui/icons-material/ImportExport";

export function getBottomBarTools(
  state: State,
  dispatch: React.Dispatch<Action>
): Tool[] {
  return [
    {
      name: "Schnittwerkzeug",
      icon: <CutIcon />,
      action: () => {
        console.log("Cutting with planes!");
      },
    },
    {
      name: "Bemaßung",
      icon: <RulerIcon />,
      action: () => {
        console.log("Measure model!");
      },
    },
    {
      name: "Explodieren",
      icon: <ExplodeIcon />,
      action: () => {
        console.log("Exploding models!");
      },
    },
  ];
}
