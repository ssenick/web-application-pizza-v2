import React, {useEffect, useState} from 'react';
import {Categories, PizzaBlock, Sort} from "../components";
import PizzaSkeleton from "../components/PizzaBlock/PizzaSkeleton";

const Home = () => {
   const [isLoaded, setIsLoaded] = useState(false);
   const [pizzas, setPizzas] = useState([]);
   useEffect(() => {
      fetch('https://64a6157600c3559aa9c054f6.mockapi.io/items')
         .then(json => json.json())
         .then(response => {
            setPizzas(response)
            setIsLoaded(true)
         })
   }, [])
   return (
      <div className="container">
         <div className="content__top">
            <Categories/>
            <Sort/>
         </div>
         <h2 className="content__title">All pizzas</h2>
         <div className="content__items">
            {isLoaded
               ?
               pizzas.map((item, index) => (
                  <PizzaBlock key={item.id} {...item}/>
               ))
               :
               new Array(6).fill('').map((_,i) => < PizzaSkeleton key={i}/>)
            }

         </div>
      </div>
   );
};

export default Home;