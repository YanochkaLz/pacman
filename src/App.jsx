import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Game from "./Pages/Game";
import Home from "./Pages/Home";
import Sounds from "./Containers/Sounds";
import MenuLevels from "./Components/MenuLevels";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/levels" element={<MenuLevels />} />
          <Route path="/game/:levelId" element={<Game />} />
        </Routes>
      </BrowserRouter>
      <Sounds />
    </>
  );
}

export default App;
