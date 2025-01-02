import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../components/spinner.jsx";

const HomePage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces(response.data);
    });
  }, []);
  return places.length === 0 ? (
    <Spinner />
  ) : (
    <div className="grid grid-cols-2 md:grid-cols-3  lg:grid-cols-4 py-2 px-8 gap-x-4 gap-y-6">
      {places.length > 0 &&
        places.map((place, index) => (
          <Link to={"/place/" + place._id} key={index}>
            <div className="mb-2 w-full flex">
              {place.photos?.[0] && (
                <img
                  src={"http://localhost:3000/uploads/" + place.photos[0]}
                  className="rounded-lg aspect-square object-cover"
                  alt={place.title}
                />
              )}
            </div>
            <h2 className="text-sm font-bold truncate ">{place.title}</h2>
            <h3 className="text-sm text-gray-600  truncate">
              {" "}
              {place.addresse}{" "}
            </h3>
            <h2 className="text-gray-600 text-sm font-bold">
              {place.price}
              <span className="text-green-600"> MAD</span> per night
            </h2>
          </Link>
        ))}
    </div>
  );
};

export default HomePage;
