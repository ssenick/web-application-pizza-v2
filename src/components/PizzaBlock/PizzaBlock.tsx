import React, {FC, useState} from 'react';
import {availableTypes,availableSizes} from "../../constants/content";
import classNames from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {addPizzasReducer, selectCart} from "../../redux/slices/cartSlice";
import {Link} from "react-router-dom";
import {emptyCart} from '../../assets/images'
import {pizza} from '../../assets/images'
import {AppImage} from "../AppImage/AppImage";


interface PizzaBlockProps {
   id : string, name:string, imageUrl:string, price:number, types:number[], sizes:number[]
}


const PizzaBlock:FC<PizzaBlockProps> = ({id, name, imageUrl, price, types, sizes}) => {
   const dispatch = useDispatch();
   const {items} = useSelector(selectCart)
   const [activeType, setActiveType] = useState<number>(types[0]);
   const [activeSize, setActiveSize] = useState<number>(sizes[0]);
   const count  = items.filter(item => item.id === id).reduce((acc, item) =>  item.countItems + acc,0)

   const addItem = () => {
      const addPizza  = {
         id,
         name,
         imageUrl,
         price,
         typeActive: availableTypes[activeType],
         sizeActive: activeSize,
         countItems: 1,
         itemsPrices: price,
      }
      dispatch(addPizzasReducer(addPizza))
   }

   const onClickType = (i:number) => {
      setActiveType(i)
   }
   const onClickSize = (size:number) => {
      setActiveSize(size)
   }
   return (
      <div   className="pizza-block">
         <Link  to={`${id}`} className="pizza-block__link">
            <AppImage  className="pizza-block__image"  src={imageUrl}  errorFallback={
               <img
                   className="pizza-block__image"
                   src={pizza}
                   alt="Pizza"
               />
            }/>
            <h4 className="pizza-block__title">{name}</h4>
         </Link>

         <div className="pizza-block__selector">
            <ul>
               {availableTypes.map((item, index) =>
                  <li onClick={() => onClickType(index)} className={classNames({
                     'active': activeType === index,
                     'disabled': !types.includes(index)
                  })} key={item}>{availableTypes[index]}</li>
               )}

            </ul>
            <ul>
               {availableSizes.map((size) =>
                  <li onClick={() => onClickSize(size)} className={classNames({
                     'active': activeSize === size,
                     'disabled': !sizes.includes(size)
                  })} key={size}>{size} sm.</li>
               )}
            </ul>
         </div>
         <div className="pizza-block__bottom">
            <div className="pizza-block__price">from: {price} $</div>
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
               {count > 0  && <i>{count}</i>}
            </div>
         </div>
      </div>
   );
};

export default PizzaBlock;

