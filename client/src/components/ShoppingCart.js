import React, { useState } from "react";

const ShoppingCart = (props) => {
  const [qty, setQty] = useState(1);
  const handlechange = (e) => {
    setQty(e.target.value);
  };
  return (
    <div key={props.key}>
      <input value={qty} onChange={handlechange} type="number" />
      <p>{props.title}</p>
      <p>${props.price}</p>
      <button> x icon remove </button>
    </div>
  );
};

export default ShoppingCart;
