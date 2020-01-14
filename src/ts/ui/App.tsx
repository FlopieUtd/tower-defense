import React from "react"; // eslint-disable-line
import { startGame } from "../engine";
import { BottomBar } from "./components/BottomBar/BottomBar"; // eslint-disable-line
import { TopBar } from "./components/TopBar/TopBar"; // eslint-disable-line

export const App = () => {
  startGame();
  return (
    <>
      <TopBar />
      <BottomBar />
    </>
  );
};
