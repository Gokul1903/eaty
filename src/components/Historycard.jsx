
const API_URL = import.meta.env.VITE_API_URL;
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";

const HistoryCard = ({ user, address, totalAmount, status, items, id,Phone }) => {
  const navigate=useNavigate()
  const { message, cancelOrder } = useContext(GlobalContext);
  return (
    <div className="card my-3" style={{ width: "100%" }}>
      <div className="card-body ">
        <h4 className="card-title text-white">Ordered by : {user}</h4>
        <p className="card-text text-white text-capitalize">Address : {address}</p>
        
        <p className="card-text text-white">Total Amount : ₹{totalAmount}</p>
        <h6 className="mt-3 text-white">Items :</h6>
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
        <div className="d-flex justify-content-between align-items-center">
  <p className="card-text text-white text-capitalize ">
    Status :{" "}
    <span
      style={{
        color:
          status === "pending"
            ? "rgb(187 184 36)"
            : status === "foodready"
            ? "rgb(169 255 8)"
            : status === "delivered"
            ? "#16C60C"
            : "white",
      }}
    >
      {status}
    </span>
    
  </p>
  {Phone && (
    <a
      href={`tel:${Phone}`}
      title="Call User"
      className="mb-2"
      style={{
        position: "relative",
        color:"#109009",
        textDecoration: "none",
        
        fontSize: "20px",
        zIndex: 1,
      }}
    >
      <i className="bi bi-telephone-fill"></i>
    </a>
  )}

  
</div>

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
