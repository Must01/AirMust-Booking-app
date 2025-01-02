// react router
import { Route, Routes } from "react-router-dom";

// css file
import "./App.css";

// components
import NavBar from "./components/navbar.jsx";
import HomePage from "./pages/homepage.jsx";
import LoginPage from "./pages/loginpage.jsx";
import RegisterPage from "./pages/registerpage.jsx";
import axios from "axios";
import { UserContextProvider } from "../createContext.jsx";
import BookingsPage from "./pages/bookingspage.jsx";
import MyPlaces from "./pages/userpages/myplaces.jsx";
import MyBooking from "./pages/userpages/mybooking.jsx";
import NewPlacefrom from "./pages/userpages/userpagecomponents/newplaceform.jsx";
import PlacePage from "./pages/placepage.jsx";
import MyProfile from "./pages/userpages/myprofile.jsx";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <div className=" min-h-screen  flex flex-col">
        <div className="p-4">
          <NavBar className="" />
        </div>
        <div className="bg-gray-50 p-4 flex flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route path="/account" element={<MyProfile />}></Route>
            <Route path="/account/places" element={<MyPlaces />}></Route>
            <Route path="/account/bookings" element={<MyBooking />}></Route>
            <Route
              path="/account/places/new"
              element={<NewPlacefrom />}
            ></Route>
            <Route
              path="/account/places/:id"
              element={<NewPlacefrom />}
            ></Route>
            <Route path="/place/:id" element={<PlacePage />}></Route>
            <Route path="/account/bookings/" element={<MyBooking />}></Route>
            <Route
              path="/account/bookings/:id"
              element={<BookingsPage />}
            ></Route>
          </Routes>
        </div>
      </div>
    </UserContextProvider>
  );
}

export default App;
