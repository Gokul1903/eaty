import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import CardList from "./components/CardList";
import ProductDetails from "./components/ProductDetails";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; 
import Register from "./authComponent/register";
import Verify from "./authComponent/verify";
import Login from "./authComponent/login";
import Forgot from "./authComponent/forgot";
import VerifyForgot from "./authComponent/verifyForgot"
import Reset from "./authComponent/reset"
import NotFound from "./components/NotFound";

const MainLayout=()=>{
  return(<div className="container ">
        <div className="row">
        <Navbar />
        <Routes>
          <Route path="/Home" element={<CardList />} />
          <Route path="/product/:id" element={<ProductDetails/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
        </div>
      </div>
      )
  
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Register/>} ></Route>
          <Route path="/verify" element={<Verify/>} ></Route>
          <Route path="/Login" element={<Login/>} ></Route>
          <Route path="/Forgot" element={<Forgot/>} ></Route>
          <Route path="/VerifyForgot" element={<VerifyForgot/>} />
          <Route path="/Reset" element={<Reset/>} />
          <Route path="/*" element={<MainLayout/>} ></Route>
          
        </Routes>
      
    </BrowserRouter>
  );
}



export default App;
