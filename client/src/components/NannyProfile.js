import React from "react";
import { useHistory } from "react-router";
import Navbar from "./Navbar";
import shoppingItems from "../Data/shoppingItems";
import ShoppingCart from "./ShoppingCart";
import { createOrder } from "../redux/orderReducer";
import { useDispatch, useSelector } from "react-redux";

const NannyProfile = (match) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.authR.userData);
  const handleOrder = () => {
    // const nanny_id = match.match.params.nanny_id;
    // CALENDAR API for date
    dispatch(
      createOrder({
        parent_id: userData._id,
        nanny_id: "6144aa59b70fb0358f054aac",
        orderDate: new Date(),
        productsPurchased: ["pucifier", "lollipop"],
        totalPrice: 2001,
      })
    );

    history.replace("/parent/dashboard");
  };

  //   handleCart = () => {
  //onclick opens offcanvas  of shopping cart list
  // CALENDAR API
  //   };

  return (
    <div>
      <Navbar button1="Edit profile" button2="Logout" />
      <h2>nanny name</h2>
      <p>nanny city</p>
      <img src="" alt="Nanny portrait" />
      <p> "starcompoentn" rating</p>
      <p>nanny price</p>
      <p>age</p>
      <ul>
        <li>shift day [8 to 17]</li>
        <li>shift week days</li>
      </ul>
      <p>phoneNumber</p>
      <button>Browse our wares</button>
      <h4> Order by phone</h4> <span>call us at Nanny phone</span>
      <button onClick={handleOrder}>Place an order</button>
      <h2>Shopping Cart</h2>
      {shoppingItems.map((el) => (
        <ShoppingCart key={el.id} title={el.title} price={el.price} />
      ))}
    </div>
  );
};

export default NannyProfile;
