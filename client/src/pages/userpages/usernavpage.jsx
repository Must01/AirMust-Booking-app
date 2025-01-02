import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaBuildingUser } from "react-icons/fa6";
import { IoList } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

const UserNavPage = () => {
  const { pathname } = useLocation();
  let subpage = pathname.split("/")?.[2];
  if (subpage === undefined) {
    subpage = "profile";
  }
  const linkClasses = (type = null) => {
    let classes = "py-2 px-6 flex items-center gap-2 ";
    // For mobile screens, reduce padding and font size
    classes += "md:py-2 md:px-6 py-1 px-3 text-sm md:text-base ";
    if (type === subpage) {
      classes +=
        "bg-primary text-white rounded-full hover:bg-primaryhover ease-in-out duration-150";
    } else {
      classes +=
        "bg-gray-200 rounded-full hover:bg-gray-300 ease-in-out duration-150";
    }
    return classes;
  };

  return (
    <nav className="flex w-full mb-4 gap-2 justify-center flex-wrap md:flex-nowrap">
      <Link className={linkClasses("profile")} to="/account">
        <FaUserCircle size={16} className="md:w-5 md:h-5" />
        <p className="hidden sm:block">My Profile</p>
      </Link>
      <Link className={linkClasses("places")} to="/account/places">
        <FaBuildingUser size={16} className="md:w-5 md:h-5" />
        <p className="hidden sm:block">My Places</p>
      </Link>
      <Link className={linkClasses("bookings")} to="/account/bookings">
        <IoList size={16} className="md:w-5 md:h-5" />
        <p className="hidden sm:block">My Bookings</p>
      </Link>
    </nav>
  );
};

export default UserNavPage;
