import { FC, useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../../middleware/context-provider";
import Footer from "../Footer";
import { Logo } from "../user/logo";
import { LogOutButton } from "../user/logout-button";
import "./map-viewer.css";

export const MapViewer: FC = () => {
  const [state, dispatch] = useAppContext();
  const containerRef = useRef(null);
  const thumbnailRef = useRef(null);
  const [isCreating, setIsCreating] = useState(false);
  const { user, building } = state;

  const onToggleCreate = () => {
    setIsCreating(!isCreating);
  };

  const onCreate = () => {
    if (isCreating) {
      dispatch({ type: "ADD_BUILDING", payload: user });
      setIsCreating(!isCreating);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container && user) {
      const thumbnail = thumbnailRef.current;
      dispatch({ type: "START_MAP", payload: { container, user, thumbnail } });
    }

    return () => {
      dispatch({ type: "REMOVE_MAP" });
    };
  }, []);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (building) {
    const url = `/building/?id=${building}`;
    return <Navigate to={url} />;
  }

  return (
    <>
      <Logo />
      <div
        onContextMenu={onCreate}
        className="full-screen"
        ref={containerRef}
      />
      {isCreating && (
        <div className="overlay">
          <p>Klicke rechts, um ein neues Gebäude zu erstellen, oder</p>
          <button onClick={onToggleCreate}>abbrechen</button>
        </div>
      )}
      <div className="button-container">
        <button onClick={onToggleCreate}>Neues Gebäude</button>
        <LogOutButton />
      </div>

      <Footer />
    </>
  );
};
