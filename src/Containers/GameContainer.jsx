import React, { useEffect, useState, useRef } from "react";
import Field from "../Components/Field";
import Button from "../Components/Button";
import sound from "../Assets/volume-2.svg";
import soundMuted from "../Assets/volume-x.svg";
import restartSrc from "../Assets/restart.svg";
import { useSelector, useDispatch } from "react-redux";
import { changeState, handelWin, handleGameOver } from "../store/soudsSlice";
import { useNavigate, useParams } from "react-router-dom";
import { setScore, setTotalCoins, setCoinsArray } from "../store/coinsSlice";
import Timer from "../Components/Timer";
import { setSpeed } from "../store/positionPacmanSlice";

const SoundBtn = ({ stateSound }) => (
  <img style={{ height: "50px" }} src={stateSound ? soundMuted : sound} />
);

const NextLevelBtn = () => <div>Next Level</div>;

const RestartBtn = ({ src }) => <img style={{ height: "50px" }} src={src} />;

const GameContainer = ({ currentLevel }) => {
  const nameParams = {
    restart: "restart",
    sound: "sound",
    back: "back",
    nextLevel: "nextLevel",
  };
  const { levelId } = useParams();
  const [gameOver, setGameOver] = useState(false);
  const dispatch = useDispatch();
  const isMuted = useSelector((state) => state.soundsSlice.isMuted);
  const isWin = useSelector((state) => state.soundsSlice.isWin);
  const history = useNavigate();
  const [isRestart, setIsRestart] = useState(false);
  const score = useSelector((state) => state.coins.score);
  const totalScore = useSelector((state) => state.coins.totalCoins);
  const speed = useSelector((state) => state.position.speed);
  const [topSpritePos, setTopSpritePos] = useState(0);
  const gameRef = useRef(null);
  let counter = 0;
  const storedLevel = localStorage.getItem("currentLevel");

  const handleClickBtn = (name) => {
    switch (name) {
      case nameParams.restart:
        setIsRestart(true);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        break;
      case nameParams.sound:
        dispatch(changeState(!isMuted));
        break;
      case nameParams.nextLevel:
        if (levelId) {
          history(`/game/${+levelId + 1}`);
        } else {
          if (storedLevel) {
            localStorage.setItem("currentLevel", +storedLevel + 1);
          } else {
            localStorage.setItem("currentLevel", "2");
          }
        }
        window.location.reload();
        break;
      case nameParams.back:
        dispatch(setCoinsArray([]));
        dispatch(setScore(0));
        dispatch(setTotalCoins(0));
        dispatch(handleGameOver(false));
        history("/");
        break;
      default:
        break;
    }
  };

  const handlePacmanDeath = () => {
    if (counter >= 11) clearInterval(gameRef.current);
    else {
      setTopSpritePos(counter * 5.7);
    }
    counter++;
  };

  useEffect(() => {
    if (gameOver) {
      gameRef.current = setInterval(handlePacmanDeath, 200);
      dispatch(setSpeed(500));
    }
    return () => {
      clearInterval(gameRef.current);
    };
  }, [gameOver]);

  useEffect(() => {
    if (score - 1 === totalScore && score - 1 && totalScore) {
      // if (score === 3) {
      console.log("WIN!");
      dispatch(handelWin(true));
    }
  }, [score]);

  return (
    <div className="game-container">
      <div className="game-menu">
        <Button
          name={nameParams.back}
          handleClickBtn={handleClickBtn}
          Content={"Back"}
        />
        <h2 className="game-menu_score">
          Level {!storedLevel ? 1 : +storedLevel}
          <br></br>
          Your Score: {!score ? 0 : score - 1}
        </h2>
        <div className="game-menu_container">
          <Button
            name={nameParams.sound}
            handleClickBtn={handleClickBtn}
            Content={<SoundBtn stateSound={isMuted} />}
            Style={`${isMuted ? "blue" : "yellow"}`}
          />
          <div className={isRestart ? "restart-btn isRestart" : "restart-btn"}>
            <Button
              name={nameParams.restart}
              handleClickBtn={handleClickBtn}
              Content={<RestartBtn src={restartSrc} />}
            />
          </div>
        </div>
      </div>
      <div className="game-field">
        {speed === 300 && <Timer />}

        {!gameOver && !isWin ? (
          <Field setGameOver={setGameOver} currentLevel={currentLevel} />
        ) : gameOver ? (
          <div className="gameOver">
            <div
              style={{ backgroundPosition: `39% ${topSpritePos}%` }}
              className="pacman-lost"
            ></div>
            <h2 className="gameOver-title">Game over!</h2>
          </div>
        ) : (
          <div className="gameOver">
            <div
              style={{ backgroundPosition: `95% 6%` }}
              className="pacman-lost"
            ></div>
            {+storedLevel === 10 ? (
              <h2
                className="gameOver-title"
                style={{
                  marginTop: "100px",
                  fontSize: "30px",
                  textAlign: "center",
                  lineHeight: "200%",
                }}
              >
                Congratulations!
                <br></br>
                You made it through the whole game!
              </h2>
            ) : (
              <>
                <h2 className="gameOver-title">Level passed!</h2>
                <Button
                  name={nameParams.nextLevel}
                  handleClickBtn={handleClickBtn}
                  Content={<NextLevelBtn />}
                ></Button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(GameContainer);
