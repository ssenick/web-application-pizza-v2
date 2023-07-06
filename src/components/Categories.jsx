import React, {useState} from 'react';
import {content} from "../constants/content";

const Categories = () => {
   const [isActive, setIsActive] = useState(0);

   return (
      <div className="categories">
         <ul>
            {content?.categories.map((category, i) =>
               <li key={i}
                   onClick={() => setIsActive(i)}
                   className={isActive === i ? 'active' : ''}>
                  {category}
               </li>
            )}
         </ul>
      </div>
   );
};

export default Categories;