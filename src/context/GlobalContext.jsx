import {  useState,createContext } from "react";
const API_URL = import.meta.env.VITE_API_URL;
export const GlobalContext=createContext();

const GlobalProvider=({children})=>{
    const[products,setproduct]=useState([]);
    const[singleproduct,setSingleproduct]=useState(null);
    const[profile,setProfile]=useState(null);


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
            const response=await fetch(`${API_URL}/user/getProfile`,{"Content-Type": "application/json",headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}});
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

    return(
        <GlobalContext.Provider
        value={{products,singleproduct,profile,fetchProduct,fetchSingle,fetchProfile}}
        >{children}</GlobalContext.Provider>
    );
    

}

export default GlobalProvider;