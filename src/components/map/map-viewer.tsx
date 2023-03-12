import { FC, useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../../middleware/context-provider";
import Footer from "../Footer";
import { Logo } from "../user/logo";
import { LogOutButton } from "../user/logout-button";

export const MapViewer: FC = () => {
  const [state, dispatch] = useAppContext();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && state.user) {
      dispatch({ type: "START_MAP", payload: canvas });
    }

    return () => {
      dispatch({ type: "REMOVE_MAP" });
    };
  }, []);

  if (!state.user) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Logo />
      <LogOutButton />
      <div className="full-screen" ref={canvasRef} />
      <Footer />
    </>
  );
};
