import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../../createContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/login", { email, password });
      setUser(response.data);
      alert("Login Successful");
      setRedirect(true);
    } catch {
      alert("Login Failed");
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="-mt-10">
        <h1 className="text-4xl text-center p-1 font-semibold">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLogin}>
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
            Login
          </button>
          <div className="text-center text-gray-500 py-2">
            Don't have an account yet?{" "}
            <Link to="/register" className="underline text-black">
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
