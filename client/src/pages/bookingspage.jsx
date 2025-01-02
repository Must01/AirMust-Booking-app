import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PhotoGrid from "../components/photoGrid";
import { differenceInCalendarDays } from "date-fns";
import UserNavPage from "./userpages/usernavpage";
import Spinner from "../components/spinner"; // Add this import

const BookingsPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get("/bookings");
        const foundBooking = response.data.find(
          (booking) => booking._id === id
        );

        if (foundBooking) {
          setBooking(foundBooking);
        } else {
          setError("Booking not found");
        }
      } catch (err) {
        setError("Failed to fetch booking: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="text-center py-12 text-lg font-medium text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="mx-auto flex flex-col grow w-full px-4 sm:px-6 lg:px-8 max-w-7xl">
      <UserNavPage />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Booking Details
        </h1>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              {booking.place.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <span className="text-gray-600 block text-sm">Check-in</span>
                <span className="text-gray-900 font-medium text-lg">
                  {new Date(booking.checkIn).toLocaleDateString()}
                </span>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <span className="text-gray-600 block text-sm">Check-out</span>
                <span className="text-gray-900 font-medium text-lg">
                  {new Date(booking.checkOut).toLocaleDateString()}
                </span>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <span className="text-gray-600 block text-sm">Duration</span>
                <span className="text-gray-900 font-medium text-lg">
                  {differenceInCalendarDays(
                    new Date(booking.checkOut),
                    new Date(booking.checkIn)
                  )}{" "}
                  nights
                </span>
              </div>
              <div className="bg-primary p-4 flex flex-col items-center rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <span className="text-white block text-lg">Total Price</span>
                <span className="text-white font-bold text-2xl">
                  {booking.price} MAD
                </span>
              </div>
            </div>
            <PhotoGrid place={booking.place} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingsPage;
