import { Link } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;
const IMG_URI=import.meta.env.VITE_CLOUDINARY_BASE_URL
const Card = ({ title, price,id,availability,image}) => {
    return (
      <div className="card my-3 "  style={{ width: "100%",border:"none" }}>
        <img 
          className="card-img-top rounded-top-4" 
          src={`${IMG_URI}/eaty-images/${image.split('/').pop()}.${image.split('.').pop()}`}
          alt={"image"} 
          style={{ height: "200px", objectFit: "fill" }} 
          loading="lazy"
        />
        
        <div className="card-body nav-bg text-white rounded-bottom-4 ">
        
          <h5 className="card-title text-center py-2 text-capitalize">{title} </h5>
          
          <p className="card-text text-center pb-4">₹{price}/-</p>
          <div className="">
            
          {availability ? <Link to={`/product/${id}`} className="buybtn py-2">Buy Now</Link>: <p className="card-text text-danger text-center pb-4">Out of stock</p>}
          
        </div>

        </div>
      </div>
    );
  };
  
  export default Card;
  