import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getAuth, registerAuth } from "../redux/authReducer";
import { useSelector } from "react-redux"
import { Link, useHistory } from 'react-router-dom'

function Form() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [userFullname, setUserFullName] = useState("");
  const { isAuth } = useSelector((state) => state.authR);

  const [userIsRegistered, setUserIsRegistered] = useState(false);

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
    history.push('/parent/dashboard')
    // userIsRegistered
    //   ? dispatch(registerAuth({ username, password, type: "parent", email }))
    //   : dispatch(getAuth({ username, password, type: "parent" }));
  };
  return (
    <div>
      <form className="form">
        <input
          type="email"
          placeholder="Enter your email"
          onChange={handleEmail}
        />

        {userIsRegistered && (
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

        {/* <Link to="/parent/dashboard"> */}
        <button type="submit" onClick={handleSubmit} >
          {userIsRegistered ? "Register" : "Login"}
        </button>
        {/* </Link> */}

      </form>
      <button onClick={() => setUserIsRegistered(!userIsRegistered)}>
        {userIsRegistered
          ? "Already have an account?"
          : "New to our website? Create a new account"}
      </button>
    </div>
  );
}

export default Form;

//testing