import React from "react";
import { Route, Routes, Switch } from "react-router-dom";
import GamePage from "./pages/GamePage/GamePage";

function App() {
  return (
    <div>
      <main>
        <Routes>
          <Route exact path="/" element={<GamePage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
