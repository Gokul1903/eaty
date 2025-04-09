import { useEffect ,useContext} from "react";
import Card from "./Card";
import { GlobalContext } from "../context/GlobalContext";



const CardList = () => {
  
  const {products,fetchProduct}=useContext(GlobalContext);


  useEffect(() => {
    fetchProduct();
    
  }, []);

 

  return (
    <>
      
      <section className=" py-5">
        <div className="container">
          <div className="row">
            {products.map((card) => (
              <div className="col-md-3" key={card._id}>
                <Card title={card.name} price={card.price} id={card._id} shopid={card.ShopId} availability={card.availability} image={card.image}/>
              </div>
            ))}
          </div>
        </div>
      </section>

  
    </>
  );
};

export default CardList;
