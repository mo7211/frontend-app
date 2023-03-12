import { FC } from "react";
import Footer from "../Footer";
import { useAppContext } from "../../middleware/context-provider";
import { Navigate } from "react-router-dom";
import { LogInButton } from "./login-button";
import { Logo } from "./logo";

export const LoginForm: FC = () => {
  const [state] = useAppContext();

  if (state.user) {
    return <Navigate to="/map" />;
  }

  return (
    <>
      <Logo />
      <LogInButton />
      <Footer />
    </>
  );
};
