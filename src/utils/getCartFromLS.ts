import {PizzaCartItem} from "../@types/Typs";

export const calcTotalValue = (arr: PizzaCartItem[]) => {
   const totalPrice = arr.reduce((acc,price ) => price.itemsPrices + acc, 0);
   const countItems = arr.reduce((acc, count) => count.countItems + acc, 0);
   return {
      totalPrice,
      countItems
   }
}
