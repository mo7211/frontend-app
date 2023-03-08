import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { initializeApp } from "firebase/app";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkS64qd0CTq7M5Uq3QFueeYmHGqDvHFdk",
  authDomain: "m3-viewer.firebaseapp.com",
  projectId: "m3-viewer",
  storageBucket: "m3-viewer.appspot.com",
  messagingSenderId: "761790519766",
  appId: "1:761790519766:web:56277d111466b1257cec77",
};

// Initialize Firebase
initializeApp(firebaseConfig);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
