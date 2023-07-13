import React, {useEffect, useState} from 'react';
import {Categories, PizzaBlock, Search, Sort,PizzaSkeleton} from "../components";
import { useSelector} from "react-redux";
import {fetchPizzas} from "../API";

const Home = () => {

   const {categoriesId,sort,search} = useSelector((state) => state.filter)
   const [isLoaded, setIsLoaded] = useState(false);
   const [isError, setIsError] = useState('');
   const [pizzas, setPizzas] = useState([]);


   useEffect(() => {
      fetchPizzas(setPizzas,setIsError,setIsLoaded,sort,categoriesId,search)
   }, [categoriesId,sort,search])
   return (
      <div className="container">
         <div className="content__top">
            <Categories categoriesId={categoriesId}/>
            <Search />
            <Sort sort={sort}/>
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
            {pizzas.length === 0 &&
                  <h2>Nothing found <span>😕</span></h2>
            }
            {isError && <h2 style={{color: 'red', fontSize: '50px'}}>Ups.... Error: <span
               style={{fontWeight: '900'}}>{isError}</span></h2>}
         </div>
      </div>
   );
};

export default Home;