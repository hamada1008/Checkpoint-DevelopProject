import React from "react";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";

const EditProfile = () => {
  const history = useHistory();
  //   const type = user.type;
  const type = "parent";
  const handleSave = () => {
    //dispatch value to db
    history.goBack();
  };
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
  }

  return (
    <div>
      <Navbar button1="Edit profile" button2="Logout" />

      <form className="form">
        <label>fullName</label>
        <input type="text" />

        <label>Phone Number</label>
        <input type="text" />
        {type === "parent" && <p>defaultSearchSettings</p>}
        {type === "parent" && (
          <div>
            <label>Rating {">"}</label>
            <input type="text" placeholder="Minimum Rating" />
          </div>
        )}
        <label>Age</label>
        <input type="text" placeholder="age" />
        <div>
          <label>Price</label>
          {type === "parent" ? (
            <div>
              <input type="text" placeholder="price min" />
              <input type="text" placeholder="price max" />
            </div>
          ) : (
            <input type="text" placeholder="price" />
          )}
        </div>
        {type === "nanny" && (
          <div>
            <label>profilePicture</label>
            <input type="text" placeholder="profile picture link" />
          </div>
        )}
        {type === "parent" ? (
          <div>
            <label>City</label>
            <input type="text" placeholder="city" />
          </div>
        ) : (
          <button> Update city automatically</button>
        )}
        <button onClick={handleSave}>Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfile;
