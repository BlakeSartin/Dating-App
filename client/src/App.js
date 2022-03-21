import React from "react";
import Cards from "./Cards";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
            <Route path="/chat">
              <h1>I am the chat page</h1>
                </Route>
                <Route path="/profile">
                  i am the profile page
                  </Route>
                  <Route path="/">
            <h1><Cards /></h1>
            </Route>
        </Switch>
      </Router>
      </div>
  );
}

export default App;
