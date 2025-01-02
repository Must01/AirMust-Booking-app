import React, { useEffect, useState } from "react";

import FeaturesPage from "./featurespage.jsx";
import PhotoUploaderpage from "./photoUploaderpage.jsx";

import axios from "axios";
import UserNavPage from "../usernavpage.jsx";
import { Navigate, useParams } from "react-router-dom";

const NewPlacefrom = () => {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [addresse, setAddresse] = useState("");
  const [photos, setPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(1);
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }
    const fetchPlace = async () => {
      try {
        const { data } = await axios.get("/places/" + id);
        setTitle(data.title);
        setAddresse(data.addresse);
        setDescription(data.description);
        setPhotos(data.photos);
        setFeatures(data.features);
        setExtraInfo(data.extraInfo);
        setCheckIn(data.checkIn);
        setCheckOut(data.checkOut);
        setMaxGuests(data.maxGuests);
        setPrice(data.price);
      } catch (error) {
        console.log("error getting the place data ", error);
      }
    };
    fetchPlace();
  }, [id]);

  // functions :
  const inputHeader = (text) => {
    return <h2 className="text-2xl font-medium mt-2">{text}</h2>;
  };
  const inputDescription = (text) => {
    return <p className="text-sm text-gray-500">{text}</p>;
  };
  const inputLabel = (header, description) => {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  };

  const savePlace = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const placeData = {
      title,
      addresse,
      photos,
      description,
      features,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };

    try {
      if (id) {
        // Update existing place
        await axios.put(`/places/${id}`, {
          id,
          ...placeData,
        });
      } else {
        // Create new place
        await axios.post("/places", placeData);
      }
      setRedirect(true);
    } catch (error) {
      setError(error.response?.data?.error || "Failed to save place");
    } finally {
      setLoading(false);
    }
  };

  if (redirect) {
    return <Navigate to="/account/places" />;
  }

  return (
    <div className="flex flex-col">
      <UserNavPage />
      <div className="w-full px-4 ">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <form
          onSubmit={savePlace}
          className="flex flex-col gap-6 bg-gray-50 rounded-2xl p-8 shadow-lg"
        >
          <div className="space-y-2">
            {inputLabel("Title", "Title for your place (shorter & catchy)")}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="title, Ex: My lovely apartment"
              className="w-full rounded-lg border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent mt-2 transition"
            />
          </div>

          <div className="space-y-2">
            {inputLabel("Address", "Address to your place")}
            <input
              type="text"
              value={addresse}
              onChange={(e) => setAddresse(e.target.value)}
              placeholder="Address, of your place"
              className="w-full rounded-lg border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent mt-2 transition"
            />
          </div>

          <div className="space-y-3">
            {inputLabel("Photos", "more photos is better")}
            <PhotoUploaderpage photos={photos} setPhotos={setPhotos} />
          </div>

          <div className="space-y-2">
            {inputLabel("Description", "Description of your place")}
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description, of your place"
              className="w-full min-h-32 max-h-36 rounded-lg border overflow-hidden border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent mt-2 transition"
            />
          </div>

          <div className="space-y-2">
            {inputLabel("features", "Select all the features of your place")}
            <div className="grid gap-3 w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              <FeaturesPage selected={features} onChange={setFeatures} />
            </div>
          </div>

          <div className="space-y-2">
            {inputLabel("Extra Info", "House Rules, ect..")}
            <textarea
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
              placeholder="House Rules, ect.."
              className="w-full min-h-32 max-h-36 rounded-lg border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent mt-2 transition"
            />
          </div>

          <div className="space-y-2">
            {inputLabel("Check in & out times", "Add check in & out time")}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <h3 className="font-medium text-gray-700">Check in time</h3>
                <input
                  type="text"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-gray-700">Check out time</h3>
                <input
                  type="text"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-gray-700">
                  Guest number of Guestes
                </h3>
                <input
                  type="Number"
                  value={maxGuests}
                  onChange={(e) => setMaxGuests(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {inputLabel("Price", "Price per night")}
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price per night"
              className="w-full rounded-lg border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent mt-2 transition"
            />
          </div>

          <div className="mt-8">
            <button
              disabled={loading}
              className={`w-full py-3 px-4 rounded-full text-white font-medium text-lg transition duration-200 shadow-md hover:shadow-lg
                ${
                  loading ? "bg-gray-400" : "bg-primary hover:bg-primaryhover"
                }`}
            >
              {loading ? "Saving..." : "Save Place"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPlacefrom;
