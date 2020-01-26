import { observer } from "mobx-react";
import React, { useEffect } from "react"; // eslint-disable-line
import { initializeGame } from "../engine";
import { engine } from "../state/Engine";
import { BottomBar } from "./components/BottomBar/BottomBar"; // eslint-disable-line
import { LoseScreen } from "./components/LoseScreen/LoseScreen";
import { MenuScreen } from "./components/MenuScreen/MenuScreen";
import { TopBar } from "./components/TopBar/TopBar"; // eslint-disable-line
import { WinScreen } from "./components/WinScreen/WinScreen";

export const App = observer(() => {
  const { isGameOver, isGameWon, isMenuActive } = engine;
  useEffect(() => {
    initializeGame();
  }, []);

  return (
    <>
      <TopBar />
      {isGameOver && <LoseScreen />}
      {isGameWon && <WinScreen />}
      {isMenuActive && <MenuScreen />}
      <BottomBar />
    </>
  );
});
