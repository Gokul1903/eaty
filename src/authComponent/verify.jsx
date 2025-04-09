import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL; // example: http://localhost:5000/api
import { useLocation,useNavigate } from "react-router-dom";

const Verify = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const email = location.state?.email;
  
    const navigate=useNavigate();

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;
    let newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = async () => {
    const enteredOtp = otp.join("");
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp: enteredOtp,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage("✅ " + data.message);
        navigate("/Login");
      } else {
        setMessage("❌ " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="vh-100">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5 rounded-4">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5">
                    <p className="navbar-brand logo fs-1 text-center">EATY</p>
                    <p className="text-center text-white h3 fw-bold mb-4">OTP Verification</p>

                    <div className="d-flex justify-content-center mt-3 mb-4">
                      {otp.map((data, index) => (
                        <input
                          key={index}
                          type="text"
                          className="m-1 text-center form-control rounded custom-input"
                          maxLength="1"
                          style={{ width: "40px", height: "45px", fontSize: "20px" }}
                          value={data}
                          onChange={(e) => handleChange(e.target, index)}
                          onFocus={(e) => e.target.select()}
                        />
                      ))}
                    </div>

                    <div className="d-flex justify-content-center">
                      <button className="buybtn py-2 w-100 mt-3" onClick={handleSubmit} disabled={loading}>
                        {loading ? "Validating..." : "Validate"}
                      </button>
                    </div>

                    {message && (
                      <p className="text-center mt-3 text-white">{message}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Verify;
