import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSpeed } from "../store/positionPacmanSlice";
import { setFruits } from "../store/fruitsSlice";

const Fruits = () => {
  const fruitsArray = useSelector((state) => state.fruits.fruits);
  const posPacman = useSelector((state) => state.position.coordinate);
  const dispatch = useDispatch();

  useEffect(() => {
    fruitsArray.map(({x, y}, i) => {
        if(x * 50 === posPacman.x && y * 50 === posPacman.y) {
            dispatch(setFruits(fruitsArray.filter((elem, index) => index !== i)))
            dispatch(setSpeed(300));
            setTimeout(() => {
                dispatch(setSpeed(500));
            }, 15000)
        }
    })
  }, [posPacman])

  return (
    <div className="fruits">
      <div className="fruits-container">
        {fruitsArray?.map((elem, i) => {
          return (
            <div
              key={i}
              style={{
                top: `${(elem.y / 14) * 100}%`,
                left: `${(elem.x / 14) * 100}%`,
              }}
              className="fruits__item"
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default Fruits;
