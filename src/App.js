import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUp from "./routes/SignUp";
import SignIn from "./routes/SignIn";
import MyIdeas from "./routes/MyIdeas";

export default function App() {
  return (
    <Router>
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/sign-up">
          <SignUp />
        </Route>
        <Route path="/sign-in">
          <SignIn />
        </Route>
        <Route path="/">
          <MyIdeas />
        </Route>
      </Switch>
    </Router>
  );
}
