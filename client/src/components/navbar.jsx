import React, { useContext } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { UserContext } from "../../createContext";

function Navbar() {
  const { user } = useContext(UserContext);

  const UserAvatar = () => {
    if (!user) {
      return <FaUserCircle size={28} color="#80808099" />;
    }
    return (
      <>
        <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
          <span className="text-white text-xs capitalize">
            {user.name?.[0] || ""}
          </span>
        </div>
        <div className="font-semibold capitalize text-center">{user.name}</div>
      </>
    );
  };

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <Link
          to="/"
          className="flex items-center gap-1 hover:opacity-90 transition-opacity"
        >
          <img src={logo} alt="airMust" className="w-8" />
          <span className="font-bold text-xl">airmust</span>
        </Link>

        {/* Desktop Search bar */}
        <div className="hidden md:flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300 hover:shadow-lg transition-shadow">
          <div className="cursor-pointer">Anywhere</div>
          <div className="border-l border-gray-300"></div>
          <div className="cursor-pointer">Any week</div>
          <div className="border-l border-gray-300"></div>
          <div className="cursor-pointer">Add guests</div>
          <button className="bg-primary hover:bg-primaryhover text-white p-1 rounded-full transition-colors">
            <IoSearchSharp />
          </button>
        </div>

        {/* Mobile search button */}
        <button className="md:hidden w-full border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300 flex items-center justify-between hover:shadow-lg transition-shadow">
          <span>Where to?</span>
          <IoSearchSharp />
        </button>

        {/* User menu */}
        <Link
          to={user ? "/account" : "/login"}
          className="flex items-center gap-2 border border-gray-300 rounded-full py-1 px-3 hover:shadow-md transition-shadow"
        >
          <IoMenu size={24} />
          <UserAvatar />
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
