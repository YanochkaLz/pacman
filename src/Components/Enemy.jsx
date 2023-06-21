import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleGameOver } from "../store/soudsSlice";

const Enemy = ({ oneBlock, amountBlocks, setGameOver, currentLevel }) => {
  const [topPosition, setTopPosition] = useState(
    () => oneBlock * (amountBlocks - 1)
  );
  const [leftPosition, setLeftPosition] = useState(() => 0);
  const [currentTopPosSprite, setCurrentTopPosSprite] = useState(() => 0);
  const positionPacman = useSelector((state) => state.position.coordinate);
  const game2Ref = useRef(null);
  const enemyRef = useRef(null);
  let step = 0;
  const stepSprite = 5.5;
  const dispatch = useDispatch();

  useEffect(() => {
    handleRun();
    game2Ref.current = setInterval(handleRun, 1000);

    return () => {
      clearInterval(game2Ref.current);
    };
  }, [positionPacman]);

  useEffect(() => {
    const pacmanTop = positionPacman.y;
    const pacmanLeft = positionPacman.x;
    const enemyLeft = parseInt(enemyRef.current.style.left);
    const enemyTop = parseInt(enemyRef.current.style.top);
    if (enemyLeft === pacmanLeft && enemyTop === pacmanTop) {
      handleDeath();
    }
  });

  const handleRun = () => {
    if (currentLevel?.length) {
      const pacmanTop = positionPacman.y;
      const pacmanLeft = positionPacman.x;
      const enemyLeft = parseInt(enemyRef.current.style.left);
      const enemyTop = parseInt(enemyRef.current.style.top);
      if (
        enemyTop < pacmanTop &&
        !currentLevel[enemyTop / 50 + 1][enemyLeft / 50]
      ) {
        setTopPosition((prev) =>
          Math.min(prev + oneBlock, (amountBlocks - 1) * oneBlock)
        );
        setCurrentTopPosSprite((2 + step) * stepSprite);
      } else if (
        enemyTop > pacmanTop &&
        !currentLevel[enemyTop / 50 - 1][enemyLeft / 50]
      ) {
        setTopPosition((prev) => Math.max(prev - oneBlock, 0));
        setCurrentTopPosSprite((6 + step) * stepSprite);
      } else if (
        enemyLeft < pacmanLeft &&
        !currentLevel[enemyTop / 50][enemyLeft / 50 + 1]
      ) {
        setLeftPosition((prev) =>
          Math.min(prev + oneBlock, (amountBlocks - 1) * oneBlock)
        );
        setCurrentTopPosSprite((0 + step) * stepSprite);
      } else if (
        enemyLeft > pacmanLeft &&
        !currentLevel[enemyTop / 50][enemyLeft / 50 - 1]
      ) {
        setLeftPosition((prev) => Math.max(prev - oneBlock, 0));
        setCurrentTopPosSprite((4 + step) * stepSprite);
      } else {
        if (!currentLevel[Math.min(enemyTop / 50 + 1, 13)][enemyLeft / 50]) {
          setTopPosition((prev) =>
            Math.min(prev + oneBlock, (amountBlocks - 1) * oneBlock)
          );
          setCurrentTopPosSprite((2 + step) * stepSprite);
        } else if (
          !currentLevel[Math.max(enemyTop / 50 - 1, 0)][enemyLeft / 50]
        ) {
          setTopPosition((prev) => Math.max(prev - oneBlock, 0));
          setCurrentTopPosSprite((6 + step) * stepSprite);
        } else if (!currentLevel[enemyTop / 50][enemyLeft / 50 + 1]) {
          setLeftPosition((prev) =>
            Math.min(prev + oneBlock, (amountBlocks - 1) * oneBlock)
          );
          setCurrentTopPosSprite((0 + step) * stepSprite);
        } else if (!currentLevel[enemyTop / 50][enemyLeft / 50 - 1]) {
          setLeftPosition((prev) => Math.max(prev - oneBlock, 0));
          setCurrentTopPosSprite((4 + step) * stepSprite);
        }
      }

      if (++step >= 2) step = 0;
    }
  };

  const handleDeath = () => {
    setTimeout(() => {
      dispatch(handleGameOver(true));
      setGameOver(true);
    }, 500);
  };

  return (
    <div
      ref={enemyRef}
      className="enemy"
      style={{
        height: `${oneBlock}px`,
        width: `${oneBlock}px`,
        top: `${topPosition}px`,
        left: `${leftPosition}px`,
        backgroundPosition: `72.5% ${currentTopPosSprite}%`,
      }}
    ></div>
  );
};

export default Enemy;
