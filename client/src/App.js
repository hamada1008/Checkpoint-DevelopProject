import React from "react";
import Form from "./components/Form";
import { useState } from "react"
import { useSelector } from "react-redux"


function App() {

  const { isAuth } = useSelector(state => state.authR)


  const [userIsRegistered, setUserIsRegistered] = useState(false)
  return (
    <div className="container">
      <Form userIsRegistered={userIsRegistered} />
      <button onClick={() => setUserIsRegistered(!userIsRegistered)}>Toggle</button>
      <p>{isAuth ? "you are authenticated" : "you are not authenticated"}</p>
    </div>
  );
}

export default App;
