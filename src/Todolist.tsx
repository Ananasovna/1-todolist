import React, {ChangeEvent, ChangeEventHandler, useState} from "react";
import {Button} from './components/Button';

type FilterValueType = 'all' | 'active' | 'completed';

type PropsType = {
    title: string;
    tasks: TaskType[];
    onClickHandler: (id: string) => void;
    addTask: (title: string) => void;
}

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}
export const Todolist = (props: PropsType) => {
    const [filterValue, setFilterValue] = useState<FilterValueType>('all');

    const [inputValue, setInputValue] = useState<string>('');

    const filterTasks = (fValue: FilterValueType) => {
        setFilterValue(fValue);
    }

    const getFilteredTasks = () => {
        let filteredTasks = props.tasks;
        switch (filterValue) {
            case 'all':
                filteredTasks = props.tasks;
                break;
            case 'active':
                filteredTasks = props.tasks.filter(el => !el.isDone);
                break;
            case 'completed':
                filteredTasks = props.tasks.filter(el => el.isDone);
                console.log()
                break;
        }

        return filteredTasks;
    }

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value)
    }

    const onClickButtonHandler = () => {
        props.addTask(inputValue);
        setInputValue('')
    }

    const onKeyDownInputHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onClickButtonHandler();
        }
    }

    const changeFilterHandler = (filter: FilterValueType) => {
        filterTasks(filter);
    }

    const onClickTaskButtonHandler = (id: string) => {
            props.onClickHandler(id);
        }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={inputValue}
                    onChange={(event) => {
                    onChangeInputHandler(event)}}
                    onKeyDown={(event) => {onKeyDownInputHandler(event)}}
                />
                <Button title='+' callBack={onClickButtonHandler} />
            </div>
            <ul>
                {getFilteredTasks().map(task => {
                   return (
                       <li key={task.id}><input
                           type="checkbox"
                           checked={task.isDone}/>
                           <span>{task.title}</span>
                           <Button title='X' callBack={() => onClickTaskButtonHandler(task.id)} />
                       </li>)
                })}

            </ul>
            <div>
                <Button title='All' callBack={() => changeFilterHandler('all')} />
                <Button title='Active' callBack={() => changeFilterHandler('active')} />
                <Button title='Completed' callBack={() => changeFilterHandler('completed')} />
            </div>
        </div>
    )
}