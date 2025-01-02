import React, { useState } from "react";
import axios from "axios";

// icons
import { IoCloudUploadOutline } from "react-icons/io5";
import { CiTrash } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";

const PhotoUploaderpage = ({ photos, setPhotos }) => {
  const [photosLink, setPhotoLink] = useState("");

  const addPhotoByLink = async (e) => {
    e.preventDefault();
    const { data: filename } = await axios.post("/uploadByLink", {
      link: photosLink,
    });
    setPhotos((prev) => {
      return [...prev, filename];
    });
    setPhotoLink("");
  };

  const uploadPhoto = async (e) => {
    e.preventDefault();
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    try {
      const response = await axios.post("/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const { data: filenames } = response;
      if (filenames && filenames.length > 0) {
        setPhotos((prev) => [...prev, ...filenames]);
      } else {
        throw new Error("No files were uploaded");
      }
    } catch (error) {
      console.error("Error uploading photo:", error.message);
      alert("Failed to upload photos. Please try again.");
    }
  };

  const handleImgDelete = async (fileName, e) => {
    e.preventDefault();
    setPhotos([...photos.filter((photo) => photo !== fileName)]);
  };

  const handleSelectedImg = (filename, e) => {
    e.preventDefault();
    const filteredPhotos = photos.filter((photo) => photo !== filename);
    setPhotos([filename, ...filteredPhotos]);
  };

  return (
    <>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add using a link"
          value={photosLink}
          onChange={(e) => setPhotoLink(e.target.value)}
          className="w-full rounded-lg border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <button
          onClick={addPhotoByLink}
          className="bg-gray-100 px-6 rounded-lg hover:bg-gray-200 transition font-medium"
        >
          Add Photo
        </button>
      </div>
      <div className=" grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {photos.length > 0 &&
          photos.map((photo) => (
            <div key={photo} className="relative aspect-square">
              <img
                src={`http://localhost:3000/uploads/${photo}`}
                alt="upload"
                className="rounded-lg w-full h-full object-cover"
              />
              <button
                onClick={(e) => handleImgDelete(photo, e)}
                className="absolute right-1 bottom-1 p-1 flex items-center justify-center bg-black bg-opacity-40 cursor-pointer rounded-md "
              >
                <CiTrash className="text-white" size={16} />
              </button>
              <button
                onClick={(e) => handleSelectedImg(photo, e)}
                className="absolute right-1 top-1 p-1 flex items-center justify-center bg-black bg-opacity-40 cursor-pointer rounded-md "
              >
                {photo === photos[0] && (
                  <FaStar className="text-yellow-400" size={16} />
                )}
                {photo !== photos[0] && (
                  <CiStar className="text-yellow-400" size={16} />
                )}
              </button>
            </div>
          ))}
        <label className="text-gray-600 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-300 flex flex-col gap-2 items-center justify-center hover:border-primary hover:text-primary transition p-4">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={uploadPhoto}
          />
          <IoCloudUploadOutline size={24} />
          <span className="text-sm">Upload</span>
        </label>
      </div>
    </>
  );
};

export default PhotoUploaderpage;
