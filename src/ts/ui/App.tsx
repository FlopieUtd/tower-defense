import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { initializeGame } from "../engine";
import { engine, Screen } from "../state/Engine";
import { BottomBar } from "./components/BottomBar/BottomBar";
import { LoseScreen } from "./components/LoseScreen/LoseScreen";
import { MenuScreen } from "./components/MenuScreen/MenuScreen";
import { ResearchScreen } from "./components/ResearchScreen/ResearchScreen";
import { TopBar } from "./components/TopBar/TopBar";
import { WinScreen } from "./components/WinScreen/WinScreen";

export const App = observer(() => {
  const { activeScreen } = engine;
  useEffect(() => {
    initializeGame();
  }, []);

  return (
    <>
      {activeScreen === Screen.Game && <TopBar />}
      {activeScreen === Screen.Game && <BottomBar />}
      {activeScreen === Screen.Lose && <LoseScreen />}
      {activeScreen === Screen.Win && <WinScreen />}
      {activeScreen === Screen.Menu && <MenuScreen />}
      {activeScreen === Screen.Research && <ResearchScreen />}
    </>
  );
});
