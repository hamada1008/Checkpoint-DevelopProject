import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder } from "../redux/orderReducer";

const Reservation = (props) => {
  const dispatch = useDispatch();
  const userType = useSelector(state => state.authR.userData.type)
  const targetType = (userType === 'parent') ? 'Nanny' : 'Parent';


  const deleteOrderHandler = () => {
    const _id = props.id;
    dispatch(deleteOrder({ _id }));
  };
  return (
    <div>
      <button onClick={deleteOrderHandler}> CANCEL THIS ORDER</button>
      <ul>
        <li>orderDate: {props.orderDate.substring(0, 10)}</li>
        <li>{`${targetType}'s name`} : {props.targetData.fullName}</li>
        <li>{`${targetType}'s city`} : {props.targetData.city}</li>
        {
          props.productsPurchased.length !== 0 && <li>
            purshasedProducts :
            {props.productsPurchased.map((el) => (
              <p key={el.id}>{el.title}</p>
            ))}
          </li>
        }
        <li>totalPrice: {props.totalPrice}</li>
      </ul>
    </div>
  );
};

export default Reservation;
