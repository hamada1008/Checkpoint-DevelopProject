import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginAuth, registerAuth } from "../redux/authReducer";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import validator from 'email-validator';

function Form() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    fullName: "",
    type: "",
  });
  const [userIsRegistered, setUserIsRegistered] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    errorUsername: '',
    errorEmail: '',
    errorPassword: '',
    errorLogin: ''
  })
  //const test = useSelector(state => state.authR.status)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userIsRegistered) {
      if (!validator.validate(formData.email)) {
        setErrorMessage({ errorEmail: 'Verify your Email' })
      } else if (formData.password.length < 4) {
        setErrorMessage({ errorPassword: 'Verify your Password' })
      } else if (formData.username.length === 0) {
        setErrorMessage({ errorUsername: 'Verify your userName' })
      }
      else {
        dispatch(registerAuth(formData))

      }
    } else {
      dispatch(loginAuth(formData));
      setErrorMessage({ errorLogin: 'Verify your data' })

    }
  }
  return (
    <div>
      <form className="form">
        <input
          value={formData.username}
          type="text"
          placeholder="Username"
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
        {errorMessage.errorUsername && <label>{errorMessage.errorUsername}</label>}
        <br />
        {userIsRegistered && (
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {errorMessage.errorEmail && <label>{errorMessage.errorEmail}</label>}
            <br />
            <input
              value={formData.fullName}
              type="text"
              placeholder="Full Name"
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />
          </div>
        )}<br />
        <input
          value={formData.password}
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        {errorMessage.errorPassword && <label>{errorMessage.errorPassword}</label>}

        <br />
        {/* <label>You are ?</label>
        <label htmlFor="Parent">Parent</label>
        <input type="checkbox" name="Parent" />
        <label htmlFor="Nanny">Nanny</label>
        <input type="checkbox" name="Nanny" /> */}
        <input
          type="text"
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          value={formData.type}
          placeholder="type"
        />

        <br />
        {/* <Link to="/parent/dashboard"> */}
        <button type="submit" onClick={handleSubmit}>
          {userIsRegistered ? "Register" : "Login"}
        </button>
        {/* </Link> */}
      </form>
      {errorMessage.errorLogin && <label>{errorMessage.errorLogin}</label>}
      <br />
      <button onClick={() => setUserIsRegistered(!userIsRegistered)}>
        {userIsRegistered
          ? "Already have an account?"
          : "New to our website? Create a new account"}
      </button><br />

    </div>
  );
}

export default Form;

//testing
