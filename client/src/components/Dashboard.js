import React, { useEffect } from "react";
import Navbar from "./Navbar";
import ServiceCard from "./ServiceCard";
import Reservation from "./Reservation";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../redux/orderReducer";
const Dashboard = (props) => {
  const orderData = useSelector((state) => state.orderReducer.orderData);

  const id = useSelector((state) => state.authR.userData._id);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrders({ type: props.type, id }));
  }, []);
  return (
    <div>
      <Navbar button1="Edit profile" button2="Logout" />
      <div>
        {orderData.map((el) => (
          <Reservation
            key={el.id}
            // orderDate={el.orderDate}
            // productsPurchased={el.productsPurchased}
            // totalPrice={el.totalPrice}
            // status={el.status}
            // id={el._id}
          />
        ))}
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
