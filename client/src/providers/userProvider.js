import { createContext, useState } from "react";

// create context
export const userContext = createContext();

// create context component wrapper
export default function UserProvider(props) {
  const [user, setUser] = useState(null);

  const userData = { user, setUser };

  return (
    <userContext.Provider value={userData}>
      {props.children}
    </userContext.Provider>
  );
}
