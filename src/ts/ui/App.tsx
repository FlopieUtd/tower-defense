import { observer } from "mobx-react";
import React, { useEffect } from "react"; // eslint-disable-line
import { initializeGame } from "../engine";
import { engine } from "../state/v2/Engine";
import { BottomBar } from "./components/BottomBar/BottomBar"; // eslint-disable-line
import { LoseScreen } from "./components/LoseScreen/LoseScreen";
import { TopBar } from "./components/TopBar/TopBar"; // eslint-disable-line

export const App = observer(() => {
  const { isGameOver } = engine;
  useEffect(() => {
    initializeGame();
  }, []);

  return (
    <>
      <TopBar />
      {isGameOver && <LoseScreen />}
      <BottomBar />
    </>
  );
});
