import React, {FC, useEffect, useRef} from 'react';
import { useSelector} from "react-redux";
import {useSearchParams, useNavigate} from "react-router-dom";
import qs from 'qs'
import {Categories, PizzaBlock, Search, Sort, PizzaSkeleton} from "../components";
import {FilterSliceState, selectFilter, setFilter} from "../redux/slices/filterSlice";
import {sortItems} from '../constants/content'
import {fetchPizzaItems, Pizza, selectPizza} from "../redux/slices/pizzaSlice";
import {RootState, useAppDispatch} from "../redux/store";
import { SortType} from "../@types/Typs";
import {useInView} from "react-intersection-observer";


const Home: FC = () => {
    // const dispatch = useDispatch()
    const dispatch = useAppDispatch()
    const {categoriesId, sort, search} = useSelector<RootState, FilterSliceState>(selectFilter)
    const {pizzas, status} = useSelector<RootState, Pizza>(selectPizza)
    const [searchParams, setSearchParams] = useSearchParams();
    const sortType = sort.type;
    const orderType = sort.order;
    const isSearching = useRef(false)
    const isMounted = useRef(false)
    const navigate = useNavigate()

    const {ref,inView,entry} = useInView({
        rootMargin: '0px',
        threshold: 0
    });


    useEffect(() => {
        const parse = qs.parse(searchParams.toString())
        if (Object.keys(parse).length) {

            dispatch(
                setFilter({
                    categoriesId: Number(parse.categoriesId),
                    sort: sortItems.find(item => item.type === parse.sortType && item.order === parse.orderType) as SortType,
                    search: String(parse.search),
                }))
            isSearching.current = true
        }
    }, [])




    useEffect(() => {
        if (!isSearching.current) {

            dispatch(
                fetchPizzaItems()
            )
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
        <div  className="container">
            <div className="content__top">
                <Categories categoriesId={categoriesId}/>
                <Search valueSearch={search}/>
                <Sort sort={sort}/>
            </div>
            <h2 className="content__title">All pizzas</h2>
            <div   className="content__items">

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
                <div   style={{height: '1px'}}></div>

            </div>
        </div>
    );
};

export default Home;