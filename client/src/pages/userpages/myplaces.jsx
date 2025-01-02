import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// icons
import { FaCirclePlus } from "react-icons/fa6";
import UserNavPage from "./usernavpage.jsx";

import axios from "axios";
import PlaceImg from "../../components/placeImg.jsx";

const MyPlaces = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/user-place").then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  return (
    <div className="mx-auto grow w-full flex flex-col px-4">
      <UserNavPage />
      <div className="flex flex-col items-center justify-center mb-4">
        <Link
          to="/account/places/new"
          className="bg-primary hover:bg-primaryhover justify-center py-3 px-6 rounded-full text-white flex items-center gap-3 transition duration-200 shadow-md hover:shadow-lg"
        >
          <FaCirclePlus size={20} />
          <p className="font-medium">Add new place</p>
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        {places.length > 0 &&
          places.map((place) => (
            <Link
              to={"/account/places/" + place._id}
              key={place._id}
              className="bg-gray-200 flex gap-4 rounded-xl p-4 cursor-pointer mb-4"
            >
              <div className="flex w-32 h-32 bg-gray-300 grow shrink-0 aspect-square">
                <PlaceImg place={place} />
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-xl">{place.title}</h2>
                <p className="text-sm mt-2">{place.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};
export default MyPlaces;
