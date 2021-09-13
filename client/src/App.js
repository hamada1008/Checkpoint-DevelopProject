import React from "react";
import Form from "./components/Form";
import { useState } from "react";
import { useSelector } from "react-redux";
import WelcomeScreen from "./components/WelcomeScreen";

function App() {
  const { isAuth } = useSelector((state) => state.authR);

  const [userIsRegistered, setUserIsRegistered] = useState(false);
  return (
    <div className="container">
      <WelcomeScreen />
      <Form userIsRegistered={userIsRegistered} />
      <button onClick={() => setUserIsRegistered(!userIsRegistered)}>
        {userIsRegistered
          ? "Already have an account?"
          : "New to our website? Create a new account"}
      </button>
      {/* <p>{isAuth ? "you are authenticated" : "you are not authenticated"}</p> */}
    </div>
  );
}

export default App;
