import { useEffect, useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import HistoryCard from "./Historycard";

const Historylist = () => {
  const { orders, fetchOrder, message } = useContext(GlobalContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await fetchOrder();
      setLoading(false);
    };

    fetchData();

    const interval = setInterval(() => {
      fetchOrder();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Unauthorized
  if (message === "Unauthorized" || message === "Invalid Token") {
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

  // Loading Spinner
  if (loading) {
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

  // No Orders
  if (orders.length === 0) {
    return (
      <section className="py-5">
        <div className="container text-center text-white ">
          <h2>No order history</h2>
        </div>
      </section>
    );
  }

  // UI - Orders Found
  return (
    <section className="py-5">
      <div className="container">
        <div className="row">
          {orders.map((order) => (
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Historylist;
