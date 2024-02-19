import Layout from "../../Layout/Layout";
import Card from "../Card/Card";
import SongBar from "../MasterBar/SongBar";
import { useEffect } from "react";
import Navbar from "../Navbar";
import { useGlobalContext } from "../../states/Contet";
import Footer from "../Footer/Footer";

export const songs = [
  {
    id: "1",
    title: "Arabic-Kuthu",
    artist: "vijay",
    img: "https://res.cloudinary.com/dewfjhlh5/image/upload/v1706593828/uploades_1706593827996.jpg",
    mp3: new Audio(
      "https://res.cloudinary.com/dewfjhlh5/video/upload/v1706593880/uploades_1706593828003.mp3"
    ),
  },
  {
    id: "2",
    title: "Asku-Maro",
    artist: "MuganRoe",
    img: "https://res.cloudinary.com/dewfjhlh5/image/upload/v1706593957/uploades_1706593956687.jpg",
    mp3: new Audio(
      "https://res.cloudinary.com/dewfjhlh5/video/upload/v1706593992/uploades_1706593956687.mp3"
    ),
  },
  {
    id: "3",
    title: "Baby-ne-sugar",
    artist: "Aswin",
    img: "https://res.cloudinary.com/dewfjhlh5/image/upload/v1706594055/uploades_1706594053449.jpg",
    mp3: new Audio(
      "https://res.cloudinary.com/dewfjhlh5/video/upload/v1706594100/uploades_1706594053469.mp3"
    ),
  },
  {
    id: "4",
    title: "Badass",
    artist: "Anirudh",
    img: "https://res.cloudinary.com/dewfjhlh5/image/upload/v1706594139/uploades_1706594138378.jpg",
    mp3: new Audio(
      "https://res.cloudinary.com/dewfjhlh5/video/upload/v1706594174/uploades_1706594138382.mp3"
    ),
  },
  {
    id: "5",
    title: "Breakup-enaku",
    artist: "Hipop Aadhi",
    img: "https://res.cloudinary.com/dewfjhlh5/image/upload/v1706594245/uploades_1706594243119.jpg",
    mp3: new Audio(
      "https://res.cloudinary.com/dewfjhlh5/video/upload/v1706594269/uploades_1706594243181.mp3"
    ),
  },
  {
    id: "6",
    title: "Chill-Bro",
    artist: "Danush",
    img: "https://res.cloudinary.com/dewfjhlh5/image/upload/v1706594317/uploades_1706594316288.jpg",
    mp3: new Audio(
      "https://res.cloudinary.com/dewfjhlh5/video/upload/v1706594350/uploades_1706594316301.mp3"
    ),
  },
  {
    id: "7",
    title: "Chilla-Chilla",
    artist: "Ajith",
    img: "https://res.cloudinary.com/dewfjhlh5/image/upload/v1706594395/uploades_1706594393755.jpg",
    mp3: new Audio(
      "https://res.cloudinary.com/dewfjhlh5/video/upload/v1706594442/uploades_1706594393755.mp3"
    ),
  },
  {
    id: "8",
    title: "Mayakirriye",
    artist: "Mugan Rao,Anirudh",
    img: "https://res.cloudinary.com/dewfjhlh5/image/upload/v1706594504/uploades_1706594503571.jpg",
    mp3: new Audio(
      "https://res.cloudinary.com/dewfjhlh5/video/upload/v1706594535/uploades_1706594503571.mp3"
    ),
  },
  {
    id: "9",
    title: "Naa-Ready-Than",
    artist: "Vijay",
    img: "https://res.cloudinary.com/dewfjhlh5/image/upload/v1706594576/uploades_1706594575226.jpg",
    mp3: new Audio(
      "https://res.cloudinary.com/dewfjhlh5/video/upload/v1706594676/uploades_1706594575226.mp3"
    ),
  },
  {
    id: "10",
    title: "Ava-Ena-Ena",
    artist: "Arijith",
    img: "https://res.cloudinary.com/dewfjhlh5/image/upload/v1708272428/vp9qjvdfa1a2dxhrerhe.webp",
    mp3: new Audio(
      "https://res.cloudinary.com/dewfjhlh5/video/upload/v1708272557/vqwxy1ocmhsqd6nhwsbe.mp3"
    ),
  },
  {
    id: "11",
    title: "Hukum-Alapara",
    artist: "Anirudh",
    img: "https://res.cloudinary.com/dewfjhlh5/image/upload/v1708272956/wg4rqbapose0vewr01bf.webp",
    mp3: new Audio(
      "https://res.cloudinary.com/dewfjhlh5/video/upload/v1708273475/p9sbfscujfu1cdwn0rbo.mp3 "
    ),
  },
  {
    id: "12",
    title: "Kaavaalaa",
    artist: "Anirudh",
    img: "https://res.cloudinary.com/dewfjhlh5/image/upload/v1708272956/wg4rqbapose0vewr01bf.webp",
    mp3: new Audio(
      "https://res.cloudinary.com/dewfjhlh5/video/upload/v1708273115/pgtqbzimjwqpldd5tpfg.mp3"
    ),
  },
  {
    id: "13",
    title: "Scene-Ah",
    artist: "Anirudh",
    img: "https://res.cloudinary.com/dewfjhlh5/image/upload/v1708273220/qd7l5jiegfip8ut9mube.webp",
    mp3: new Audio(
      "https://res.cloudinary.com/dewfjhlh5/video/upload/v1708273497/rqzn9byghn3wchwzxdgq.mp3"
    ),
  },
];

const Home = () => {
  const { getUser } = useGlobalContext();

  // Get the user if he logged in or not
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
