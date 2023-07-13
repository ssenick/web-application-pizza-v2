import './scss/app.scss'
import {Route, Routes} from "react-router-dom";
import {Home, Cart} from "./pages";
import Layout from "./Layout/Layout";
import React from "react";



function App() {
   return (
      <div className="App">
         <Routes>
            <Route path='/' element={<Layout/>}>
               <Route index element={<Home/>}/>
               <Route path="cart" element={<Cart/>}/>
               <Route path="*" element={<Home/>}/>
            </Route>
         </Routes>
      </div>
   )
      ;
}

export default App;
