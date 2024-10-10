import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "./App.css";
import LandingPage from "./pages/landingpage/LandingPage";
import Navbarr from "./pages/navbar/Navbarr";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbarr />
      <LandingPage />
    </>
  );
}

export default App;
