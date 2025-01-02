import React, { useState } from "react";
import { CiSquareRemove } from "react-icons/ci";
import { CgMenuGridO } from "react-icons/cg";

const PhotoGrid = ({ place }) => {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-black w-full h-full z-50">
        <div className="p-4 md:p-6">
          <h2 className="text-lg md:text-xl mr-20 md:mr-40 text-white font-bold">
            Photos of: {place.title}
          </h2>
          <button
            className="top-4 md:top-6 right-4 md:right-8 shadow-lg fixed flex items-center gap-1 md:gap-2 bg-white hover:bg-gray-100 transition-colors px-3 md:px-4 py-2 rounded-lg text-sm md:text-base"
            onClick={() => setShowAllPhotos(false)}
          >
            <CiSquareRemove size={20} />
            <span className="font-medium">Close</span>
          </button>
        </div>
        <div className="p-4 md:p-8 grid gap-4 md:gap-6 bg-black md:px-20 lg:px-40">
          {place?.photos?.length > 0 &&
            place.photos.map((photo, i) => (
              <div key={i}>
                <img
                  src={"http://localhost:3000/uploads/" + photo}
                  className="aspect-video object-cover rounded-2xl w-full shadow-2xl"
                  alt={`${place.title} - Photo ${i + 1}`}
                />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-2">
        <div className="flex">
          <img
            src={"http://localhost:3000/uploads/" + place.photos[0]}
            onClick={() => setShowAllPhotos(true)}
            className="w-full rounded-t-2xl md:rounded-t-none md:rounded-l-2xl cursor-pointer aspect-video object-cover hover:opacity-95 transition-opacity"
            alt="Main"
            loading="lazy"
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
          <div className="flex">
            <img
              src={"http://localhost:3000/uploads/" + place.photos[1]}
              onClick={() => setShowAllPhotos(true)}
              className="w-full md:rounded-tr-2xl cursor-pointer aspect-video object-cover hover:opacity-95 transition-opacity"
              alt="Secondary"
              loading="lazy"
            />
          </div>
          <div className="flex">
            <img
              src={"http://localhost:3000/uploads/" + place.photos[2]}
              onClick={() => setShowAllPhotos(true)}
              className="w-full rounded-b-2xl md:rounded-b-none md:rounded-br-2xl cursor-pointer aspect-video object-cover hover:opacity-95 transition-opacity"
              alt="Tertiary"
              loading="lazy"
            />
          </div>
        </div>
      </div>
      <button
        onClick={() => setShowAllPhotos(true)}
        className="absolute bottom-4 right-4 py-2 px-3 md:px-4 border border-gray-800 flex items-center gap-1 md:gap-2 rounded-lg bg-white shadow-md hover:bg-gray-100 transition-colors text-sm md:text-base"
      >
        <CgMenuGridO className="w-4 h-4 md:w-5 md:h-5" />
        <span className="font-medium">Show all photos</span>
      </button>
    </div>
  );
};

export default PhotoGrid;
