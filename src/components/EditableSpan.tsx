import {ChangeEvent, useState} from "react";
import {Input} from "./Input";

type EditableSpanProps = {
    startTitle: string
    className: string
    changeTitle: (title: string) => void
}

export const EditableSpan = ({startTitle, className, changeTitle}: EditableSpanProps) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [title, setTitle] = useState(startTitle);

    const onIsEditMode = () => {
        setIsEditMode(true);
    }

    const offIsEditMode = () => {
        setIsEditMode(false);
        changeTitle(title);
    }

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);

    }

    return (
        <div>
            {isEditMode
                ? <input
                    autoFocus={true}
                    value={title}
                    onChange={(e) => onChangeInputHandler(e)}
                    onBlur={offIsEditMode}
                    type="text"/>
                : <span className={className} onDoubleClick={onIsEditMode}>{title}</span>
            }

        </div>
    )
}