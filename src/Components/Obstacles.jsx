import React from "react";
import { useSelector } from "react-redux";

const Obstacles = () => {

  const currentLevel = useSelector((state) => state.level.level);

  return (
    <div className="obstacles">
      {currentLevel.map((arr, i) => {
        return arr.map((elem, j) => {
          if (elem === 1) {
            return (
              <div
                key={j}
                style={{
                  top: `${(i / arr.length) * 100}%`,
                  left: `${(j / arr.length) * 100}%`,
                }}
                className="obstacles__item"
              ></div>
            );
          }
          return null;
        });
      })}
    </div>
  );
};

export default Obstacles;
