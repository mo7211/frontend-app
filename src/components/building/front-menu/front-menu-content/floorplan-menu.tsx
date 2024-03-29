import { Button } from "@mui/material";
import { FC } from "react";
import { useAppContext } from "../../../../middleware/context-provider";
import "./building-info-menu.css";
import { Floorplan } from "../../../../types";

export const FloorplanMenu: FC = () => {
  const [state, dispatch] = useAppContext();

  const onFloorplanSelected = (active: boolean, floorplan?: Floorplan) => {
    dispatch({ type: "TOGGLE_FLOORPLAN", payload: { active, floorplan } });
  };

  return (
    <div>
      {state.floorplans.map((plan) => (
        <div key={plan.name} className="List-item">
          <Button
            onClick={() => onFloorplanSelected(true, plan)}
            className="wide-button"
          >
            {plan.name}
          </Button>
        </div>
      ))}
      <div key="exit" className="list-item">
        <Button
          onClick={() => onFloorplanSelected(false)}
          className="wide-button"
        >
          Exit
        </Button>
      </div>
    </div>
  );
};
