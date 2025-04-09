import { Link, useLocation,useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;
const Navbar = () => {
  const navigate=useNavigate()
  const location = useLocation(); // Get current page URL
  const handleLogout = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include", // this sends cookies
      });
  
      const data = await res.json();
  
      if (data.success) {
        // Optional: redirect to login or home
        navigate("/Login") // Or use navigate("/Login") if you want to use `useNavigate`
      } else {
        alert("Logout failed: " + data.message);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  
  return (
    <nav className="navbar navbar-expand-lg navbar-white bg-black sticky-top">
      <div className="container">
        
        <Link className="navbar-brand logo" to="/Home">
          {/* <img className="rounded-4 " src="src/IMG-20250219-WA0010.jpg" width="75" height="65" alt="Logo" /> */}
          EATY
        </Link>

        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar items */}
        <div className="collapse navbar-collapse " id="navbarNav">
          <ul className="navbar-nav ms-auto ">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/Home" ? "active" : ""}`} to="/Home">
                <i className="bi bi-house-door"></i> Home
              </Link>
            </li>
            {/* <li className="nav-item ">
              <Link className={`nav-link ${location.pathname === "/profile" ? "active" : ""}`} to="/profile">
                <i className="bi bi-person"></i> Profile
              </Link>
            </li> */}
            <li className="nav-item ">
              <button className="nav-link btn-link " onClick={handleLogout} style={{ textDecoration: 'none' }}>
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
