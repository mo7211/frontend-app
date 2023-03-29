import { FC } from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../../middleware/context-provider";
import Footer from "../Footer";

export const BuildingViewer: FC = () => {
  const [state, dispatch] = useAppContext();
  const { building } = state;

  const onCloseBuilding = () => {
    dispatch({ type: "CLOSE_BUILDING" });
  };

  if (!building) {
    return <Navigate to={"/map"} />;
  }

  return (
    <>
      <h1>Hello building viewer!</h1>
      <button onClick={onCloseBuilding}>Modell schließen</button>
      <Footer />
    </>
  );
};
