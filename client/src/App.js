import React from "react";
import Form from "./components/Form";
import WelcomeScreen from "./components/WelcomeScreen";
import { Route, Switch } from 'react-router-dom';
import Dashboard from "./components/Dashboard";
import SearchForm from "./components/SearchForm";
import SearchResult from "./components/SearchResult";

function App() {

  return (
    <div className="container">
      <Switch>
        <Route exact path="/">
          <WelcomeScreen />
          <Form />
        </Route>

        <Route path='/parent/dashboard'>
          <Dashboard />
        </Route>

        <Route path='/parent/search/:servicetype' component={SearchForm} />

        <Route path="/search/result" component={SearchResult} />
      </Switch>



    </div>
  );
}

export default App;
