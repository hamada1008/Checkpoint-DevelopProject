import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import { editProfile, getEditedProfileData } from "../redux/editProfileReducer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios"

const EditProfile = () => {
  const dispatch = useDispatch();

  const userDataAfterUpdate = useSelector(
    (state) => state.editProfileReducer.userDataAfterUpdate
  );
  const userData = useSelector((state) => state.authR.userData);
  const type = userData.type

  const history = useHistory();
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState({
  });

  function getLocation(e) {
    e.preventDefault()
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  function showPosition(position) {
    setFormData({ ...formData, lng: position.coords.longitude, lat: position.coords.latitude })

  };


  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.fullName) {
      setErrorMessage({ errorfullName: "Please enter a valide Name" });
    } else if (!formData.phone) {
      setErrorMessage({ errorPhone: "Please enter a valide Phone Number" });
    } else if (
      !formData.rating ||
      (formData.rating < 0 && formData.Rating > 5)
    ) {
      setErrorMessage({ errorRating: "Rating must be between 0 and 5" });
    } else if (!Number(formData.age)) {
      setErrorMessage({ errorAge: "Please enter a valid age" });
    } else if (
      !formData.priceMin ||
      (formData.priceMin < 0 && formData.priceMin > formData.priceMax)
    ) {
      setErrorMessage({ errorPrice: "please entre a valid Price" });
    } else {
      dispatch(
        editProfile({ id: userData._id, type: userData.type, formData })
      );
      history.push(`/${type}/dashboard`);
    }
  };
  // const [dataLoaded, setDataLoaded] = useState(false);
  useEffect(() => {
    dispatch(getEditedProfileData({ id: userData._id, type: userData.type }));
  }, []);
  useEffect(() => {
    setFormData(userDataAfterUpdate);
  }, [userDataAfterUpdate]);
  useEffect(() => {
    console.log(formData)
    formData.lng && axios.get(`https://eu1.locationiq.com/v1/reverse.php?key=pk.4a75d679e443c41d0a8b09ba9eed7274&lat=${formData.lat}&lon=${formData.lng}&format=json`)
      .then(data => {

        setFormData({ ...formData, city: data.data.display_name })
      }
      )
      .catch(err => console.log(err))
  }, [formData.lat])

  // console.log("userDataBefore", userDataAfterUpdate);

  // console.log("userDataAfter", userDataAfterUpdate);

  return (
    <div>
      <Navbar button1="Edit profile" button2="Logout" />

      <form className="form">
        <label>fullName</label>
        <input
          type="text"
          // value={formData.fullName}
          value={formData.fullName}
          onChange={(e) =>
            setFormData({ ...formData, fullName: e.target.value })
          }
          placeholder={formData.fullName}
        />
        {errorMessage.errorfullName && <p>{errorMessage.errorfullName}</p>}
        <br />
        <label>Phone Number</label>
        <input
          type="text"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        {errorMessage.errorPhone && <p>{errorMessage.errorPhone}</p>}
        {type === "parent" && <p>defaultSearchSettings</p>}
        <br />
        {type === "parent" && (
          <div>
            <label>Rating {">"}</label>
            <input
              type="text"
              placeholder="Minimum Rating"
              value={formData.rating}
              onChange={(e) =>
                setFormData({ ...formData, rating: e.target.value })
              }
            />
            {errorMessage.errorRating && <p>{errorMessage.errorRating}</p>}
          </div>
        )}
        <br />
        <label>Age</label>
        <input
          type="text"
          placeholder="age"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
        />
        {errorMessage.errorAge && <p>{errorMessage.errorAge}</p>}

        <div>
          <label>Price</label>
          {type === "parent" ? (
            <div>
              <input
                type="text"
                placeholder="price min"
                value={formData.priceMin}
                onChange={(e) =>
                  setFormData({ ...formData, priceMin: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="price max"
                value={formData.priceMax}
                onChange={(e) =>
                  setFormData({ ...formData, priceMax: e.target.value })
                }
              />
              {errorMessage.errorPrice && <p>{errorMessage.errorPrice}</p>}
            </div>
          ) : (
            <input
              type="text"
              placeholder="price"
              value={formData.nannyPrice}
              onChange={(e) =>
                setFormData({ ...formData, nannyPrice: e.target.value })
              }
            />
          )}
        </div>
        {type === "nanny" && (
          <div>
            <label>profilePicture</label>
            <input
              type="text"
              placeholder="profile picture link"
              value={formData.profilePicture}
              onChange={(e) =>
                setFormData({ ...formData, profilePicture: e.target.value })
              }
            />
          </div>
        )}
        {type === "parent" ? (
          <div>
            <label>City</label>
            <input
              type="text"
              placeholder="city"
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
            />
            {errorMessage.errorCity && <p>{errorMessage.errorCity}</p>}
            <button onClick={getLocation}> Update city automatically</button>

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
