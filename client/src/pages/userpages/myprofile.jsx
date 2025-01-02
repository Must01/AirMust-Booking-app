import React, { useContext } from "react";
import { UserContext } from "../../../createContext";
import { FaUser, FaEnvelope } from "react-icons/fa";
import UserNavPage from "./usernavpage";
import Spinner from "../../components/spinner";
import axios from "axios";
import { Navigate } from "react-router-dom";
const MyProfile = () => {
  const { ready, user, setUser } = useContext(UserContext);

  if (!ready) {
    return <Spinner />;
  }

  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }

  async function logout() {
    await axios.post("/logout");
    setUser(null);
  }

  return (
    <div className="flex flex-col grow">
      <UserNavPage />
      <div className="flex-grow flex flex-col w-full h-full mx-auto">
        <div className="bg-white flex grow flex-col rounded-lg h-full shadow-lg overflow-hidden">
          <div className="relative flex-none h-32 bg-primary">
            <div className="absolute -bottom-12 left-8">
              <div className="w-24 h-24 rounded-full bg-white p-1">
                <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                  <FaUser className="w-12 h-12 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1 mt-16 px-8 pb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
              <div className="flex items-center text-gray-600 mt-1">
                <FaEnvelope className="mr-2" />
                <span>{user.email}</span>
              </div>
            </div>
            <button
              onClick={logout}
              className="w-full bg-primary hover:bg-primaryhover text-white py-3 rounded-lg font-medium transition duration-200 mt-auto"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
