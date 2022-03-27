import { createContext, useState, useEffect } from "react";
import axios from "axios";

// create context
export const userContext = createContext();

// create context component wrapper
export default function UserProvider(props) {
  const [user, setUser] = useState({});

  useEffect(() => {
    document.cookie = "user_id=1";
    const userId = document.cookie
      .split("; ")
      .find((row) => row.startsWith("user_id="))
      .split("=")[1];
    console.log(typeof userId);
    return axios.get(`/api/users/${userId}`).then((res) => {
      console.log(res.data);
      setUser(res.data[0]);
    });
  }, []);

  const userData = { user, setUser };

  return (
    <userContext.Provider value={userData}>
      {props.children}
    </userContext.Provider>
  );
}
