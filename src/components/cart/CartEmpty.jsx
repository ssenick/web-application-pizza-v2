import React from 'react';
import {emptyCart} from '../../assets/images'
import {Link} from "react-router-dom";

const CartEmpty = () => {
   return (
      <div className="container">
         <div className="cart cart--empty">
            <h2>Cart is empty <span>😕</span></h2>
            <p>
               You probably haven't ordered pizza yet.<br/>
               To order pizza, go to the main page.
            </p>
            <img src={emptyCart} alt="Empty cart"/>
            <Link to='/' className="button button--black">
               <span>Go back to main page</span>
            </Link>
         </div>
      </div>
   );
};

export default CartEmpty;