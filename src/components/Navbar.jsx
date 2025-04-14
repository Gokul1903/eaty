import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleLogout = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        navigate("/Login");
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

        {/* Custom toggle button */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          style={{
            border: "none",
            background: "transparent",
            outline: "none",
          }}
        >
          <span
            className="navbar-toggler-icon"
            style={{
              filter:
                "invert(54%) sepia(97%) saturate(630%) hue-rotate(74deg) brightness(120%) contrast(114%)",
            }}
          ></span>
        </button>

        {/* Backdrop */}
        {isMenuOpen && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              zIndex: 1,
            }}
          />
        )}

        {/* Menu */}
        <div
          className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}
          id="navbarNav"
          ref={menuRef}
          style={{ zIndex: 2 }}
        >
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/Home" ? "active" : ""}`}
                to="/Home"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="bi bi-house-door"></i> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/History" ? "active" : ""}`}
                to="/History"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="bi bi-clock-history"></i> History
              </Link>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn-link"
                onClick={() => {
                  setIsMenuOpen(false);
                  handleLogout();
                }}
                style={{ textDecoration: "none" }}
              >
                <i className="bi bi-box-arrow-right"></i> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
