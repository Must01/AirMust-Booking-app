import React, { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../createContext";

const BookingWidget = ({ place }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberGuests, setNumberGuests] = useState(1);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [redirect, setRedirect] = useState("");

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  const handleBookingPlace = async () => {
    try {
      const res = await axios.post("/bookings", {
        place: place._id,
        name,
        mobile,
        checkIn,
        checkOut,
        numberGuests,
        price: numberOfNights * place.price,
      });
      const BookingId = res.data._id;
      setRedirect(`/account/bookings/${BookingId}`);
    } catch (error) {
      console.log("error booking this place : " + error);
    }
  };

  let numberOfNights = 1;
  if ((checkIn, checkOut)) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  const inputClassName =
    "w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 text-gray-700";
  const labelClassName = "block text-sm font-medium text-gray-600 mb-1";

  return (
    <div className="bg-white shadow-2xl px-4 py-2 rounded-xl text-center space-y-1 hover:shadow-3xl transition-shadow duration-300">
      <div className="border-b pb-1 rounded-xl">
        <p className="text-2xl text-gray-800 font-bold">
          <span className="text-primary text-xl">{place.price} MAD</span>
          <span className="text-gray-500 text-lg"> / night</span>
        </p>
      </div>

      <div className="pb-2 space-y-1">
        <div>
          <label className="font-bold text-lg text-gray-700 mb-1 block">
            Your Stay Details
          </label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className={labelClassName}>Check in</label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className={inputClassName}
              />
            </div>
            <div>
              <label className={labelClassName}>Check out</label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className={inputClassName}
              />
            </div>
          </div>
        </div>

        <div>
          <label className={labelClassName}>Number of guests</label>
          <input
            type="number"
            min="1"
            value={numberGuests}
            onChange={(e) => setNumberGuests(e.target.value)}
            max={place.maxGuests}
            className={inputClassName}
          />
        </div>

        {checkIn && checkOut && (
          <div className="space-y-1">
            <div>
              <label className={labelClassName}>Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClassName}
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className={labelClassName}>Mobile</label>
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className={inputClassName}
                placeholder="Enter your phone number"
              />
            </div>
          </div>
        )}
      </div>

      <button
        onClick={handleBookingPlace}
        className="bg-primary w-full shadow-lg mb-4 hover:bg-primaryhover text-white py-2 rounded-xl text-lg font-bold transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl"
      >
        Book this place
      </button>

      {numberOfNights > 0 && (
        <div className="mt-2 bg-gray-50 p-2 rounded-2xl space-y-1">
          <div className="flex justify-between items-center">
            <p className="text-gray-600 font-medium">Nights</p>
            <span className="text-lg font-bold text-gray-800">
              {numberOfNights}
            </span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-gray-200">
            <p className="text-gray-600 font-medium">Total Price</p>
            <span className="text-2xl font-bold text-primary">
              {numberOfNights * place.price} MAD
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingWidget;
