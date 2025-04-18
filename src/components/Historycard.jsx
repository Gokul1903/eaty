
const API_URL = import.meta.env.VITE_API_URL;
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";

const HistoryCard = ({ user, address, totalAmount, status, items, id }) => {
  const navigate=useNavigate()
  const { message, cancelOrder } = useContext(GlobalContext);
  return (
    <div className="card my-3" style={{ width: "100%" }}>
      <div className="card-body ">
        <h4 className="card-title text-white">Ordered by: {user}</h4>
        <p className="card-text text-white">Address: {address}</p>
        
        <p className="card-text text-white">Total Amount: ₹{totalAmount}</p>
        <h6 className="mt-3 text-white">Items:</h6>
        <ul>
          {Array.isArray(items) &&
            items.map((item, index) => {
              const productName = item?.productId?.name || "Unknown product";
              const quantity = item?.quantity || 0;
              return (
                <li className="text-white text-capitalize" key={index}>
                  {productName} × {quantity}
                </li>
              );
            })}
        </ul>
        <p className="card-text text-white text-capitalize">
  Status : <span style={{
    color:
      status === "pending"
        ? "rgb(187 184 36)"
        : status === "foodready"
        ? "rgb(169 255 8)"
        : status === "delivered"
        ? "#16C60C"
        : "white", // Default color if none of the conditions match
  }}>{status}</span>
</p>
      {status==="pending"?<button onClick={async()=>{
        const confirmcancel = window.confirm("Are you sure?");
        if (confirmcancel) {
          await cancelOrder(id);
          navigate("/Home");
        }
        
        
        }} className="cancelbtn">Cancel</button>:null}
        
      </div>
    </div>
  );
};

export default HistoryCard;
