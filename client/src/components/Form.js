import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginAuth, registerAuth } from "../redux/authReducer";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

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
  const [userIsRegistered, setUserIsRegistered] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push("/parent/dashboard");
    userIsRegistered
      ? dispatch(registerAuth(formData))
      : dispatch(loginAuth(formData));
  };
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
        {userIsRegistered && (
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <input
              value={formData.fullName}
              type="text"
              placeholder="Full Name"
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />
          </div>
        )}
        <input
          value={formData.password}
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
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

        {/* <Link to="/parent/dashboard"> */}
        <button type="submit" onClick={handleSubmit}>
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
