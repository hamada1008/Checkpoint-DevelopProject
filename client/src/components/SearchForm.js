import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import editProfileReducer from "../redux/editProfileReducer";
import { useDispatch } from "react-redux";
import { searchNannies } from "../redux/searchReducer";


const SearchForm = ({ match }) => {
  const history = useHistory();


  const userDataAfterUpdate = useSelector(
    (state) => state.editProfileReducer.userDataAfterUpdate
  );
  const dispatch = useDispatch()
  const [formData, setFormData] = useState(userDataAfterUpdate);
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    if (
      (formData.rating < 0 && formData.Rating > 5)
    ) {
      setErrorMessage({ errorRating: "Rating must be between 0 and 5" });
    } else if (!Number(formData.age)) {
      setErrorMessage({ errorAge: "Please enter a valid age" });
    } else if (
      formData.priceMin < 0 || formData.priceMin > formData.priceMax
    ) {
      setErrorMessage({ errorPrice: "please entre a valid Price" });
    } else {
      dispatch(searchNannies(formData))
      history.push("/parent/search/results");
    }
  };
  const handleCityChange = (e) => {
    if (e.target.value !== "selectCity") {
      const { lng, lat, ...rest } = formData
      setFormData({ ...rest, city: e.target.value })
    }
  }
  return (
    <div>
      <Navbar button1="Edit profile" button2="Logout" />
      <form className="form">
        <label>service type</label>
        <input
          value={match.params.servicetype}
          type="text"
          placeholder="age"
          disabled
        />
        <br />
        <label>Age</label>
        <input
          type="text"
          placeholder="age"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })} />
        {errorMessage.errorAge && <p>{errorMessage.errorAge}</p>}
        <br />
        <label>Rating</label>
        <input
          type="text"
          placeholder="rating"
          value={formData.rating}
          onChange={(e) => setFormData({ ...formData, rating: e.target.value })} />
        {errorMessage.errorRating && <p>{errorMessage.errorRating}</p>}

        <br />
        <div>
          <label>Price</label>
          <input
            type="text"
            placeholder="price min"
            value={formData.priceMin}
            onChange={(e) => setFormData({ ...formData, priceMin: e.target.value })} />
          <input
            type="text"
            placeholder="price max"
            value={formData.priceMax}
            onChange={(e) => setFormData({ ...formData, priceMax: e.target.value })} />
          {errorMessage.errorPrice && <p>{errorMessage.errorPrice}</p>}

        </div>
        <br />


        <select name="cityDropdown" onChange={handleCityChange}>
          {/* <option value="selectCity">Select a City</option> */}
          <option value={formData.city}>{formData.city}</option>
          <option value="Nabeul">Nabeul</option>
          <option value="Béni khiar" >Béni Khiar</option>
          <option value="Korba">Korba</option>
          <option value="Maamoura">Maamoura</option>
          <option value="Tunis">Tunis</option>


        </select>
        <br />
        <button onClick={handleSubmitSearch}>Submit Search</button>
      </form>

    </div>
  );
};

export default SearchForm;
