import React from 'react';
import s from './Button.module.css';

type ButtonPropsType = {
    title: string,
    callBack: () => void,
    className?: string;
}

export const Button = ({title, callBack, className}: ButtonPropsType) => {
    const onClickButtonHandler = () => {
        callBack();

    }

    return (
        <button className={className} onClick={onClickButtonHandler}>{title}</button>
    )
}