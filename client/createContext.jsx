import { createContext, useEffect, useState } from "react";
import axios from "axios";

// create the context that other components will import to read from.
export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    axios
      .get("/profile")
      .then(({ data }) => {
        setUser(data);
        setReady(true);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          // Handle 404 error
          console.log("User not found or not logged in");
        } else {
          console.error(error);
        }
        setReady(true);
      });
  }, []); // run only ones when a component mounts

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
