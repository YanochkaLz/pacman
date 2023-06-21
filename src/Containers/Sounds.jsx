import React, { useEffect, useRef } from "react";
import audio1Src from "../Assets/Sound/1.mp3";
import audio2Src from "../Assets/Sound/2.mp3";
import audio3Src from "../Assets/Sound/3.wav";
import { useSelector } from "react-redux";

const Sounds = () => {
  const audioRef = useRef(null);
  const isMuted = useSelector((state) => state.soundsSlice.isMuted);
  const isGameOver = useSelector((state) => state.soundsSlice.isGameOver);
  const isWin = useSelector((state) => state.soundsSlice.isWin);

  useEffect(() => {
    const audio = audioRef.current;
    audio.src = isGameOver ? audio3Src : audio1Src;
    if(isWin) audio.src = audio2Src;
    if (isMuted) audio.pause();
    else audio.play();
  }, [isMuted, isGameOver, isWin]);


  return (
    <div>
      <audio ref={audioRef} />
    </div>
  );
};

export default Sounds;
