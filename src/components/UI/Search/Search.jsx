import React, {memo, useRef, useState} from 'react';
import s from './Search.module.scss'
import {close, search} from "../../../assets/images";

const Search = memo(() => {
   const [value,setValue] = useState('');
   const valueRef = useRef(null)
   

   const onChange = ( e ) => {
      setValue(e.target.value)
   }
   const cleaningValue = () =>{
      setValue('')
      valueRef.current.focus()
   }
   return (
      <div className={s.search}>
         <img className={s.searchImg} src={search} alt="icon"/>
         <input ref={valueRef} onChange={onChange} value={value} className={s.input} type="text"/>
         {value && <img onClick={cleaningValue} className={s.closeBtn} src={close} alt="icon"/>}
      </div>
   );
});

export default Search;