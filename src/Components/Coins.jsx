import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTotalCoins } from "../store/coinsSlice";

const Coins = () => {
  const coinsArray = useSelector((state) => state.coins.coins);
  const currentLevel = useSelector((state) => state.level.level);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentLevel?.length) {
      let totalCount = 0;
      currentLevel?.forEach((arr) => {
        arr.forEach((elem) => {
          if (!elem) {
            totalCount++;
          }
        });
      });
      dispatch(setTotalCoins(totalCount));
    }
  }, [currentLevel]);

  return (
    <div className="coins">
      <div className="coins-container">
        {coinsArray?.map((arr, i) => {
          return arr.map((elem, j) => {
            if (elem === 0) {
              return (
                <div
                  key={j}
                  className="coins-container__item"
                  style={{
                    top: `${(i / arr.length) * 100}%`,
                    left: `${(j / arr.length) * 100}%`,
                  }}
                >
                  <div className="coins__item"></div>
                </div>
              );
            }
            return null;
          });
        })}
      </div>
    </div>
  );
};

export default Coins;
