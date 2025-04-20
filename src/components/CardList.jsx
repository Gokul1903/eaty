import { useEffect, useContext } from "react";
import Card from "./Card";
import { GlobalContext } from "../context/GlobalContext";
import AOS from 'aos';
import 'aos/dist/aos.css';


const CardList = () => {
  const { products, fetchProduct } = useContext(GlobalContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchdata=async()=>{
      await fetchProduct();
      setLoading(false)
    }
    fetchdata();
    
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: false,
  mirror: true,// animation happens only once while scrolling down
    });
  }, []);
  

  // Show full-screen centered spinner when loading
  if (loading) {
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

  if (products.length === 0) {
    return (
      <section className="py-5">
        <div className="container text-center text-white ">
          <h2>No products history</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="py-5">
      <div className="container">
        <div className="row card-hover-group">
          {products.map((card) => (
            <div
            className="col-md-3 card-hover-wrapper"
            key={card._id}
            data-aos={"fade-up"}
            data-aos-offset="100"
            data-aos-delay="50"
            data-aos-duration="800"
          >
            <div className="card-hover-effect">
              <Card
                title={card.name}
                price={card.price}
                id={card._id}
                shopid={card.ShopId}
                availability={card.availability}
                image={card.image}
              /></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CardList;
