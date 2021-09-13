import React from 'react'

const SearchForm = ({ match }) => {
    function getLocation() {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }

    function showPosition(position) {
        const msg = "Latitude: " + position.coords.latitude +
            "Longitude: " + position.coords.longitude;
        console.log(msg)
    }

    console.log(match)
    return (
        <div>

            <form className="form">

                <label>service type</label>
                <input
                    value={match.params.servicetype}
                    type="text"
                    placeholder="age"
                    disabled
                />

                <label>Age</label>
                <input
                    type="text"
                    placeholder="age"
                />
                <label>Rating</label>
                <input
                    type="text"
                    placeholder="rating"
                />
                <div>
                    <label>Price</label>
                    <input
                        type="text"
                        placeholder="price min"
                    />
                    <input
                        type="text"
                        placeholder="price max"
                    />
                </div>
                <label>City</label>
                <input
                    type="text"
                    placeholder="city"
                />




                <button>Submit Search</button>

            </form>
            <button onClick={getLocation}> TEST</button>
        </div>
    )
}

export default SearchForm
