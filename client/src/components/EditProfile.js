import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import { editProfile } from "../redux/editProfileReducer";
import { useDispatch, useSelector } from "react-redux";

const EditProfile = () => {
  const history = useHistory();
  //   const type = user.type;
  const type = "parent";


  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    rating: '',
    age: '',
    priceMin: '',
    priceMax: '',
    nannyPrice: '',
    profilePicture: '',
    city: ''
  });

  const [errorMessage, setErrorMessage] = useState({
    errorUsername: '',
    errorEmail: '',
    errorPassword: '',
    errorLogin: ''
  })

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  function showPosition(position) {
    const msg =
      "Latitude: " +
      position.coords.latitude +
      "Longitude: " +
      position.coords.longitude;
    history.push("/parent/search/results");
  };
  const userData = useSelector(state => state.authR.userData);
  const dispatch = useDispatch()
  const handleSave = (e) => {
    e.preventDefault()
    dispatch(editProfile({ id: userData._id, type: userData.type, formData }))

  };
  return (
    <div>
      <Navbar button1="Edit profile" button2="Logout" />

      <form className="form">
        <label>fullName</label>
        <input type="text" value={formData.fullName} onChange={(e) => setFormData({ fullName: e.target.value })} />
        <br />
        <label>Phone Number</label>
        <input type="text" value={formData.phone} onChange={(e) => setFormData({ phone: e.target.value })} />
        {type === "parent" && <p>defaultSearchSettings</p>}
        <br />
        {type === "parent" && (
          <div>
            <label>Rating {">"}</label>
            <input type="text" placeholder="Minimum Rating" value={formData.rating} onChange={(e) => setFormData({ rating: e.target.value })} />
          </div>
        )}
        <br />
        <label>Age</label>
        <input type="text" placeholder="age" value={formData.age} onChange={(e) => setFormData({ age: e.target.value })} />
        <div>
          <label>Price</label>
          {type === "parent" ? (
            <div>
              <input type="text" placeholder="price min" value={formData.priceMin} onChange={(e) => setFormData({ priceMin: e.target.value })} />
              <input type="text" placeholder="price max" value={formData.priceMax} onChange={(e) => setFormData({ priceMax: e.target.value })} />
            </div>
          ) : (
            <input type="text" placeholder="price" value={formData.nannyPrice} onChange={(e) => setFormData({ nannyPrice: e.target.value })} />
          )}
        </div>
        {type === "nanny" && (
          <div>
            <label>profilePicture</label>
            <input type="text" placeholder="profile picture link" value={formData.profilePicture} onChange={(e) => setFormData({ profilePicture: e.target.value })} />
          </div>
        )}
        {type === "parent" ? (
          <div>
            <label>City</label>
            <input type="text" placeholder="city" value={formData.city} onChange={(e) => setFormData({ city: e.target.value })} />
          </div>
        ) : (
          <button> Update city automatically</button>
        )}
        <button onClick={handleSave} >Save Changes</button>
      </form>
    </div>
  );

};

export default EditProfile;
