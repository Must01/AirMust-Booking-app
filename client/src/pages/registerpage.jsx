import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault(); // used to not load the page on submit
    try {
      axios.post("/register", {
        email,
        name,
        password,
      });
      alert("User registered successfully, please login ");
    } catch (e) {
      alert("Registration failed, please try again");
    }
  };

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="-mt-10">
        <h1 className="text-4xl text-center p-1 font-semibold">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={handleRegister}>
          <input
            className="border my-2 py-2 px-3 rounded-full w-full"
            type="text"
            placeholder="full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="border my-2 py-2 px-3 rounded-full w-full"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border my-2 py-2 px-3 rounded-full w-full"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-primary text-white py-2 w-full font-bold rounded-full my-2">
            Register
          </button>
          <div className="text-center text-gray-500 py-2">
            Already have an account?{" "}
            <Link to="/login" className="underline text-black">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
