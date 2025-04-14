import {  useState,createContext } from "react";
const API_URL = import.meta.env.VITE_API_URL;
export const GlobalContext=createContext();

const GlobalProvider=({children})=>{
    const[products,setproduct]=useState([]);
    const[singleproduct,setSingleproduct]=useState(null);
    const[profile,setProfile]=useState(null);
    const[orders,setOrders]=useState([])

    const fetchProduct= async()=>{
        try {
            const response=await fetch(`${API_URL}/user/viewproduct`);
            const data = await response.json();
            if(data.success){
                setproduct(data.products);

            }
            else{
                console.error("Failed to fetch product:",data.message)
            }
        } catch (error) {
            console.error("error fetching products: ",error)
        }
    };


    const fetchSingle=async(id)=>{
        try {
            const response =await fetch(`${API_URL}/user/viewsingleproduct/${id}`)
            const data=await response.json();
            if(data.success){
                setSingleproduct(data.product)

            }
            else{
                console.error("failed to fetch product :",data.message)
            }
        } catch (error) {
            console.error("error fetching products: ",error)
        }
    }

    const fetchProfile =async ()=>{
        try {
            const response=await fetch(`${API_URL}/user/getProfile`,{
                method: "GET",
                credentials: "include",
              });
            const data=response.json()
            if(data.success){
                setProfile(data.user)
            }
            else{
                console.error("Failed to fetch profile:", data.message)
            }
        } catch (error) {
            console.error("error fetching products: ",error)
        }
    }
    const fetchOrder = async () => {
        try {
          const response = await fetch(`${API_URL}/user/getHistory`, {
            method: "GET",
            credentials: "include",
          });
          const data = await response.json();
          if (data.success) {
            setOrders(data.orders);
            
          } else {
            console.error("Failed to fetch orders:", data.message);
            setMessage(data.message)
          }
          
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      };

    return(
        <GlobalContext.Provider
        value={{products,singleproduct,profile,fetchProduct,fetchSingle,fetchProfile,fetchOrder,orders}}
        >{children}</GlobalContext.Provider>
    );
    

}

export default GlobalProvider;