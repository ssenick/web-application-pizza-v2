import React, {FC, memo, useEffect, useRef, useState} from 'react';
import s from './Search.module.scss'
import {close, search} from "../../../assets/images";
import {useDispatch} from "react-redux";
import useDebounce from "../../../hooks/useDebounce";
import { searchReducer} from "../../../redux/slices/filterSlice";

type SearchTypProps = {
    valueSearch: string | null
}

const Search: FC<SearchTypProps> = memo(({valueSearch}) => {
    const dispatch = useDispatch();
    const [value, setValue] = useState('');
    const [placeholder, setPlaceholder] = useState('Search...');
    const debouncedSearch = useDebounce(500)
    const valueRef = useRef<HTMLInputElement>(null!)

    useEffect(()=>{
        if(valueSearch){
            setValue(valueSearch)
        }

    },[])
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const eventChange = event.target.value
        setValue(eventChange)
        debouncedSearch(searchReducer(eventChange))
    }
    const removePlaceholder = (event: React.FocusEvent<HTMLInputElement>) => {
        setPlaceholder('')
    }
    const addPlaceholder = () => {
        setPlaceholder('Search...')
    }

    const cleaningValue = () => {
        dispatch(searchReducer(''))
        setValue('')
        valueRef.current?.focus()
    }


    return (
        <div className={s.search}>
            <img className={s.searchImg} src={search} alt="icon"/>
            <input ref={valueRef}
                   onBlur={addPlaceholder}
                   onFocus={removePlaceholder}
                   onChange={onChange}
                   value={value}
                   className={s.input}
                   type="text"
                   placeholder={placeholder}/>
            {value && <img onClick={cleaningValue} className={s.closeBtn} src={close} alt="icon"/>}
        </div>
    );
});

export default Search;