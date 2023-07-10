import React, {ChangeEvent, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCirclePlus, faDeleteLeft, faTrash} from "@fortawesome/free-solid-svg-icons";
import {IconButton, TextField} from "@mui/material";
import s from './AddItemForm.module.css';

type AddItemFormProps =  {
    maxItemTitleLength: number
    addItemHandler: (title: string) => void
}

export const AddItemForm = ({maxItemTitleLength, addItemHandler}: AddItemFormProps) => {

    const [title, setTitle] = useState("");
    const [error, setError] = useState<boolean>(false)

    const isItemTitleLengthTooLong = title.length > maxItemTitleLength;
    const isAddItemBtnDisabled = !title || isItemTitleLengthTooLong;

    const changeItemTitle = (e: ChangeEvent<HTMLInputElement>) => {
        if(error) {
            setError(false)
        }
        if(!isItemTitleLengthTooLong){
            setTitle(e.currentTarget.value)
        }
    }

    const addItem = () => {
        const trimmedTitle = title.trim();
        if(trimmedTitle){
            addItemHandler(trimmedTitle)
        } else {
            setError(true);
        }
        setTitle("");
    }

    return (
        <div className={s.wrapper}>
            <TextField
                sx={{minWidth: '150px'}}
                size={'small'}
                placeholder={'Please, enter title'}
                value={title}
                onChange={changeItemTitle}
                className={error ? "user-error" : undefined}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        addItem()
                    }
                }}
            />
            <IconButton
                disabled={isAddItemBtnDisabled}
                onClick={addItem}>
                <FontAwesomeIcon icon={faCirclePlus}/>
            </IconButton>
            <IconButton
                disabled={!title}
                onClick={() => setTitle(title.slice(0, -1))}>
                <FontAwesomeIcon icon={faDeleteLeft}/>
            </IconButton>
            <IconButton
                disabled={!title}
                onClick={() => setTitle("")}>
                <FontAwesomeIcon icon={faTrash}/>
            </IconButton>
            {isItemTitleLengthTooLong && <div>You title is too long</div>}
            {error && <div style={{"color": "red", "fontWeight": "bold"}}>Please, enter correct title</div>}
        </div>
    )
}