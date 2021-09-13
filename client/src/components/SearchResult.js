
import React, { useState, useEffect } from "react";
import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
    Marker,
    InfoWindow
} from "react-google-maps";
import testData from '../Data/testMap'
import { } from "dotenv/config";

const Map = () => {
    const [selectedNanny, setSelectedNanny] = useState(null);

    useEffect(() => {
        const listener = e => {
            if (e.key === "Escape") {
                setSelectedNanny(null);
            }
        };
        window.addEventListener("keydown", listener);

        return () => {
            window.removeEventListener("keydown", listener);
        };
    }, []);
    return (
        <GoogleMap
            defaultZoom={15}
            defaultCenter={{ lat: 36.457526, lng: 10.778335 }} >
            {testData.map(el => (
                <Marker
                    key={el.id}
                    position={{
                        lng: el.lat,
                        lat: el.lon
                    }}
                    onClick={(e) => {
                        setSelectedNanny(el);
                    }}

                />
            ))}
            {selectedNanny && (
                <InfoWindow
                    onCloseClick={() => {

                        setSelectedNanny(null);
                    }}
                    position={{
                        lat: selectedNanny.lon,
                        lng: selectedNanny.lat
                    }}
                >
                    <div>
                        <h2>{selectedNanny.id}</h2>
                        <p>world!</p>
                    </div>

                </InfoWindow>
            )}
        </GoogleMap>
    )
};
const MapWrapped = withScriptjs(withGoogleMap(Map));
export default function SearchResult() {
    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <MapWrapped
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
    );
}


