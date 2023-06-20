import React from 'react';
import s from './Button.module.css';
import {FilterValuesType} from "../App";

type ButtonPropsType = {
    title: string,
    callBack: () => void,
    filterValue?: FilterValuesType,

}

export const Button = ({title, callBack, filterValue}: ButtonPropsType) => {
    const activeClass = filterValue === title
        ? s.activeButton
        : '';

    const onClickButtonHandler = () => {
        callBack();

    }

    return (
        <button className={activeClass} onClick={onClickButtonHandler}>{title}</button>
    )
}