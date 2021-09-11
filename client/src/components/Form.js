import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getAuth } from "../redux/authReducer";

function Form(props) {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUser = (e) => {
    setUsername(e.target.value);
  };
  const handlePass = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getAuth({ username, password, type: "parent" }));
  };

  return (
    <form className="form">
      <input
        value={username}
        type="text"
        placeholder="Username"
        onChange={handleUser}
      />
      <input
        value={password}
        type="password"
        placeholder="Password"
        onChange={handlePass}
      />

      {props.userIsRegistered && (
        <input type="password" placeholder="Confirm Password" />
      )}

      <button type="submit" onClick={handleSubmit}>
        {props.userIsRegistered ? "Register" : "Login"}
      </button>
    </form>
  );
}

export default Form;
