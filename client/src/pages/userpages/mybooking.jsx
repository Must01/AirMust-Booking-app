import React, { useEffect, useState } from "react";
import UserNavPage from "./usernavpage";
import axios from "axios";
import Empty from "../../assets/wallet.png";
import { Link } from "react-router-dom";
import PlaceImg from "../../components/placeImg";
import { differenceInCalendarDays } from "date-fns";

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get("/bookings")
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
        setBookings([]);
      });
  }, []);

  return (
    <div className="mx-auto flex flex-col grow w-full px-4 sm:px-6 lg:px-8 max-w-7xl">
      <UserNavPage />
      <div className="flex flex-col gap-6 my-8">
        {bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-16">
            <img
              src={Empty}
              alt="Empty bookings"
              className="w-32 sm:w-40 pb-6 opacity-80 hover:opacity-100 transition-opacity duration-300"
            />
            <span className="text-lg sm:text-xl text-gray-600 font-light tracking-wide text-center px-4">
              You haven't made any bookings yet.
            </span>
          </div>
        ) : (
          bookings.map((booking) => (
            <Link
              to={`/account/bookings/${booking._id}`}
              key={booking._id}
              className="flex flex-col sm:flex-row gap-5 p-5 bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-200 hover:border-gray-300 transition-all duration-300"
            >
              <div className="w-full sm:w-48 aspect-video sm:aspect-square bg-gray-200 rounded-lg overflow-hidden">
                <PlaceImg place={booking.place} index={0} />
              </div>
              <div className="flex flex-col justify-between py-2 grow">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 hover:text-blue-600 transition-colors">
                  {booking.place.title}
                </h2>
                <div className="flex flex-col gap-4 text-gray-600">
                  <div className="flex items-center gap-4">
                    <div>
                      <span className="font-medium">Check-in:</span>
                      <span className="ml-2">
                        {new Date(booking.checkIn).toLocaleDateString()}
                      </span>
                    </div>
                    <span className="hidden sm:block text-gray-400">|</span>
                    <div>
                      <span className="font-medium">Check-out:</span>
                      <span className="ml-2">
                        {new Date(booking.checkOut).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-gray-700">
                    <span className="font-medium">
                      Duration:{" "}
                      {differenceInCalendarDays(
                        new Date(booking.checkOut),
                        new Date(booking.checkIn)
                      )}{" "}
                      night(s)
                    </span>
                    <span className="text-lg sm:text-xl font-semibold text-gray-900">
                      ${booking.price}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default MyBooking;
