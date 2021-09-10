import React from "react";
import Form from "./components/Form";
import { useState } from "react"


function App() {
  const [userIsRegistered, setUserIsRegistered] = useState(true)
  return (
    <div className="container">
      <Form userIsRegistered={userIsRegistered} />
      <button onClick={() => setUserIsRegistered(!userIsRegistered)}>Toggle</button>
    </div>
  );
}

export default App;
