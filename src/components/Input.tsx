import s from '../Todolist.module.css';
import React, {ChangeEvent} from 'react';

type InputPropsType = {
    checked: boolean
    callBack: (isDone: boolean)=>void
}

export const Input = (props: InputPropsType) => {



    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.callBack(e.currentTarget.checked)
    }

    return (
        <input
            type="checkbox"
            checked={props.checked}
            onChange={onChangeHandler}/>
    )
}