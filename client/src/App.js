import React from "react";
import Cards from "./components/Cards";
import RegistrationForm from "./components/RegistrationForm";
import Profile from "./components/Profile";
import Header from "./components/Header";
import Chats from "./components/Chats";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// contexts
import UserProvider from "./providers/userProvider";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Router>
          <Header />
          <Switch>
            <Route path="/chat">
              <Chats />
            </Route>

            <Route path="/profile">
              <Profile />
            </Route>

            <Route path="/register">
              <RegistrationForm />
            </Route>

            <Route path="/">
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
