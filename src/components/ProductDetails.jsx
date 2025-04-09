import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
const API_URL = import.meta.env.VITE_API_URL;
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const { fetchSingle, singleproduct } = useContext(GlobalContext);

  const[quantity,setquantity]=useState(1);
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const ownerId = singleproduct?.ShopId;

  useEffect(() => {
    fetchSingle(id);
  }, [id]);

  const navigate = useNavigate();
  const handlesubmit=async(e)=>{
    
      e.preventDefault();
      if(!quantity|| !address){
        setMessage("Please quantity and address");
        return;
      }
      const orderData={
        ownerId,
        Address:address,
        items:[
          {
            productId: singleproduct._id,
            quantity: parseInt(quantity),
          }
        ]
      }
      try {
        const responce=await fetch(`${API_URL}/user/placeOrder`,{
          method:"POST",
          headers:{
            "Content-Type": "application/json"},
            // Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2U4MDNjZTYyZmFkN2U1NDdiNTZiZWYiLCJpYXQiOjE3NDQwMzA0NzksImV4cCI6MTc0NDYzNTI3OX0.i1_OpTSv2masPNmrrHjl76LN9dTOs1uyFlq-bcX3nSc"},
            //${localStorage.getItem("token")}
          body:JSON.stringify(orderData),
          credentials: "include",
        });
        const data=await responce.json();
        if(data.success){
          setquantity(1)
          setAddress("")
          setMessage(" Order placed successfully!");
          setTimeout(() => {
            navigate("/Home");
          }, 1500);
        }
        else{
          setMessage(` Error: ${data.message}`)
          if(data.message==="unauthorised"||data.message==="Invalid Token"){
            setTimeout(()=>{
              navigate("/Login");
            },1000)
            
          }
        }
      } catch (error) {
        setMessage(" Something went wrong. Please try again.");
      }
     
  }

  if (!singleproduct) return <p className="text-center mt-5">Loading...</p>;

  return (
    <section className="d-flex justify-content-center " style={{ minHeight: "100vh" }}>
      <div className="container d-flex justify-content-center ">
        <div className="row">
          <div className="col-12">
            <div className="card text-center mx-auto my-3" style={{ width: "100%", maxWidth: "400px", border: "none" }}>
              <img
                className="card-img-top rounded-4 mb-3"
                src={`${API_URL}${singleproduct.image}`}
                alt={"product"}
                style={{ height: "250px", objectFit: "cover" }}
                loading="lazy"
              />
              <div className=" nav-bg text-white rounded-bottom-4">
                <h5 className="card-title text-capitalize py-2">
                  {singleproduct.name}
                </h5>
                <p className="card-text pb-3">₹{singleproduct.price*quantity}/-</p>

                <form onSubmit={handlesubmit} className="mt-3">
                <div className="mb-2 text-start">
                  <label htmlFor="quantity" className="form-label">Quantity</label>
                  <input
                    type="number"
                    id="quantity"
                    className="form-control"
                    value={quantity}
                    min="1"
                    max="10"
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (value >= 1 && value <= 10) {
                        setquantity(value);
                      } else if (e.target.value === "") {
                        setquantity(""); 
                      }
                    }}
                    required
                  />
                </div>

                <div className="mb-3 text-start">
                  <label htmlFor="address" className="form-label">Delivery Address</label>
                  <textarea
                    id="address"
                    className="form-control"
                    rows="2"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn w-100">
                  Place Order
                </button>

              </form>
              {message && <p className="mt-3">{message}</p>}
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
