import React, { useEffect } from "react";
import Form from "./components/Form";
import WelcomeScreen from "./components/WelcomeScreen";
import { Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import SearchForm from "./components/SearchForm";
import SearchResult from "./components/SearchResult";
import NannyProfile from "./components/NannyProfile";
import EditProfile from "./components/EditProfile";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "./redux/authReducer";

function App() {
  const token = useSelector((state) => state.authR.token);
  const userData = useSelector((state) => state.authR.userData);
  const isLoading = useSelector((state) => state.authR.status);

  const dispatch = useDispatch();
  //useeffect = blocking call

  useEffect(() => {
    const token = localStorage.getItem("token");
    dispatch(getToken({ token }));
    console.log("dispatch done");
  }, [token]);

  console.log(isLoading);
  return (
    <div className="container">
      <Switch>
        <Route exact path="/">
          <WelcomeScreen />
          <Form />
        </Route>
        {userData?.type === "parent" ? (
          <>
            <Route path="/parent/dashboard">
              <Dashboard type="parent" />
            </Route>

            <Route path="/parent/search/results" component={SearchResult} />
            <Route path="/parent/search/:servicetype" component={SearchForm} />
            <Route
              path="/parent/search/results/profile/:nanny_id"
              component={NannyProfile}
            />
          </>
        ) : (
          <Redirect to="/" />
        )}

        {isLoading !== "loading" ? (
          userData?.type === "nanny" ? (
            <>
              <Route path="/nanny/dashboard">
                <Dashboard type="nanny" />
              </Route>
            </>
          ) : (
            <Redirect to="/" />
          )
        ) : null}

        {userData ? (
          <Route path="/profile" component={EditProfile} />
        ) : (
          <Redirect to="/" />
        )}
      </Switch>
    </div>
  );
}

export default App;
