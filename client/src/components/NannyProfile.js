import React, { useState } from "react";
import { useHistory } from "react-router";
import Navbar from "./Navbar";
import shoppingItems from "../Data/shoppingItems";
import CartItem from "./CartItem";
import { createOrder } from "../redux/orderReducer";
import { useDispatch, useSelector } from "react-redux";
import { Offcanvas } from "react-bootstrap"

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
  const totalPrice = totalPriceArray.length !== 0 && totalPriceArray.reduce((pv, cv) => pv + cv)
  console.log(totalPrice)

  return (
    <div>
      <Navbar button1="Edit profile" button2="Logout" />
      <h2>Nanny's name: {selectedNanny.fullName}</h2>
      <p>Nanny's city: {selectedNanny.city}</p>
      <img width="200" height="auto" src={selectedNanny.image} alt={selectedNanny.fullName} />
     //starcomponent for Rating
      <p> Nanny's rating: {selectedNanny.rating}</p>
      <p>{selectedNanny.Pricing}</p>
      <p>{selectedNanny.age}</p>
      <ul>
        <li>shift day [8 to 17]</li>
        <li>shift week days</li>
      </ul>
      <p>{selectedNanny.phone}</p>
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
              totalPrice={el.totalPrice}
              currentShoppingItems={currentShoppingItems}
              setCurrentShoppingItems={setCurrentShoppingItems} />
          ))}
        </Offcanvas.Body>
      </Offcanvas>

      <h4> Order by phone</h4> <span>call us at {selectedNanny.phone}</span>
      <button onClick={handleOrder}>Place an order</button>
      <h2>Shopping Cart</h2>

    </div >
  );
};

export default NannyProfile;
