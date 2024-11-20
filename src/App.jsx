import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import './App.css'
import Home from './components/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from './components/Navbar';
import AddProduct from './components/AddProduct';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCart from './components/ProductCart';
import { CardLink } from 'react-bootstrap';


function App() {
let [list,setList]=useState([]);
let [cartList,setCartList]=useState([]);

useEffect(()=>{
  fetchProduct();
  getCartProducts();
},[])

let fetchProduct = async () => {
  try {
    let products= await axios.get(`http://localhost:3000/products`)
    setList(products.data)
  } catch (error) {
    console.error(error);
    
  }
}

let handlePost=async(product)=>{
  try {
      let res = await axios.post('http://localhost:3000/products',product);
      console.log(res)
  } catch (error) {
      console.log(error)
  }
  fetchProduct();
}

let cartProduct=async(index)=>{
  try {
    let product=list[index];
    await axios.post(`http://localhost:3000/cart`,product)
    getCartProducts();
  } catch (error) {
    console.error(error);
    
  }
}

let getCartProducts=async()=>{
  try {
    let res = await axios.get(`http://localhost:3000/cart`);
    setCartList(res.data)
  } catch (error) {
    console.error(error);
    
  }
}
console.log(cartList);

let removeItemFromCart=async(id)=>{
  try {
    await axios.delete(`http://localhost:3000/cart/${id}`)
  } catch (error) {
    console.error(error);
    
  }
  getCartProducts();
}

  return (
    <>
      <BrowserRouter>
      <Navbar count={cartList.length}/>
        <Routes>
            <Route path='/' element={<Home products={list} cartProduct={cartProduct}/>}/>
            <Route path='/addproduct' element={<AddProduct handlePost={handlePost}/>}/>
            <Route path='/cart' element={<ProductCart cartList={cartList} removeItemFromCart={removeItemFromCart}/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
