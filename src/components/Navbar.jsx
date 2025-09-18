import { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

const API_URL = import.meta.env.VITE_API_URL;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile, fetchProfile } = useContext(GlobalContext);

  // Load profile on mount
  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        navigate("/Login");
        window.location.reload(); // optional: force re-check profile
      } else {
        alert("Logout failed: " + data.message);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black sticky-top">
      <div className="container">
        <Link className="navbar-brand logo" to="/Home">
          EATY
        </Link>

        <div className="collapse navbar-collapse show" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/Home" ? "active" : ""}`}
                to="/Home"
              >
                <i className="bi bi-house-door"></i> Home
              </Link>
            </li>

            {/* 👇 Only show if logged in */}
            {profile ? (
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${location.pathname === "/History" ? "active" : ""}`}
                    to="/History"
                  >
                    <i className="bi bi-clock-history"></i> History
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link btn-link"
                    onClick={handleLogout}
                    style={{ textDecoration: "none" }}
                  >
                    <i className="bi bi-box-arrow-right"></i> Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === "/Login" ? "active" : ""}`}
                  to="/Login"
                >
                  <i className="bi bi-box-arrow-in-right"></i> Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
