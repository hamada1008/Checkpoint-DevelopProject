import React from "react";
import Navbar from "./Navbar";
import Form from "./Form";
import babysitter from '../img/babysitter1.svg'
import './WelcomeScreen.css'

const welcomeScreen = () => {
  return (
    <div className="container_navbar_form">
      <Navbar button1="Our services" button2="About Us" />
      <div className="Welcoming_and_image">
        <div className="Welcome_container">
          <div className="Welcome_text">
            <h1 className="welcoming">Welcome to My Best Nanny</h1>
            <p>
              My Best Nanny, aims to connect parents with babysitters and social and/or school assistants, qualified, competent and chosen according to several criteria.
            </p>
          </div>
          <div className="form">
            <Form />
          </div>

        </div>
        <img className="babySitter_image" src={babysitter} alt="baby Sitter" />
      </div>
    </div>
  );
};

export default welcomeScreen;
