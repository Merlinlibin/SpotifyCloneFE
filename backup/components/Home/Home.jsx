import Layout from "../../Layout/Layout";
import Card from "../Card/Card";
import SongBar from "../MasterBar/SongBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { userActor } from "../../states/Actors/UserActor";
import Navbar from "../Navbar";
import { useGlobalContext } from "../../states/Contet";
import Footer from "../Footer/Footer";
import axios from "axios";


export const songs = [
  {
    id: "1",
    title: "Arabic-Kuthu",
    artist: "vijay",
    img: "https://res.cloudinary.com/dewfjhlh5/image/upload/v1706593828/uploades_1706593827996.jpg",
    mp3: new Audio("https://res.cloudinary.com/dewfjhlh5/video/upload/v1706593880/uploades_1706593828003.mp3"),
  },
  {
    id: "2",
    title: "Asku-Maro",
    artist: "MuganRoe",
    img: "https://res.cloudinary.com/dewfjhlh5/image/upload/v1706593957/uploades_1706593956687.jpg",
    mp3:new Audio( "https://res.cloudinary.com/dewfjhlh5/video/upload/v1706593992/uploades_1706593956687.mp3"),
  },
  {
    id: "3",
    title: "Baby-ne-sugar",
    artist: "Aswin",
    img: "https://res.cloudinary.com/dewfjhlh5/image/upload/v1706594055/uploades_1706594053449.jpg",
    mp3: new Audio("https://res.cloudinary.com/dewfjhlh5/video/upload/v1706594100/uploades_1706594053469.mp3"),
  },
  {
    id: "4",
    title: "Badass",
    artist: "Anirudh",
    img: "https://res.cloudinary.com/dewfjhlh5/image/upload/v1706594139/uploades_1706594138378.jpg",
    mp3: new Audio("https://res.cloudinary.com/dewfjhlh5/video/upload/v1706594174/uploades_1706594138382.mp3"),
  },
  {
    id: "5",
    title: "Breakup-enaku",
    artist: "Hipop Aadhi",
    img: "https://res.cloudinary.com/dewfjhlh5/image/upload/v1706594245/uploades_1706594243119.jpg",
    mp3:new Audio( "https://res.cloudinary.com/dewfjhlh5/video/upload/v1706594269/uploades_1706594243181.mp3"),
  },
  {
    id: "6",
    title: "Chill-Bro",
    artist: "Danush",
    img: "https://res.cloudinary.com/dewfjhlh5/image/upload/v1706594317/uploades_1706594316288.jpg",
    mp3:new Audio( "https://res.cloudinary.com/dewfjhlh5/video/upload/v1706594350/uploades_1706594316301.mp3"),
  },
  {
    id: "7",
    title: "Chilla-Chilla",
    artist: "Ajith",
    img: "https://res.cloudinary.com/dewfjhlh5/image/upload/v1706594395/uploades_1706594393755.jpg",
    mp3: new Audio("https://res.cloudinary.com/dewfjhlh5/video/upload/v1706594442/uploades_1706594393755.mp3"),
  },
  {
    id: "8",
    title: "Mayakirriye",
    artist: "Mugan Rao,Anirudh",
    img: "https://res.cloudinary.com/dewfjhlh5/image/upload/v1706594504/uploades_1706594503571.jpg",
    mp3:new Audio( "https://res.cloudinary.com/dewfjhlh5/video/upload/v1706594535/uploades_1706594503571.mp3"),
  },
  {
    id: "9",
    title: "Naa-Ready-Than",
    artist: "Vijay",
    img: "https://res.cloudinary.com/dewfjhlh5/image/upload/v1706594576/uploades_1706594575226.jpg",
    mp3:new Audio( "https://res.cloudinary.com/dewfjhlh5/video/upload/v1706594676/uploades_1706594575226.mp3"),
  },
];

const Home = () => {
  const { getUser } = useGlobalContext();

  useEffect(() => {
    getUser();
  }, []);
  return (
    <Layout>
      <Navbar />

      <div className="tertiary_bg ml-2 px-4 py-4 home ">
        <div className="flex justify-between mb-4 pt-4 items-center">
          <span className="text-xl font-bold hover:underline cursor-pointer">
            Focus
          </span>
          <span>Show All</span>
        </div>
        <div className="grid  gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {songs.map((song, i) => {
            return <Card key={song.id} idx={i} song={song} />;
          })}
        </div>
        <div className="flex justify-between my-4 items-center">
          <span className="text-xl font-bold hover:underline cursor-pointer">
            Spotify List
          </span>
          <span>Show All</span>
        </div>
        <div className="grid  gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {songs.map((song, i) => {
            return <Card key={song.id} idx={i} song={song} />;
          })}
        </div>
      </div>
      <Footer />
      <SongBar />
    </Layout>
  );
};

export default Home;
