import React from "react";
import {io} from "socket.io-client"
import Cards from "./components/Cards";
import RegistrationForm from "./components/RegistrationForm";
import Profile from "./components/Profile";
import Header from "./components/Header";
import Chats from "./components/Chats";
import UserProvider from "./providers/UserProvider";
import Messages from "./components/Messages";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


function App() {
  
  return (
    <div className="App">
    <UserProvider>
      <Router>
        {/* <Header /> */}
        <Switch>
          <Route path="/chat/:person">
            <Header />
            <Messages />
          </Route>
          <Route path="/chat">
            <Header />
            <Chats />
          </Route>
          <Route path="/profile">
            <Header />
            <Profile />
          </Route>
          <Route path="/register">
            <RegistrationForm />
          </Route>
          <Route path="/">
            <Header />
            <h1>
              <Cards />
            </h1>
          </Route>
        </Switch>
      </Router>
    </UserProvider>
    </div>
  );
}

export default App;
