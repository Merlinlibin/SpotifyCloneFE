import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineHeart, AiOutlinePlaySquare } from "react-icons/ai";
import { IoMdSkipBackward, IoMdSkipForward } from "react-icons/io";
import { CgScreen } from "react-icons/cg";
import { BiRepeat, BiShuffle } from "react-icons/bi";
import { FaPause, FaPlay } from "react-icons/fa";
import { HiSpeakerXMark, HiSpeakerWave } from "react-icons/hi2";
import {
  pauseMaster,
  playMaster,
  playSong,
} from "../../states/Actors/SongActor";
import { useGlobalContext } from "../../states/Contet";
import "./SongBar.css";
import { songs } from "../Home/Home";

const SongBar = () => {
  const { masterSong, isPlaying } = useSelector((state) => state.mainSong);

  const {
    progress,
    setProgress,
    resetEverything,
    songIdx,
    setSongIdx,
    currTime,
    setCurrTime,
    duration,
    setDuration,
  } = useGlobalContext();

  const dispatch = useDispatch();

  const handleMaster = () => {
    if (isPlaying) {
      dispatch(pauseMaster());
    } else {
      dispatch(playMaster());
    }
  };

  const addToLiked = async () => {
    console.log(masterSong.mp3);
    let data = JSON.stringify({
      song_mp3: masterSong.mp3.src,
      song_title: masterSong.title,
      song_artist: masterSong.artist,
      song_thumbnail: masterSong.img,
    });
    const res = await fetch("http://localhost:5000/api/playlist/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: data,
    });

    let d = await res.json();
    console.log(d);
  };

  useEffect(() => {
    if (masterSong.mp3) {
      setDuration(formatTime(masterSong?.mp3?.duration));
      console.log(masterSong);
      if (isPlaying) {
        masterSong?.mp3?.play();
        setSongIdx(masterSong.id);
      } else {
        masterSong?.mp3?.pause();
      }
    }
    if (isPlaying) {
      setInterval(() => {
        if (progress === 100) {
          dispatch(pauseMaster());
          resetEverything();
        } else {
          setProgress(
            Math.round(
              (masterSong.mp3.currentTime / masterSong.mp3.duration) * 100
            )
          );
          setCurrTime(formatTime(masterSong.mp3.currentTime));
        }
      }, 1);
    }
  }, [masterSong, isPlaying]);

  const changeProgress = (e) => {
    setProgress(e.target.value);
    masterSong.mp3.currentTime =
      (e.target.value / 100) * masterSong.mp3.duration;
    //console.log(progress);
  };

  const [volume, setVolume] = useState(50);

  const changeVolume = (e) => {
    setVolume(e.target.value);
    // console.log(e.target.value);
    masterSong.mp3.volume = e.target.value / 100;
  };

  const formatTime = (durationInSeconds) => {
    let minutes = Math.floor(durationInSeconds / 60);
    let seconds = Math.round(durationInSeconds % 60);

    let formattedDuration = `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 9 ? "0" + seconds : seconds
    }`;
    return formattedDuration;
  };

  const mouseEnter = () => {
    document.querySelector(".active_progress").style.background = "green";
  };

  const mouseLeave = () => {
    document.querySelector(".active_progress").style.background = "#fff";
  };

  const enterVolume = () => {
    document.querySelector("#volume").style.background = "green";
  };

  const leaveVolume = () => {
    document.querySelector("#volume").style.background = "#fff";
  };

  const backwardSong = () => {
    console.log("backward");
    if (songIdx <= 0) return;
    if (masterSong.mp3) {
      masterSong?.mp3?.pause();
      masterSong.mp3.currentTime = 0;
    }
    resetEverything();
    setSongIdx((prevstate) => prevstate - 1);
    dispatch(playSong(songs[songIdx - 1]));
  };

  const forwardSong = () => {
    if (songIdx >= 9) return;
    if (masterSong.mp3) {
      masterSong?.mp3?.pause();
      masterSong.mp3.currentTime = 0;
    }
    resetEverything();
    console.log("forward");
    setSongIdx((prevstate) => prevstate + 1);
    dispatch(playSong(songs[songIdx + 1]));
  };

  return (
    <div className="fixed w-full flex px-2 items-center justify-between bottom-0 left-0 h-3\5 bg-black">
      <div className="w-1/5">
        <div className="flex items-center gap-2">
          <img src={masterSong.img} alt="" className="h-12 hidden  md:block" />

          <AiOutlineHeart
            onClick={addToLiked}
            className="ml-3 cursor-pointer hover:text-green-400"
          />
          <CgScreen className="ml-3" />
        </div>
      </div>
      <div className="w-3/5 m-3">
        <div className="flex justify-center items-center mb-2 gap-6">
          <BiShuffle />
          <IoMdSkipBackward onClick={backwardSong} className="cursor-pointer" />
          {isPlaying ? (
            <button
              onClick={handleMaster}
              className="flex items-center rounded-[50%] bg-white justify-center p-2 ">
              <FaPause className="text-black text-lg" />
            </button>
          ) : (
            <button
              onClick={handleMaster}
              className="flex items-center rounded-[50%] bg-white justify-center p-2">
              <FaPlay className="text-black text-lg" />
            </button>
          )}
          <IoMdSkipForward onClick={forwardSong} className="cursor-pointer" />
          <BiRepeat />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs">{currTime}</span>
          <div className="relative w-full flex items-center">
            <input
              type="range"
              name=""
              min={0}
              value={progress}
              disabled={!masterSong.mp3}
              onChange={changeProgress}
              onMouseEnter={mouseEnter}
              onMouseLeave={mouseLeave}
              className="w-full block"
              max={100}
            />

            <div className={`active_progress w-[${progress}%]`}></div>
          </div>
          <span className="text-xs">{duration}</span>
        </div>
      </div>
      <div className="w-1/5 flex items-center gap-2 ">
        {volume <= 0 && <HiSpeakerXMark className="text-2xl" />}
        {volume > 0 && <HiSpeakerWave className="text-2xl" />}
        <div className="relative w-full flex items-center ">
          <input
            type="range"
            name=""
            min={0}
            onMouseEnter={enterVolume}
            onMouseLeave={leaveVolume}
            value={volume}
            disabled={!masterSong.mp3}
            onChange={changeVolume}
            className="w-full block"
            max={100}
          />
          <div id="volume" className={`active_progress w-[${volume}%]`}></div>
        </div>
      </div>
    </div>
  );
};

export default SongBar;
