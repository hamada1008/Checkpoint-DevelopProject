import React, { useEffect } from "react";
import Form from "./components/Form";
import WelcomeScreen from "./components/WelcomeScreen";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import SearchForm from "./components/SearchForm";
import SearchResult from "./components/SearchResult";
import NannyProfile from "./components/NannyProfile";
import EditProfile from "./components/EditProfile";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "./redux/authReducer";

function App() {
  const history = useHistory();
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
  const localToken = localStorage.getItem("token");
  const redirectDashboard = () => {
    history.push(`/${userData?.type}/dashboard`);
  };
  const redirectHome = () => {
    history.push("/");
  };
  console.log(userData);
  if (isLoading === "loading") return <h1>LOADING</h1>;
  // maybe add if userData exists with loading
  else
    return (
      <Switch>
        {userData?.type ? (
          redirectDashboard()
        ) : (
          <Route exact path="/">
            <WelcomeScreen />
            <Form />
          </Route>
        )}

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
            <Route path="/profile" component={EditProfile} />
          </>
        ) : (
          redirectDashboard()
        )}
        {userData?.type === "nanny" ? (
          <>
            <Route path="/nanny/dashboard">
              <Dashboard type="nanny" />
            </Route>
            <Route path="/profile" component={EditProfile} />
          </>
        ) : (
          redirectDashboard()
        )}

        {!localToken && redirectHome()}
      </Switch>
    );
}

export default App;
