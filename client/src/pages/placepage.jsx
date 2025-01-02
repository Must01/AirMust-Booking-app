import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/spinner";

// icons :
import { FiMapPin } from "react-icons/fi";
import BookingWidget from "../components/BookingWidget";
import PhotoGrid from "../components/photoGrid";

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }
    const getPlaceById = async () => {
      try {
        const { data } = await axios.get("/place/" + id).then();
        setPlace(data);
      } catch (error) {
        console.log("error getting the place data ", error);
      }
    };
    getPlaceById();
  }, [id]);

  return (
    <>
      {!place ? (
        <div className="flex-grow flex justify-center items-center h-full m-auto">
          <Spinner />
        </div>
      ) : (
        <div className="flex-grow flex gap-6 flex-col w-full h-full mx-auto px-6 lg:px-40 py-8">
          <header className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">{place.title}</h1>
            <div className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <FiMapPin className="w-5 h-5" />
              <a
                className="underline font-medium"
                href={"https://maps.google.com?q=" + place.addresse}
                target="_blank"
                rel="noopener noreferrer"
              >
                {place.addresse}
              </a>
            </div>
          </header>

          <div className="relative">
            <PhotoGrid place={place} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1.75fr_1.25fr] gap-12 mt-4">
            <div className="space-y-6">
              <section className="space-y-3">
                <h2 className="text-xl font-bold">Description</h2>
                <p className="text-gray-600 leading-relaxed">
                  {place.description}
                </p>
              </section>

              <section className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <h3 className="font-bold text-gray-900">Check In</h3>
                    <p className="text-gray-600">{place.checkIn}</p>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-gray-900">Check Out</h3>
                    <p className="text-gray-600">{place.checkOut}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-gray-900">Maximum Guests</h3>
                  <p className="text-gray-600">{place.maxGuests} guests</p>
                </div>
              </section>
            </div>

            <div className="sticky top-8">
              <BookingWidget place={place} />
            </div>
          </div>

          <section className="space-y-3">
            <h2 className="text-xl font-bold">Additional Information</h2>
            <p className="text-gray-600 leading-relaxed">{place.extraInfo}</p>
          </section>
        </div>
      )}
    </>
  );
};

export default PlacePage;
