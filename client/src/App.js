import React from "react";
import Form from "./components/Form";
import WelcomeScreen from "./components/WelcomeScreen";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import SearchForm from "./components/SearchForm";
import SearchResult from "./components/SearchResult";
import NannyProfile from "./components/NannyProfile";
import EditProfile from "./components/EditProfile";

function App() {
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
          <Route path="/nanny/profile/:nanny_id" component={NannyProfile} />
          <Route path="/profile" component={EditProfile} />
        </Switch>
      }
    </div>
  );
}

export default App;
