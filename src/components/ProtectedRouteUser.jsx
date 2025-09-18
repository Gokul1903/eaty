import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";

const ProtectedRouteUser = ({ children }) => {
  const { profile, fetchProfile, message } = useContext(GlobalContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      await fetchProfile(); // fetch user profile
      setLoading(false);
    };
    checkAuth();
  }, []);

  // Show spinner while checking auth
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
        <div className="spinner-border logo" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // If unauthorized
  if (!profile || message === "Unauthorized" || message === "Invalid Token") {
    return (
      <section className="py-5 text-center">
        <h2>You must login to use this platform.</h2>
      </section>
    );
  }

  // Otherwise render page
  return children;
};

export default ProtectedRouteUser;
