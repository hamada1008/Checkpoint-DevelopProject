import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getAuth, registerAuth } from "../redux/authReducer";

function Form(props) {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [userFullname, setUserFullName] = useState("");

  const handleUser = (e) => {
    setUsername(e.target.value);
  };
  const handlePass = (e) => {
    setPassword(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleUserFullname = (e) => {
    setUserFullName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.userIsRegistered
      ? dispatch(registerAuth({ username, password, type: "parent", email }))
      : dispatch(getAuth({ username, password, type: "parent" }));
  };

  return (
    <form className="form">
      <input
        type="email"
        placeholder="Enter your email"
        onChange={handleEmail}
      />

      {props.userIsRegistered && (
        <div>
          <input
            value={username}
            type="text"
            placeholder="Username"
            onChange={handleUser}
          />
          <input
            value={userFullname}
            type="text"
            placeholder="Full Name"
            onChange={handleUserFullname}
          />
        </div>
      )}
      <input
        value={password}
        type="password"
        placeholder="Password"
        onChange={handlePass}
      />
      <label>You are ?</label>
      <label htmlFor="Parent">Parent</label>
      <input type="checkbox" name="Parent" />
      <label htmlFor="Nanny">Nanny</label>
      <input type="checkbox" name="Nanny" />
      <button type="submit" onClick={handleSubmit}>
        {props.userIsRegistered ? "Register" : "Login"}
      </button>
    </form>
  );
}

export default Form;
