import React, {useEffect, useRef, useState} from 'react';
import {Categories, PizzaBlock, Search, Sort, PizzaSkeleton} from "../components";
import {useDispatch, useSelector} from "react-redux";
import {useSearchParams, useNavigate, useParams} from "react-router-dom";
import {fetchPizzas} from "../API";
import qs from 'qs'
import {setFilter} from "../redux/slices/filterSlice";
import {content} from "../constants/content";


const Home = () => {
   const dispatch = useDispatch()
   const {categoriesId, sort, search} = useSelector((state) => state.filter)
   const [isLoaded, setIsLoaded] = useState(false);
   const [isError, setIsError] = useState('');
   const [pizzas, setPizzas] = useState([]);
   const [searchParams, setSearchParams] = useSearchParams();
   const sortType = sort.type;
   const orderType = sort.order;
   const isSearching = useRef(false)
   const isMounted = useRef(false)

   const navigate = useNavigate()

   useEffect(() => {
      const parse = qs.parse(searchParams.toString())
      if (Object.keys(parse).length) {
         console.log(1)
         dispatch(setFilter({
            categoriesId: parse.categoriesId,
            sort: content.sortItems.find(item => item.type === parse.sortType && item.order === parse.orderType),
            search: parse.search,
         }))
         isSearching.current = true
      }
   }, [])


   useEffect(() => {
      if (!isSearching.current) {
         fetchPizzas(setPizzas, setIsError, setIsLoaded, sortType, orderType, categoriesId, search)
      }
      isSearching.current = false
   }, [categoriesId, sort, search])


   useEffect(() => {
      if (isMounted.current) {
         const stringify = qs.stringify({
            sortType,
            orderType,
            categoriesId,
            search
         });
         navigate(`?${stringify}`)
      }

      isMounted.current = true;

   }, [sortType, orderType, categoriesId, search])


   return (
      <div className="container">
         <div className="content__top">
            <Categories categoriesId={categoriesId}/>
            <Search/>
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
               new Array(6).fill('').map((_, i) => < PizzaSkeleton key={i}/>)
            }
            {pizzas.length === 0 && isLoaded &&
               <h2>Nothing found <span>😕</span></h2>
            }
            {isError && <h2 style={{color: 'red', fontSize: '50px'}}>Ups.... Error: <span
               style={{fontWeight: '900'}}>{isError}</span></h2>}
         </div>
      </div>
   );
};

export default Home;