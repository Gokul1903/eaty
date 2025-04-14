import { useEffect, useContext, useRef, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import HistoryCard from "./Historycard";

const Historylist = () => {
  const { orders, fetchOrder, errmessage } = useContext(GlobalContext);


  useEffect(() => {
    fetchOrder();

    const interval = setInterval(() => {
      fetchOrder();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  
  

  // Unauthorized
  if (errmessage === "Unauthorized" || errmessage === "Invalid Token") {
    return (
      <section className="py-5">
        <div className="container">
          <div className="row">
            <h1 className="text-center">Unauthorized</h1>
          </div>
        </div>
      </section>
    );
  }

  // Loading
  if (orders.length === 0) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <div className="spinner-border logo" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // UI
  return (
    <section className="py-5">
      <div className="container">
        <div className="row">
          {
            orders.map((order) =>
               (
                <div className="col-md-6" key={order._id}>
                  <HistoryCard
                    user={order.userId.name}
                    address={order.Address}
                    totalAmount={order.totalAmount}
                    status={order.status}
                    paymentMethod={order.paymentMethod}
                    items={order.items}
                    id={order._id}
                  />
                </div>
              ) 
            )
          }
        </div>
      </div>
    </section>
  );
};

export default Historylist;
