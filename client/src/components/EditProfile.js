import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import { editProfile, getEditedProfileData } from "../redux/editProfileReducer";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64"
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
  function showPosition(position) {

    setFormData({ ...formData, lng: position.coords.longitude, lat: position.coords.latitude })

  };

  function getLocation(e) {
    e.preventDefault()
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }



  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.fullName) {
      setErrorMessage({ errorfullName: "Please enter a valide Name" });
    } else if (!formData.phone) {
      setErrorMessage({ errorPhone: "Please enter a valide Phone Number" });
    } else if (
      (formData.rating < 0 && formData.Rating > 5)
    ) {
      setErrorMessage({ errorRating: "Rating must be between 0 and 5" });
    } else if (!Number(formData.age)) {
      setErrorMessage({ errorAge: "Please enter a valid age" });
    } else if (
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
  // useEffect(() => {
  //   dispatch(getEditedProfileData({ id: userData._id, type: userData.type }));
  // }, []);
  useEffect(() => {
    setFormData(userDataAfterUpdate);
  }, [userDataAfterUpdate]);
  useEffect(() => {
    formData.lng && axios.get(`https://eu1.locationiq.com/v1/reverse.php?key=pk.4a75d679e443c41d0a8b09ba9eed7274&lat=${formData.lat}&lon=${formData.lng}&format=json`)
      .then(result => {
        setFormData({ ...formData, city: result.data.address.city || result.data.address.town || result.data.display_name })
      }
      )
      .catch(err => console.log(err))
  }, [formData?.lat])

  const handleCityChange = (e) => {
    if (e.target.value !== "selectCity") {
      const { lng, lat, ...rest } = formData
      setFormData(rest)

    }
  }



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
              placeholder="Your Pricing"
              value={formData.pricing}
              onChange={(e) =>
                setFormData({ ...formData, pricing: e.target.value })
              }
            />
          )}
        </div>
        {type === "nanny" && (
          <div>
            <label>profilePicture</label>

            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) => setFormData({ ...formData, image: base64 })}
            />
          </div>
        )}
        <div>
          <label>City</label>




          {/*  */}
          {type === "parent" ?
            <select name="cityDropdown" onChange={handleCityChange}>
              <option value="selectCity">Select a City</option>
              formData.city&&  <option value={formData.city}>Your current city is: <strong>{formData.city}</strong></option>
              <option value="nabeul">Nabeul</option>
              <option value="beni khiar" >Béni Khiar</option>
              <option value="Korba">Korba</option>
              <option value="Maamoura">Maamoura</option>
              <option value="Dar Chaaban">Dar Chaaban</option>


            </select> :
            <input
              type="text"
              placeholder="city"
              value={formData.city}
              disabled={true}
            />}

          {errorMessage.errorCity && <p>{errorMessage.errorCity}</p>}
          <button onClick={getLocation}> Update city automatically</button>

        </div>

        <button onClick={handleSave}>Save Changes</button>
      </form >
    </div >
  );
};

export default EditProfile;