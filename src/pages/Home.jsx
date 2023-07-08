import React, {useEffect, useState} from 'react';
import {Categories, PizzaBlock, Search, Sort} from "../components";
import PizzaSkeleton from "../components/PizzaBlock/PizzaSkeleton";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {fetchPizzas} from "../API";
const Home = () => {
   const dispatch = useDispatch();
   const {categoriesId,sort} = useSelector((state) => state.filter)
   const [isLoaded, setIsLoaded] = useState(false);
   const [isError, setIsError] = useState('');
   const [pizzas, setPizzas] = useState([]);
   const searchValue = useSelector((state) => state.search.value);
   console.log(searchValue)
   useEffect(() => {
      // axios.get('https://64a6157600c3559aa9c054f6.mockapi.io/items' )
      //    .then(res => setPizzas(res.data))
      //    .catch(err => setIsError(err.message))
      //    .finally(()=>setIsLoaded(true))
      fetchPizzas(setPizzas,setIsError,setIsLoaded,sort,categoriesId,searchValue)
   }, [categoriesId,sort,searchValue])
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
            {isError && <h2 style={{color: 'red', fontSize: '50px'}}>Ups.... Error: <span
               style={{fontWeight: '900'}}>{isError}</span></h2>}
         </div>
      </div>
   );
};

export default Home;