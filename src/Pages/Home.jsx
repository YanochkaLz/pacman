import React, { useEffect } from "react";
import "../Styles/Home.scss";
import Button from "../Components/Button";
import sound from "../Assets/volume-2.svg";
import soundMuted from "../Assets/volume-x.svg";
import { useDispatch, useSelector } from "react-redux";
import { changeState } from "../store/soudsSlice";
import { useNavigate } from "react-router-dom";
import { setSpeed } from "../store/positionPacmanSlice";

const PlayBtn = () => <div style={{ fontSize: "35px" }}>Play</div>;
const LevelsBtn = () => <div style={{ fontSize: "25px" }}>Levels</div>;
const SoundBtn = ({ stateSound }) => (
  <img style={{ height: "50px" }} src={stateSound ? soundMuted : sound} />
);

const Home = () => {
  const nameParams = {
    play: "play",
    sound: "sound",
    levels: "levels"
  };
  const dispatch = useDispatch();
  const isMuted = useSelector((state) => state.soundsSlice.isMuted);
  const history = useNavigate();
  useEffect(() => {
    dispatch(setSpeed(500));
  }, [])

  const handleClickBtn = (name) => {
    switch (name) {
      case nameParams.play:
        history("/game");
        break;
      case nameParams.levels:
        history("/levels");
        break;
      case nameParams.sound:
        dispatch(changeState(!isMuted));
        break;
      default:
        break;
    }
  };

  return (
    <div className="home">
      <h1 className="home-title">Pacman Game</h1>
      <div className="home-container">
        <Button
          name={nameParams.play}
          handleClickBtn={handleClickBtn}
          Content={<PlayBtn />}
        />
        <Button
          name={nameParams.levels}
          handleClickBtn={handleClickBtn}
          Content={<LevelsBtn/>}
        />
        <Button
          name={nameParams.sound}
          handleClickBtn={handleClickBtn}
          Content={<SoundBtn stateSound={isMuted} />}
          Style={`${isMuted ? "blue" : "var(--mainFont)"}`}
        />
      </div>
    </div>
  );
};

export default Home;
