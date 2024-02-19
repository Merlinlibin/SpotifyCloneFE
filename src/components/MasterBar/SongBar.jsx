import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineHeart } from "react-icons/ai";
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
import { toast } from "react-toastify";

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

  // handle play and pause of song
  const handleMaster = () => {
    if (isPlaying) {
      dispatch(pauseMaster());
    } else {
      dispatch(playMaster());
    }
  };

  // Add song to the liked song array
  const addToLiked = async () => {
    console.log(masterSong.mp3);
    let data = JSON.stringify({
      song_mp3: masterSong.mp3.src,
      song_title: masterSong.title,
      song_artist: masterSong.artist,
      song_thumbnail: masterSong.img,
      id: masterSong.id,
    });
    const res = await fetch(
      "https://spotifyclonebackend.onrender.com/api/user/like",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: data,
      }
    );

    let d = await res.json();

    if (d.success) {
      toast.success(d.message);
    } else {
      toast.error(d.message);
    }
    console.log(d.user.likedSongs);
  };

  useEffect(() => {
    if (masterSong.mp3) {
      setDuration(formatTime(masterSong?.mp3?.duration));

      if (isPlaying) {
        masterSong?.mp3?.play();
      } else {
        masterSong?.mp3?.pause();
      }
    }

    if (isPlaying) {
      const intervalId = setInterval(() => {
        if (progress === 100) {
          dispatch(pauseMaster());
          resetEverything();
          dispatch(playSong(songs[songIdx + 1]));
        } else {
          setProgress(
            Math.round(
              (masterSong.mp3.currentTime / masterSong.mp3.duration) * 100
            )
          );
          setCurrTime(formatTime(masterSong.mp3.currentTime));
        }
        if (masterSong.mp3) {
          masterSong.mp3.onended = handleSongEnded;
        }
      }, 1000);

      return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }
  }, [masterSong, isPlaying, songIdx]);

  // On song ended autoplay next song
  const handleSongEnded = () => {
    if (masterSong.mp3) {
      masterSong.mp3.pause();
      masterSong.mp3.currentTime = 0;
    }
    resetEverything();
    console.log(songIdx);
    const nextSongIdx = songIdx + 1;
    setSongIdx(nextSongIdx);
    dispatch(playSong(songs[nextSongIdx]));
  };

  // Play next song
  const forwardSong = () => {
    if (songIdx < songs.length - 1) {
      if (masterSong.mp3) {
        masterSong.mp3.pause();
        masterSong.mp3.currentTime = 0;
      }
      resetEverything();
      console.log(songIdx);
      const nextSongIdx = songIdx + 1;
      setSongIdx(nextSongIdx);
      dispatch(playSong(songs[nextSongIdx]));
    } else {
      if (masterSong.mp3) {
        masterSong.mp3.pause();
        masterSong.mp3.currentTime = 0;
      }
      resetEverything();
      setSongIdx(0);
      dispatch(playSong(songs[0]));
    }
  };

  // Play Previous Spong
  const backwardSong = () => {
    console.log("backward");
    if (songIdx > 0) {
      if (masterSong.mp3) {
        masterSong.mp3.pause();
        masterSong.mp3.currentTime = 0;
      }
      resetEverything();
      console.log(songIdx);
      const prevSongIdx = songIdx - 1;
      setSongIdx(prevSongIdx);
      dispatch(playSong(songs[prevSongIdx]));
    } else {
      if (masterSong.mp3) {
        masterSong.mp3.pause();
        masterSong.mp3.currentTime = 0;
      }
      resetEverything();
      setSongIdx(songs.length - 1);
      dispatch(playSong(songs[songs.length - 1]));
    }
  };

  // control the song using the range
  const changeProgress = (e) => {
    setProgress(e.target.value);
    masterSong.mp3.currentTime =
      (e.target.value / 100) * masterSong.mp3.duration;
    console.log(progress);
  };

  const [volume, setVolume] = useState(50);

  // control the song volume using the range
  const changeVolume = (e) => {
    setVolume(e.target.value);
    console.log(e.target.value);
    masterSong.mp3.volume = e.target.value / 100;
  };

  // Song current duration 
  const formatTime = (durationInSeconds) => {
    let minutes = Math.floor(durationInSeconds / 60);
    let seconds = Math.round(durationInSeconds % 60);

    let formattedDuration = `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 9 ? "0" + seconds : seconds
    }`;
    return formattedDuration;
  };
  

  return (
    <div className="fixed w-full flex px-2 items-center justify-between bottom-0 left-0 h-3\5 bg-black">
      <div className="w-1/5">
        <div className="flex items-center gap-2">
          <img src={masterSong.img} alt="" className="h-12 hidden  md:block" />

          <AiOutlineHeart
            onClick={addToLiked}
            className="ml-3 cursor-pointer hover:text-red-400"
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
              onClick={changeProgress}
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
