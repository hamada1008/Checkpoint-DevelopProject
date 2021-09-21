import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useSelector } from "react-redux";
import cityCenters from "../Data/cityCenter";
const SearchResult = () => {

  const mapContainerStyle = {
    height: "100vh",
    width: "100vw",
  };

  const searchResultData = useSelector(state => state.searchReducer.searchResultData)
  const [selectedNanny, setSelectedNanny] = useState(null);
  var defaultCenterState = []
  const [center, setCenter] = useState({ lat: 36.457526, lng: 10.778335 });

  useEffect(() => {
    defaultCenterState = cityCenters.filter(el => el.name === searchResultData[0]?.city)
    console.log("dc", defaultCenterState)
    setCenter({ lat: defaultCenterState[0]?.lat, lng: defaultCenterState[0]?.lng })
  }, [searchResultData])

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedNanny(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);
  if (loadError) return "Error loading maps";
  if (!isLoaded) return "loading maps";
  console.log(searchResultData)
  return (
    <GoogleMap
      id="map"
      mapContainerStyle={mapContainerStyle}
      zoom={11}
      center={center}
      onClick={() => setSelectedNanny(null)}
    >
      {searchResultData.map((el) => (
        <Marker
          key={el._id}
          position={{
            lng: el.lng,
            lat: el.lat,
          }}
          onClick={() => {
            setSelectedNanny(el);
            setCenter({ lng: el.lng, lat: el.lat });
          }}
        />
      ))}

      {selectedNanny && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedNanny(null);
          }}
          position={{
            lat: selectedNanny.lat + 0.0015,
            lng: selectedNanny.lng,
          }}
        >
          <div>
            <h3>{selectedNanny.fullName}</h3>
            <span>${selectedNanny.pricing}</span>
            <Link to={`/parent/search/results/profile/${selectedNanny._id}`}>
              <p> See Profile</p>
            </Link>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};
export default SearchResult;
