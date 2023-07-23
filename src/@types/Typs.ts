import {availableTypes} from "../constants/content";

export type  PizzaItem = {
    id: string;
    category: number;
    description: string;
    imageUrl: string;
    name: string;
    price: number;
    rating: number;
    sizes: number[];
    types: number[];
}
 export type PizzaCartItem = {
     id:string;
     name:string;
     imageUrl:string;
     price:number;
     typeActive:string;
     sizeActive:number;
     countItems:number;
     itemsPrices:number;


 }
 export type PizzaCartItemAction ={
     id:string;
     typeActive:string;
     sizeActive:number;
     countItems:number;
     itemsPrices:number;
     price:number;
 }
// id, name, imageUrl, price, types, sizes
// id, typeActive, sizeActive, countItems, itemsPrices, price

export type SortType = {
    name: 'popularity' | 'price ↓' | 'price ↑' | 'alphabet';
    type: 'rating' | 'price' | 'name';
    order: 'desc' | 'abc';
}

