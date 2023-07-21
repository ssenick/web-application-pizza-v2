import React, {FC, memo, useState} from 'react';
import {categories} from "../constants/content";
import {useDispatch} from "react-redux";
import {categoryReducer} from "../redux/slices/filterSlice";


type CategoriesProps = {
    categoriesId:number
}
const Categories:FC<CategoriesProps> = memo(({categoriesId}) => {
   const dispatch = useDispatch()

   const setCategory = ( value:number ) => {
      dispatch(categoryReducer(value))
   }

   return (
      <div className="categories">
         <ul>
            {categories.map((category, i) =>
               <li key={i}
                   onClick={() => setCategory(i)}
                   className={categoriesId === i ? 'active' : ''}>
                  {category}
               </li>
            )}
         </ul>
      </div>
   );
});

export default Categories;