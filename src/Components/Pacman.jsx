import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePosition } from "../store/positionPacmanSlice";
import { setCoinsArray } from "../store/coinsSlice";

const arrows = {
  left: "ArrowLeft",
  right: "ArrowRight",
  up: "ArrowUp",
  down: "ArrowDown",
};

const stepSprite = 5.5;

const Pacman = ({ oneBlock, amountBlocks }) => {
  const currentLevel = useSelector((state) => state.level.level);
  const speed = useSelector((state) => state.position.speed);
  const currentLevelRef = useRef([]);
  const [topPosition, setTopPosition] = useState(() => 0);
  const [coinsArray, setCoins] = useState([]);
  const [leftPosition, setLeftPosition] = useState(() => 0);
  const pacmanElem = useRef(null);
  const [currentTopPosSprite, setCurrentTopPosSprite] = useState(() => 0);
  let step = 0;
  const dispatch = useDispatch();
  const game2Ref = useRef(null);

  useEffect(() => {
    if (currentLevel?.length) {
      currentLevelRef.current = currentLevel;
      setCoins(currentLevel);
    }
  }, [currentLevel]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      clearInterval(game2Ref.current);
      game2Ref.current = setInterval(() => handleRun(e.code), speed);
    };

    addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [speed]);

  useEffect(() => {
    dispatch(changePosition({ x: leftPosition, y: topPosition }));
    if (
      coinsArray?.length &&
      !coinsArray[Math.floor(topPosition / 50)][Math.floor(leftPosition / 50)]
    ) {
      setTimeout(() => {
        setCoins(() => {
          const newArray = coinsArray.map((row) => [...row]);
          newArray[Math.floor(topPosition / 50)][
            Math.floor(leftPosition / 50)
          ] = 1;
          return newArray;
        });
      }, 280);
    }
  }, [leftPosition, topPosition, dispatch]);

  useEffect(() => {
    if (coinsArray?.length) {
      dispatch(setCoinsArray(coinsArray));
    }
  }, [coinsArray]);

  const handleClashObstacles = useCallback((dir) => {
    const currentLevel = currentLevelRef.current;
    if (!currentLevel?.length) return false;
    let moving = true;
    let left = parseInt(pacmanElem.current?.style.left)
      ? parseInt(pacmanElem.current?.style.left)
      : 0;
    let top = parseInt(pacmanElem.current?.style.top)
      ? parseInt(pacmanElem.current?.style.top)
      : 0;

    switch (dir) {
      case arrows.left:
        setCurrentTopPosSprite((6 + step) * stepSprite);
        if (currentLevel[top / 50][Math.max(left / 50 - 1, 0)] === 1)
          moving = false;
        break;
      case arrows.right:
        setCurrentTopPosSprite((0 + step) * stepSprite);
        if (currentLevel[top / 50][Math.min(left / 50 + 1, 13)] === 1)
          moving = false;
        break;
      case arrows.up:
        setCurrentTopPosSprite((9 + step) * stepSprite);
        if (currentLevel[Math.max(top / 50 - 1, 0)][left / 50] === 1)
          moving = false;
        break;
      case arrows.down:
        setCurrentTopPosSprite((3 + step) * stepSprite);
        if (currentLevel[Math.min(top / 50 + 1, 13)][left / 50] === 1)
          moving = false;
        break;
      default:
        break;
    }
    if (++step >= 3) step = 0;
    return moving;
  }, [step, currentLevel]);

  const handleRun = useCallback((dir) => {
    if (handleClashObstacles(dir)) {
      switch (dir) {
        case arrows.left:
          setLeftPosition((prev) => Math.max(prev - oneBlock, 0));
          break;
        case arrows.right:
          setLeftPosition((prev) =>
            Math.min(prev + oneBlock, (amountBlocks - 1) * oneBlock)
          );
          break;
        case arrows.up:
          setTopPosition((prev) => Math.max(prev - oneBlock, 0));
          break;
        case arrows.down:
          setTopPosition((prev) =>
            Math.min(prev + oneBlock, (amountBlocks - 1) * oneBlock)
          );
          break;
        default:
          break;
      }
    }
  }, [oneBlock, amountBlocks, handleClashObstacles]);

  return (
    <>
      <div
        ref={pacmanElem}
        className="pacman"
        style={{
          height: `${oneBlock}px`,
          width: `${oneBlock}px`,
          top: `${topPosition}px`,
          left: `${leftPosition}px`,
          backgroundPosition: `95.5% ${currentTopPosSprite}%`,
        }}
      ></div>
    </>
  );
};

export default Pacman;
