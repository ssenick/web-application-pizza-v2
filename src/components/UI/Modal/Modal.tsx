import React, {FC, FormEvent, useEffect} from 'react';
import style from './Modal.module.scss'
import {selectCart} from "../../../redux/slices/cartSlice";
import {useSelector} from "react-redux";


const Modal: FC<any> = ({setIsVisibleModal}) => {

    const items = useSelector(selectCart)
    console.log(items)
    const sendForm = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault()


        setIsVisibleModal(false)
    }

    return (
        <div onClick={() => setIsVisibleModal(false)} className={style.modal}>
            <div onClick={(event) => event.stopPropagation()} className={style.body}>
                <form className={style.form}>
                    <input className={style.input} name='name' type="text" placeholder='Name'/>
                    <input className={style.input} name='last name' type="text" placeholder='Last name'/>
                    <input className={style.input} name='phone number' type="number" placeholder='Your phone number'/>
                    <button onClick={sendForm} className={style.button}>Send</button>
                </form>
            </div>
        </div>
    );
};

export default Modal;