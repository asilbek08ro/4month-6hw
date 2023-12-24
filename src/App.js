import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Header from "./components/Header/Header";
import './style.css';
import { useState,useEffect } from "react";
import Category from "./pages/category/Category";
import Details from "./pages/Details/Details";
// import Header from "./components/Header/Header";

function App() {
  const [cartData, setCartData] = useState(
    localStorage.getItem('cartData')
    ? JSON.parse(localStorage.getItem('cartData'))
    :[]
  );



  const buyFunc = (obj) => {
    const idx = cartData.findIndex(item => {
      return obj.id == item.id
    });

    if (idx > -1) {
      cartData[idx].count = cartData[idx].count + 1;
      setCartData([...cartData]);
    } else {
      setCartData([{
        ...obj,
        count: 1,
      }, ...cartData])
    }

  }
useEffect(()=>{
localStorage.setItem('cartData',JSON.stringify(cartData))
},[cartData])


  return (
    <div>

      

      <BrowserRouter>
        <Header cartData={cartData} />


        <Routes >
          <Route path={'/'} element={<Home buyFunc={buyFunc} />} />
          <Route path="/cart" element={<Cart buyFunc={buyFunc} cartData={cartData} setCartData={setCartData} />} />
          <Route path='/category/:category' element={<Category buyFunc={buyFunc} />} />
          <Route path='/details/:id'element={<Details buyFunc={buyFunc}/>} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
