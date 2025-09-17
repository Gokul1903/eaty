import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  // Password validation function
  const validatePassword = (pwd) => {
    const minLength = /.{8,}/;               // at least 8 characters
    const upper = /[A-Z]/;                  // at least one uppercase letter
    const lower = /[a-z]/;                  // at least one lowercase letter
    const number = /[0-9]/;                 // at least one number
    const special = /[@$!%*?&#]/;           // at least one special char

    if (!minLength.test(pwd)) return "Password must be at least 8 characters";
    if (!upper.test(pwd)) return "Password must contain an uppercase letter";
    if (!lower.test(pwd)) return "Password must contain a lowercase letter";
    if (!number.test(pwd)) return "Password must contain a number";
    if (!special.test(pwd)) return "Password must contain a special character (@$!%*?&#)";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setMessage("Missing parameter");
      return;
    }

    // validate password before submit
    const error = validatePassword(password);
    if (error) {
      setPasswordError(error);
      return;
    } else {
      setPasswordError("");
    }

    const newUser = { name, email, password };
    try {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      const data = await res.json();
      if (data.success) {
        setMessage(data.message);
        setName("");
        setEmail("");
        setPassword("");
        navigate("/verify", { state: { email } });
      } else {
        setMessage(` ${data.message}`);
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
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
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="navbar-brand logo fs-1 text-center">EATY</p>
                    <p className="text-center text-white h3 fw-bold mb-4 mx-1 mx-md-4 mt-4">
                      Sign up
                    </p>

                    {message && (
                      <p className="text-center text-danger">{message}</p>
                    )}
                    {passwordError && (
                      <p className="text-center text-warning">{passwordError}</p>
                    )}

                    <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                      {/* name */}
                      <div className="flex-row align-items-center mb-2">
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label text-white">
                            Your Name
                          </label>
                          <input
                            type="text"
                            className="form-control custom-input"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </div>

                      {/* email */}
                      <div className="flex-row align-items-center mb-2">
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label text-white">
                            Your Email
                          </label>
                          <input
                            type="email"
                            className="form-control custom-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>

                      {/* password */}
                      <div className="flex-row align-items-center mb-2">
                        <div className="form-outline flex-fill">
                          <label className="form-label text-white">
                            Password
                          </label>
                          <input
                            type="password"
                            className="form-control custom-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="d-flex justify-content-center mt-3">
                        <button type="submit" className="buybtn py-2 w-100 mt-4">
                          Register
                        </button>
                      </div>
                      <p className="text-center text-white mt-4">
                        Have already an account?
                        <Link className="login" to={"/Login"}>
                          Login
                        </Link>
                      </p>
                    </form>
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

export default Register;
