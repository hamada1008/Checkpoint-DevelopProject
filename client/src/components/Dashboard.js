import React from "react";
import Navbar from "./Navbar";
import ServiceCard from "./ServiceCard";
import Reservation from "./Reservation";

const Dashboard = (props) => {
  return (
    <div>
      <Navbar button1="Edit profile" button2="Logout" />
      <div>
        <Reservation />
      </div>
      {props.type === "parent" ? (
        <div>
          <ServiceCard nannyType="Nanny In" />
          <ServiceCard nannyType="Nanny Out" />
        </div>
      ) : (
        <input type="checkbox" name="nanny" />
      )}
    </div>
  );
};

export default Dashboard;
