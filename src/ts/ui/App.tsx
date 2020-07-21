import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { initializeGame } from "../engine";
import { engine, Screen } from "../state/Engine";
import { ActiveTowerDialog } from "./components/ActiveTowerDialog/ActiveTowerDialog";
import { BottomBar } from "./components/BottomBar/BottomBar";
import { GameOverScreen } from "./components/GameOverScreen/GameOverScreen";
import { MenuScreen } from "./components/MenuScreen/MenuScreen";
import { PauseDialog } from "./components/PauseDialog/PauseDialog";
import { ResearchScreen } from "./components/ResearchScreen/ResearchScreen";
import { TopBar } from "./components/TopBar/TopBar";

import { GameWonScreen } from "./components/GameWonScreen/GameWonScreen";
import { WavePreview } from "./components/WavePreview/WavePreview";

export const App = observer(() => {
  const { activeScreen, isPaused } = engine;
  useEffect(() => {
    initializeGame();
  }, []);

  return (
    <>
      {activeScreen === Screen.Game && <TopBar />}
      {activeScreen === Screen.Game && <BottomBar />}
      {activeScreen === Screen.Game && <ActiveTowerDialog />}
      {activeScreen === Screen.Game && <WavePreview />}
      {activeScreen === Screen.GameOver && <GameOverScreen />}
      {activeScreen === Screen.GameWon && <GameWonScreen />}
      {activeScreen === Screen.Menu && <MenuScreen />}
      {activeScreen === Screen.Research && <ResearchScreen />}
      {isPaused && <PauseDialog />}
    </>
  );
});
