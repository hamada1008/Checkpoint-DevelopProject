import React from "react";
import { useDispatch } from "react-redux";
import { deleteOrder } from "../redux/orderReducer";

const Reservation = (props) => {
  const dispatch = useDispatch();

  const deleteOrderHandler = () => {
    const _id = props.id;
    dispatch(deleteOrder({ _id }));
  };
  return (
    <div>
      <button onClick={deleteOrderHandler}> CANCEL THIS ORDER</button>
      <ul>
        <li>orderDate: {props.orderDate}</li>
        <li>Nanny's name : {props.targetData.fullName}</li>
        <li>Nanny's city : {props.targetData.city}</li>
        <li>
          purshasedProducts :{" "}
          {props.productsPurchased.map((el) => (
            <p key={Math.random()}>{el}</p>
          ))}
        </li>
        <li>totalPrice: {props.totalPrice}</li>
      </ul>
    </div>
  );
};

export default Reservation;
