import React from 'react';

type ButtonPropsType = {
    title: string,
    callBack: () => void,
}

export const Button = (props: ButtonPropsType) => {
    const onClickButtonHandler = () => {
        props.callBack();
    }

    return (
        <button onClick={onClickButtonHandler}>{props.title}</button>
    )
}