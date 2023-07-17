import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useSearchParams, useNavigate} from "react-router-dom";
import qs from 'qs'
import {Categories, PizzaBlock, Search, Sort, PizzaSkeleton} from "../components";
import {selectFilter, setFilter} from "../redux/slices/filterSlice";
import {sortItems} from '../constants/content'
import {fetchPizzaItems, selectPizza} from "../redux/slices/pizzaSlice";


const Home = () => {
   const dispatch = useDispatch()
   const {categoriesId, sort, search} = useSelector(selectFilter)
   const {pizzas, status} = useSelector(selectPizza)
   const [searchParams, setSearchParams] = useSearchParams();
   const sortType = sort.type;
   const orderType = sort.order;
   const isSearching = useRef(false)
   const isMounted = useRef(false)
   const navigate = useNavigate()
   useEffect(() => {
      const parse = qs.parse(searchParams.toString())
      if (Object.keys(parse).length) {
         dispatch(setFilter({
            categoriesId: parse.categoriesId,
            sort: sortItems.find(item => item.type === parse.sortType && item.order === parse.orderType),
            search: parse.search,
         }))
         isSearching.current = true
      }
   }, [])


   useEffect(() => {
      if (!isSearching.current) {
         dispatch(fetchPizzaItems())
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
            {status.name === 'success' &&
               pizzas.map(item => (
                  <PizzaBlock key={item.id} {...item}/>
               ))
            }
            {status.name === 'loading' &&
               new Array(6).fill('').map((_, i) => < PizzaSkeleton key={i}/>)
            }
            {pizzas.length === 0 && status.name === 'success' &&
               <h2>Nothing found <span>😕</span></h2>
            }
            {status.name === 'error' && <h2 style={{color: 'red', fontSize: '50px'}}>Ups.... Error: <span
               style={{fontWeight: '900'}}>{status.message}</span></h2>}
         </div>
      </div>
   );
};

export default Home;