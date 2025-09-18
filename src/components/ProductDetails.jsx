import { useEffect, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
const API_URL = import.meta.env.VITE_API_URL;
const IMG_URI = import.meta.env.VITE_CLOUDINARY_BASE_URL;
import OrderSuccess from "./Succes";

const ProductDetails = () => {
  const { id } = useParams();
  const { fetchSingle, singleproduct } = useContext(GlobalContext);

  const [quantity, setQuantity] = useState(1);
  const [availability, setAvailability] = useState(1);
  const [address, setAddress] = useState("");
  const [room, setRoom] = useState("");
  const [block, setBlock] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // NEW state
  const ownerId = singleproduct?.ShopId;

  const navigate = useNavigate();

  useEffect(() => {
    fetchSingle(id);
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!quantity || !address) {
      setMessage("Please enter quantity and address");
      return;
    }

    setLoading(true); // start spinner
    const orderData = {
      ownerId,
      Address: room + " " + block + " " + address,
      availability,
      items: [
        {
          productId: singleproduct._id,
          quantity: parseInt(quantity),
        },
      ],
      phone: mobile,
    };

    try {
      const response = await fetch(`${API_URL}/user/placeOrder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
        credentials: "include",
      });

      const data = await response.json();
      if (data.success) {
        setQuantity(1);
        setAddress("");
        setRoom("");
        setBlock("");
        setMobile("");
        setMessage("Order placed successfully!");

        setTimeout(() => {
          navigate("/Home");
        }, 3000);
      } else {
        setMessage(`Error: ${data.message}`);
        if (data.message === "unauthorised" || data.message === "Invalid Token") {
          setTimeout(() => {
            navigate("/Login");
          }, 1000);
        }
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false); // stop spinner
    }
  };

  if (!singleproduct) {
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

  return (
    <section className="d-flex justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="container d-flex justify-content-center">
        <div className="row">
          <div className="col-12">
            <div
              className="card text-center mx-auto my-3"
              style={{ width: "100%", maxWidth: "400px", border: "none" }}
            >
              <img
                className="card-img-top rounded-4 mb-3"
                src={`${IMG_URI}/eaty-images/${singleproduct.image.split("/").pop()}.${singleproduct.image.split(".").pop()}`}
                alt={"product"}
                style={{ height: "250px", objectFit: "cover" }}
                loading="lazy"
              />
              <div className="nav-bg text-white rounded-bottom-4">
                <h5 className="card-title text-capitalize py-2">{singleproduct.name}</h5>
                <p className="card-text pb-1">₹{singleproduct.price * quantity}/-</p>
                <p className="card-text ">
                  {singleproduct.availability - quantity} in stock
                </p>

                <form onSubmit={handleSubmit} className="mt-3">
                  {/* quantity input */}
                  <div className="mb-2 text-start">
                    <label htmlFor="quantity" className="form-label">
                      Quantity
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      className="form-control"
                      value={quantity}
                      min={1}
                      max={singleproduct.availability}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (value >= 1 && value <= singleproduct.availability) {
                          setQuantity(value);
                          setAvailability(singleproduct.availability - value);
                        } else if (e.target.value === "") {
                          setQuantity("");
                        }
                      }}
                      required
                    />
                  </div>

                  {/* address inputs */}
                  <div className="mb-3 text-start">
                    <label className="form-label">Room No/Name</label>
                    <input
                      className="form-control"
                      value={room}
                      onChange={(e) => setRoom(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3 text-start">
                    <label className="form-label">Block</label>
                    <input
                      className="form-control"
                      value={block}
                      onChange={(e) => setBlock(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3 text-start">
                    <label className="form-label">Mobile No</label>
                    <input
                      type="text"
                      className="form-control"
                      maxLength={10}
                      minLength={10}
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </div>
                  <div className="mb-3 text-start">
                    <label className="form-label">Additional Address Details</label>
                    <textarea
                      className="form-control"
                      rows="2"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    ></textarea>
                  </div>

                  {/* submit button with spinner */}
                  <button type="submit" className="btn w-100" disabled={loading}>
                    {loading ? (
                      <div
                        className="spinner-border spinner-border-sm text-light"
                        role="status"
                      >
                        <span className="visually-hidden">Placing order...</span>
                      </div>
                    ) : (
                      "Place Order"
                    )}
                  </button>
                </form>

                {message === "Order placed successfully!" ? (
                  <OrderSuccess />
                ) : (
                  <p className="mt-3">{message}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
