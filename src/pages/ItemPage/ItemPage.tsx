import React, {FC, useEffect, useState} from 'react';
import './ItemPage.scss'
import {useParams} from "react-router-dom";
import {fetchPizza} from "../../API";
import {useFetching} from "../../hooks/useFetching";
import {availableTypes,availableSizes} from '../../constants/content'
import classNames from "classnames";
import {addPizzasReducer, selectCart} from "../../redux/slices/cartSlice";
import {useDispatch, useSelector} from "react-redux";
import ImagePageSkeleton from "./ImagePageSkeleton";
import {PizzaCartItem, PizzaItem} from "../../@types/Typs";
import {AppImage} from "../../components/AppImage/AppImage";
import {pizza} from '../../assets/images'
const ItemPage: FC = () => {
   const dispatch = useDispatch();
   const {id} = useParams();
   const {items} = useSelector(selectCart)
   const [item, setItem] = useState({} as PizzaItem);
   const [activeType, setActiveType] = useState(0);
   const [activeSize, setActiveSize] = useState(0);

   const count = items.filter(item => item.id === id).reduce((acc, item) => item.countItems + acc, 0)

   const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
      const {data} = await fetchPizza(String(id));
      setItem(data)
      setActiveSize(data.sizes[0])
      setActiveType(data.types[0])
   });
   useEffect(() => {
         fetchPosts()
   }, [])

   const addItem = () => {
      const addPizza:PizzaCartItem  = {
         id: item.id,
         name: item.name,
         imageUrl: item.imageUrl,
         price: item.price,
         typeActive: availableTypes[activeType],
         sizeActive: activeSize,
         countItems: 1,
         itemsPrices: item.price,
      }
      // @ts-ignore
      dispatch(addPizzasReducer(addPizza))
   }


   const onClickType = (i:number) => {
      setActiveType(i)
   }
   const onClickSize = (size:number) => {
      setActiveSize(size)
   }

   return (
      <div className="container">
         {isPostsLoading
            ?
            <ImagePageSkeleton/>
            :
            <div className="itemPage">
               {Object.keys(item).length > 0 &&
                  <div className="pizza-block">
                     <AppImage  className="pizza-block__image"  src={item.imageUrl} alt="Pizza"
                                fallback={<div className="pizza-block__skeleton"><span></span></div>} errorFallback={
                        <img
                            className="pizza-block__image"
                            src={pizza}
                            alt="Pizza"
                        />
                     }/>
                     <h4 className="pizza-block__title">{item.name}</h4>
                     <p className='pizza-block__desc'>Description: {item.description}</p>
                     <div className="pizza-block__selector">
                        <ul>
                           {availableTypes.map((type, index) =>
                              <li onClick={() => onClickType(index)} className={classNames({
                                 'active': activeType === index,
                                 'disabled': !item.types.includes(index)
                              })} key={type}>{availableTypes[index]}</li>
                           )}

                        </ul>
                        <ul>
                           {availableSizes.map((size, index) =>
                              <li onClick={() => onClickSize(size)} className={classNames({
                                 'active': activeSize === size,
                                 'disabled': !item.sizes.includes(size)
                              })} key={size}>{size} sm.</li>
                           )}
                        </ul>
                     </div>
                     <div className="pizza-block__bottom">
                        <div className="pizza-block__price">from: {item.price} $</div>
                        <div onClick={addItem} className="button button--outline button--add">
                           <svg
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                           >
                              <path
                                 d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                                 fill="white"
                              />
                           </svg>
                           <span>Add</span>
                           {count > 0 && <i>{count}</i>}
                        </div>
                     </div>
                  </div>
               }
            </div>
         }
         {postError &&  <h2 style={{color: 'red', fontSize: '50px',textAlign: 'center'}}>Ups.... Error: <span
            style={{fontWeight: '900'}}>{postError.message}</span></h2>}
      </div>
   );
};

export default ItemPage;
