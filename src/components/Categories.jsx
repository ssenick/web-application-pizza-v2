import React, {memo, useState} from 'react';
import {content} from "../constants/content";
import {useDispatch} from "react-redux";
import {categoryReducer} from "../redux/slices/filterSlice";

const Categories = memo(({categoriesId}) => {
   const dispatch = useDispatch()

   const setCategory = ( value ) => {
      dispatch(categoryReducer(value))
   }

   return (
      <div className="categories">
         <ul>
            {content?.categories.map((category, i) =>
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