import {Header, Footer, Categories, Sort, PizzaBlock} from "./components";
import './scss/app.scss'
import {Route, Routes, useLocation} from "react-router-dom";
import {Home, Cart} from "./pages";



function App() {
   return (
      <div className="App">
         <div className="wrapper">
            <Header/>
            <div className="content">
               <Routes>
                  <Route index element={<Home/>}/>
                  <Route path="/cart" element={<Cart/>}/>
               </Routes>
            </div>
            <Footer/>
         </div>
      </div>
   )
      ;
}

export default App;
