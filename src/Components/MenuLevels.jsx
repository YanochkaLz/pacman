import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import "../Styles/MenuLevels.scss";
import level1Img from "../Assets/Levels/1.png";
import level2Img from "../Assets/Levels/2.png";
import level3Img from "../Assets/Levels/3.png";
import level4Img from "../Assets/Levels/4.png";
import level5Img from "../Assets/Levels/5.png";
import level6Img from "../Assets/Levels/6.png";
import level7Img from "../Assets/Levels/7.png";
import level8Img from "../Assets/Levels/8.png";
import level9Img from "../Assets/Levels/9.png";
import level10Img from "../Assets/Levels/10.png";

const MenuLevels = () => {
  const nameParams = {
    back: "back",
  };
  const arrLevelNumbers = new Array(10).fill(0).map((elem, i) => (elem = ++i));
  const history = useNavigate();

  const handleClickBtn = (name) => {
    switch (name) {
      case nameParams.back:
        history("/");
        break;
      default:
        break;
    }
    if (arrLevelNumbers.includes(+name?.target?.id)) {
      history(`/game/${name.target.id}`);
    }
  };
  return (
    <div className="menu-levels">
      <Button
        name={nameParams.back}
        handleClickBtn={handleClickBtn}
        Content={"Back"}
      />
      <h1>Levels</h1>
      <div className="menu-levels__container">
        <div onClick={handleClickBtn} id="1" className="level">
          <div id="1" className="levelImg" style={{backgroundImage: `url(${level1Img})`}}></div>
          <h3 id="1">level 1</h3>
        </div>
        <div onClick={handleClickBtn}  id="2" className="level">
          <div id="2" className="levelImg" style={{backgroundImage: `url(${level2Img})`}}></div>
          <h3 id="2">level 2</h3>
        </div>
        <div onClick={handleClickBtn}  id="3" className="level">
          <div id="3" className="levelImg" style={{backgroundImage: `url(${level3Img})`}}></div>
          <h3 id="3">level 3</h3>
        </div>
        <div onClick={handleClickBtn}  id="4" className="level">
          <div id="4" className="levelImg" style={{backgroundImage: `url(${level4Img})`}}></div>
          <h3 id="4">level 4</h3>
        </div>
        <div onClick={handleClickBtn}  id="5" className="level">
          <div id="5" className="levelImg" style={{backgroundImage: `url(${level5Img})`}}></div>
          <h3 id="5">level 5</h3>
        </div>
        <div onClick={handleClickBtn}  id="6" className="level">
          <div id="6" className="levelImg" style={{backgroundImage: `url(${level6Img})`}}></div>
          <h3 id="6">level 6</h3>
        </div>
        <div onClick={handleClickBtn}  id="7" className="level">
          <div id="7" className="levelImg" style={{backgroundImage: `url(${level7Img})`}}></div>
          <h3 id="7">level 7</h3>
        </div>
        <div onClick={handleClickBtn}  id="8" className="level">
          <div id="8" className="levelImg" style={{backgroundImage: `url(${level8Img})`}}></div>
          <h3 id="8">level 8</h3>
        </div>
        <div onClick={handleClickBtn}  id="9" className="level">
          <div id="9" className="levelImg" style={{backgroundImage: `url(${level9Img})`}}></div>
          <h3 id="9">level 9</h3>
        </div>
        <div onClick={handleClickBtn}  id="10" className="level">
          <div id="10" className="levelImg" style={{backgroundImage: `url(${level10Img})`}}></div>
          <h3 id="10">level 10</h3>
        </div>
      </div>
    </div>
  );
};

export default MenuLevels;
