import { FC } from "react";
import { getApp } from "firebase/app";
import Footer from "./Footer";

export const LoginForm: FC = () => {
  return (
    <>
      <h1>{JSON.stringify(getApp())}</h1>
      <Footer />
    </>
  );
};
