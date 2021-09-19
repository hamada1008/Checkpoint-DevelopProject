import React, { useEffect } from "react";
import Navbar from "./Navbar";
import ServiceCard from "./ServiceCard";
import Reservation from "./Reservation";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../redux/orderReducer";
const Dashboard = (props) => {
  const orderData = useSelector((state) => state.orderReducer.orderData);
  const dataChanged = useSelector((state) => state.orderReducer.dataChanged);

  const id = useSelector((state) => state.authR.userData._id);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrders({ type: props.type, id }));
  }, [dataChanged]);
  return (
    <div>
      <Navbar button1="Edit profile" button2="Logout" />
      <div>
        {orderData.map((el) => (
          <Reservation
            key={el.userData._id}
            orderDate={el.userData.orderDate}
            productsPurchased={el.userData.productsPurchased}
            totalPrice={el.userData.totalPrice}
            id={el.userData._id}
            targetData={el.targetData}
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
