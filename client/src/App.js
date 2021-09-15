import React, { useEffect } from "react";
import Form from "./components/Form";
import WelcomeScreen from "./components/WelcomeScreen";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import SearchForm from "./components/SearchForm";
import SearchResult from "./components/SearchResult";
import NannyProfile from "./components/NannyProfile";
import EditProfile from "./components/EditProfile";
import jwt from "jsonwebtoken";

function App() {
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   console.log(token);
  //   var decoded =jwt.verify(
  //     token,
  //     process.env.REACT_APP_SECRET_ENCRYPTION_KEY
  //   );
  //   console.log(decoded);
  // }, []);

  return (
    <div className="container">
      {
        <Switch>
          <Route exact path="/">
            <WelcomeScreen />
            <Form />
          </Route>

          <Route path="/parent/dashboard">
            <Dashboard type="parent" />
          </Route>
          <Route path="/nanny/dashboard">
            <Dashboard type="nanny" />
          </Route>

          <Route path="/parent/search/results" component={SearchResult} />
          <Route path="/parent/search/:servicetype" component={SearchForm} />
          <Route
            path="/parent/search/results/profile/:nanny_id"
            component={NannyProfile}
          />
          <Route path="/profile" component={EditProfile} />
        </Switch>
      }
    </div>
  );
}

export default App;
