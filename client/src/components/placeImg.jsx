import React from "react";

const PlaceImg = ({ place, index = 0 }) => {
  return (
    <>
      {place.photos?.[0] && (
        <img
          className="rounded-lg aspect-square object-cover w-full h-full"
          src={"http://localhost:3000/uploads/" + place.photos[index]}
          alt=""
        />
      )}
    </>
  );
};

export default PlaceImg;
