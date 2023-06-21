import React, { useEffect, useState } from "react";
import "../Styles/Game.scss";
import GameContainer from "../Containers/GameContainer";
import { useParams } from "react-router-dom";
import {
  level1,
  level2,
  level3,
  level4,
  level5,
  level6,
  level7,
  level8,
  level9,
  level10,
} from "../Utils/levels";

const Game = () => {
  const { levelId } = useParams();
  const [currentLevel, setCurrentLevel] = useState(null);
  const allLevels = [
    level1,
    level2,
    level3,
    level4,
    level5,
    level6,
    level7,
    level8,
    level9,
    level10,
  ];
  const storedLevel = localStorage.getItem("currentLevel");

  useEffect(() => {
    if (levelId >= 1 && levelId <= 10) {
      setCurrentLevel(allLevels[levelId - 1]);
      localStorage.setItem("currentLevel", +levelId);
    } else {
      if (storedLevel && storedLevel >= 1 && storedLevel <= 10) {
        setCurrentLevel(allLevels[storedLevel - 1]);
      } else {
        setCurrentLevel(allLevels[0]);
      }
    }

  }, [levelId, storedLevel]);

  return (
    <div className="game">
      <GameContainer currentLevel={currentLevel} />
    </div>
  );
};

export default Game;
