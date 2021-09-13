import React from "react";
import Navbar from "./Navbar";

const welcomeScreen = () => {
  return (
    <div>
      <Navbar button1="Our services" button2="About Us" />
      <div>
        <h1>Welcome to My Best Nanny</h1>
        <p>
          Where we find you the best people to take care of your dear children
        </p>
      </div>
    </div>
  );
};

export default welcomeScreen;
