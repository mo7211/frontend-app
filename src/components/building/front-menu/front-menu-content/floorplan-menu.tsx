import { FC } from "react";
import { useAppContext } from "../../../../middleware/context-provider";
import "./building-info-menu.css";

export const FloorplanMenu: FC = () => {
  const [state, dispatch] = useAppContext();

  return <div>Floorplans</div>;
};
