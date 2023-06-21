import React, { useRef, useState, useCallback, useEffect } from "react";
import Pacman from "./Pacman";
import Obstacles from "./Obstacles";
import Enemy from "./Enemy";
import Coins from "./Coins";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentlevel } from "../store/currentLevel";
import Fruits from "./Fruits";
import { setFruits } from "../store/fruitsSlice";
import Timer from "./Timer";

const Field = ({ setGameOver, currentLevel}) => {
  const fieldRef = useRef(null);
  const oneBlock = 50;
  const amountBlocks = 14;
  const dispatch = useDispatch();


  const calcRandomPosFruits = useCallback(() => {
    const randomPos = [];
    for (let i = 0; i < 3; i++) {
      let x = Math.round(Math.random() * (amountBlocks - 1));
      let y = Math.round(Math.random() * (amountBlocks - 1));
      randomPos.push({
        x,
        y,
      });
    }
    return randomPos;
  }, []);

  useEffect(() => {
    if (currentLevel?.length) {
      const array = currentLevel.map((row) => [...row]);
      const randomPos = calcRandomPosFruits();
      const currentFruits = [];
      for (let i = 0; i < randomPos.length; i++) {
        if (array[randomPos[i].y][randomPos[i].x] === 0) {
          array[randomPos[i].y][randomPos[i].x] = 3;
          currentFruits.push({
            x: randomPos[i].x,
            y: randomPos[i].y
          })
        }
      }
      dispatch(setFruits(currentFruits));
      dispatch(setCurrentlevel(array));
    }
  }, [currentLevel]);


  return (
    <div
      ref={fieldRef}
      className="field-container"
      style={{
        width: `${oneBlock * amountBlocks}px`,
        height: `${oneBlock * amountBlocks}px`,
      }}
    >
      <Obstacles />
      <Coins />
      <Fruits/>
      <Pacman
        oneBlock={oneBlock}
        amountBlocks={amountBlocks}
      />
      <Enemy
        setGameOver={setGameOver}
        amountBlocks={amountBlocks}
        oneBlock={oneBlock}
        currentLevel={currentLevel}
      />
    </div>
  );
};

export default Field;
