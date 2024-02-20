import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import Navbar from "../Navbar";
import SongBar from "../MasterBar/SongBar";
import { useGlobalContext } from "../../states/Contet";
import { useDispatch, useSelector } from "react-redux";
import { pauseMaster } from "../../states/Actors/SongActor";
import Card from "../Card/Card";
import { songs } from "../Home/Home";

function LikedSongs() {
  const { resetEverything, getUser } = useGlobalContext();

  const { user, isAuthenticated } = useSelector((state) => state.account);

  const [likedSongs, setLikedSongs] = useState([]);
  const dispatch = useDispatch();

  // Storing the liked song in the state
  useEffect(() => {
    const fetchData = async () => {
      dispatch(pauseMaster());
      resetEverything();
      await getUser();
      console.log(user.likedSongs);
      setLikedSongs(user.likedSongs);
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <Navbar />
      <div className="tertiary_bg ml-2 px-4 py-4 home ">
        <div className="flex justify-between mb-4 pt-4 items-center">
          <span className="text-xl font-bold hover:underline cursor-pointer">
            Liked Songs
          </span>
        </div>
        {likedSongs?.length <= 0 && (
          <div className="grid  gap-6 gap-6 grid-cols-2 md:grid-cols-3">
            <div className="col-span-1">
              <CategoryCard
                title={"Live Events"}
                img={"/assets/Arijit-1.jpg"}
                color={"bg-purple-500"}
              />
            </div>
            <div className="col-span-1">
              <CategoryCard
                title={"Made For You"}
                img={"/assets/Arijit-1.jpg"}
                color={"bg-red-500"}
              />
            </div>
            <div className="col-span-1">
              <CategoryCard
                title={"New Releases"}
                img={"/assets/Arijit-1.jpg"}
                color={"bg-orange-500"}
              />
            </div>
            <div className="col-span-1">
              <CategoryCard
                title={"Live Events"}
                img={"/assets/Arijit-1.jpg"}
                color={"bg-purple-500"}
              />
            </div>
            <div className="col-span-1">
              <CategoryCard
                title={"Live Events"}
                img={"/assets/Arijit-1.jpg"}
                color={"bg-purple-500"}
              />
            </div>
          </div>
        )}
        {likedSongs?.length > 0 && (
          <div className="grid  gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {likedSongs.map((song) => {
              return (
                <Card
                  key={song.id}
                  idx={song.id - 1}
                  song={songs[song.id - 1]}
                />
              );
            })}
          </div>
        )}
      </div>
      <SongBar />
    </Layout>
  );
}

const CategoryCard = ({ title, img, color }) => {
  return (
    <div
      className={`p-4 rounded-lg w-full  ${color} relative overflow-hidden h-56`}>
      <span className="text-xl font-semibold mt-2">{title}</span>
      <img
        src={img}
        alt=""
        className="w-1/2 h-1/2 absolute bottom-0 -right-8 rotate-45 object-cover"
      />
    </div>
  );
};

export default LikedSongs;
