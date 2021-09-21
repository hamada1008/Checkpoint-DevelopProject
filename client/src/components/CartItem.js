import React, { useState, useEffect } from "react";

const CartItem = (props) => {
  const [qty, setQty] = useState(1);
  const handlechange = (e) => {
    e.preventDefault()
    setQty(e.target.value);
    if (qty < 1) { setQty(1) }
  };
  const removeItem = () => {
    let newShoppingItems = props.currentShoppingItems.filter(el => el.id !== props.id)
    props.setCurrentShoppingItems(newShoppingItems)
  }

  useEffect(() => {
    let newShoppingItems = props.currentShoppingItems.map((el) => {
      if (el.id === props.id) {
        return { ...el, totalPrice: (el.price * qty) }
      }
      else {
        return el
      }
    })
    props.setCurrentShoppingItems(newShoppingItems)
  }, [qty])

  return (
    <div key={props.key}>
      <input value={qty} onChange={handlechange} min={1} type="number" />
      <p>{props.title}</p>
      <p>${props.totalPrice}</p>
      <button onClick={removeItem}> x remove </button>
    </div>
  );
};


export default CartItem;
