import React, {FC} from 'react';
import {useDispatch} from "react-redux";
import {removeItemsGroup, minusCountPizza, plusCountPizza} from "../../redux/slices/cartSlice";
import {PizzaCartItem, PizzaCartItemAction} from "../../@types/Typs";
import {Link} from "react-router-dom";
import {AppImage} from "../AppImage/AppImage";
import {pizza} from '../../assets/images'

const CartPizza: FC<PizzaCartItem> = ({id, name, imageUrl, typeActive, sizeActive, countItems, price, itemsPrices}) => {
    const dispatch = useDispatch();
    const nowItem = {id, typeActive, sizeActive, countItems, itemsPrices, price}
    const removeItems = () => {
        dispatch(removeItemsGroup(nowItem))
    }
    const setMinusItem = () => {
        dispatch(minusCountPizza(nowItem))
    }
    const setPlusItem = () => {
        dispatch(plusCountPizza(nowItem))
    }


    return (

        <div className="cart__item">

            <div className="cart__item-img">
                <Link to={`/${id}`}>
                    <AppImage  className="pizza-block__image"  src={imageUrl} alt="Pizza"
                               fallback={<div className="pizza-block__skeleton"><span></span></div>} errorFallback={
                        <img
                            className="pizza-block__image"
                            src={pizza}
                            alt="Pizza"
                        />
                    }/>
                </Link>
            </div>
            <div className="cart__item-info">
                <Link to={`/${id}`}>
                    <h3>{name}</h3>
                </Link>
                <p>{typeActive} dough, {sizeActive} sm.</p>
            </div>
            <div className="cart__item-count">
                <button disabled={countItems < 2} onClick={setMinusItem}
                        className="button button--outline button--circle cart__item-count-minus">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                            fill="#EB5A1E"/>
                        <path
                            d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                            fill="#EB5A1E"/>
                    </svg>

                </button>
                <b>{countItems}</b>
                <button onClick={setPlusItem}
                        className="button button--outline button--circle cart__item-count-plus">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                            fill="#EB5A1E"/>
                        <path
                            d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                            fill="#EB5A1E"/>
                    </svg>

                </button>
            </div>
            <div className="cart__item-price">
                <b>{itemsPrices} $</b>
            </div>
            <div onClick={removeItems} className="cart__item-remove">
                <div className="button button--outline button--circle">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                            fill="#EB5A1E"/>
                        <path
                            d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                            fill="#EB5A1E"/>
                    </svg>
                </div>
            </div>
        </div>

);
};

export default CartPizza;
