import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { BuildingViewer } from "./components/building-viewer";
import { LoginForm } from "./components/login-form";
import { MapViewer } from "./components/map-viewer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/building" element={<BuildingViewer />} />
        <Route path="/map" element={<MapViewer />} />
        <Route path="/" element={<LoginForm />} />
      </Routes>
    </Router>
  );
}

export default App;
