import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import testMap from "../Data/testMap";

const SearchResult = () => {
  const mapContainerStyle = {
    height: "100vh",
    width: "100vw",
  };

  const [selectedNanny, setSelectedNanny] = useState(null);
  const [center, setCenter] = useState({ lat: 36.457526, lng: 10.778335 });
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

  return (
    <GoogleMap
      id="map"
      mapContainerStyle={mapContainerStyle}
      zoom={15}
      center={center}
      onClick={() => setSelectedNanny(null)}
    >
      {testMap.map((el) => (
        <Marker
          key={el.id}
          position={{
            lng: el.lat,
            lat: el.lon,
          }}
          onClick={() => {
            setSelectedNanny(el);
            setCenter({ lng: el.lat, lat: el.lon });
          }}
        />
      ))}

      {selectedNanny && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedNanny(null);
          }}
          position={{
            lat: selectedNanny.lon + 0.0015,
            lng: selectedNanny.lat,
          }}
        >
          <div>
            <h3>{selectedNanny.name}</h3>
            <span>${selectedNanny.price}</span>
            <Link to={`/parent/search/results/profile/${selectedNanny.id}`}>
              <p> See Profile</p>
            </Link>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};
export default SearchResult;
