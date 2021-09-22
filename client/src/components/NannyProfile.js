import React, { useState } from "react";
import { useHistory } from "react-router";
import Navbar from "./Navbar";
import shoppingItems from "../Data/shoppingItems";
import CartItem from "./CartItem";
import { createOrder } from "../redux/orderReducer";
import { useDispatch, useSelector } from "react-redux";
import { Offcanvas } from "react-bootstrap"
import { current } from "@reduxjs/toolkit";

const NannyProfile = (match) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.authR.userData);
  const searchResultData = useSelector(state => state.searchReducer.searchResultData)
  const { userDataAfterUpdate } = useSelector(state => state.editProfileReducer)

  const selectedNanny = searchResultData.filter(el => el._id === match.match.params.nanny_id)[0]
  const handleOrder = () => {
    // const nanny_id = match.match.params.nanny_id;
    // CALENDAR API for date
    dispatch(
      createOrder({
        parent_id: userData._id,
        nanny_id: match.match.params.nanny_id,
        orderDate: orderDate,
        productsPurchased: currentShoppingItems,
        totalPrice: totalPrice + selectedNanny.pricing,
      })
    );

    history.replace("/parent/dashboard");
  };

  //   handleCart = () => {
  //onclick opens offcanvas  of shopping cart list
  // CALENDAR API
  //   };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true)
    currentShoppingItems.length === 0 && setCurrentShoppingItems(shoppingItems)
  }
  const [currentShoppingItems, setCurrentShoppingItems] = useState([])
  const totalPriceArray = currentShoppingItems.map(el => {
    let sum = 0
    sum += Number(el.totalPrice)
    return sum
  })
  console.log(currentShoppingItems)
  const totalPrice = totalPriceArray.length !== 0 && totalPriceArray.reduce((pv, cv) => pv + cv)
  console.log(totalPrice);
  const date = new Date();
  // const currentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

  const currentDate = date.toLocaleDateString('sv-SE', { day: "2-digit", month: "2-digit", year: "numeric" });
  const [orderDate, setOrderDate] = useState(currentDate);



  return (
    <div>
      <Navbar button1="Edit profile" button2="Logout" />
      <h2>Nanny's name: {selectedNanny.fullName}</h2>
      <p>Nanny's city: {selectedNanny.city}</p>
      <img width="200" height="auto" src={selectedNanny.image} alt={selectedNanny.fullName} />

      {/* <p> Nanny's rating: {selectedNanny.rating}</p> */}
      <p>Nanny's pricing: {selectedNanny.pricing}</p>
      <p>Nanny's age: {selectedNanny.age}</p>

      <button onClick={handleShow}>Browse our wares</button>



      <Offcanvas placement="end" show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart Items</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <p>Total: $ {totalPrice ? totalPrice : 0} </p>
          {currentShoppingItems.map((el) => (
            <CartItem key={el.id} id={el.id}
              title={el.title}
              price={el.price}
              qty={el.qty}
              totalPrice={el.totalPrice}
              currentShoppingItems={currentShoppingItems}
              setCurrentShoppingItems={setCurrentShoppingItems} />
          ))}

        </Offcanvas.Body>
      </Offcanvas>

      <h4> Order by phone</h4> <span>call us at {selectedNanny.phone}</span>
      <br />
      <input type="date" value={orderDate} min={currentDate} max="2023-09-22" onChange={(e) => setOrderDate(e.target.value)} />
      <button onClick={handleOrder}>Place an order</button>
      {/* <p>Your Cart is filled with : {}</p> */}

      {currentShoppingItems.length !== 0 && <div>
        <h2>Shopping Cart</h2>
        <p>totalPrice is : {totalPrice}</p>
        <p>Purchased products are : {currentShoppingItems.map(el =>
          <ul>
            <li><span> {el.qty}</span><span> {el.title}</span><span> ${el.totalPrice}</span></li>
          </ul>
        )}</p>
      </div>}

    </div >
  );
};

export default NannyProfile;
