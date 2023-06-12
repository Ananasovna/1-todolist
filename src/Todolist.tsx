import React, {ChangeEvent, ChangeEventHandler, useState} from "react";
import {Button} from './components/Button';
import s from './Todolist.module.css';
import {Input} from './components/Input';

type FilterValueType = 'all' | 'active' | 'completed';

type PropsType = {
    title: string;
    tasks: TaskType[];
    onClickHandler: (id: string) => void;
    addTask: (title: string) => void;
    checkboxToggle: (id: string, isDone: boolean) => void;
}

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}
export const Todolist = (props: PropsType) => {
    const [filterValue, setFilterValue] = useState<FilterValueType>('all');

    const [inputValue, setInputValue] = useState<string>('');

    const [error, setError] = useState<string | null>(null);

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
        if (inputValue.trim()) {
            props.addTask(inputValue.trim());
            setInputValue('')
        } else {
            setError('Add task name');
        }

    }

    const onKeyDownInputHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        setError(null);
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

    const onChangeCheckboxHandler = (id: string, isDone: boolean) => {
        props.checkboxToggle(id, isDone)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div className={s.inputBlock}>
                <div className={s.inputWrapper}>
                    <input
                        className={error ? `${s.inputError}`: ''}
                        value={inputValue}
                        onChange={(event) => {
                            onChangeInputHandler(event)}}
                        onKeyDown={(event) => {onKeyDownInputHandler(event)}}
                    />
                    {error && <div className={s.error}>{error}</div>}
                </div>
                <Button title='+' callBack={onClickButtonHandler} />
            </div>
            <ul>
                {getFilteredTasks().map(task => {


                   return (
                       <li key={task.id} className={task.isDone ? `${s.doneTask}` : ''}>
                           <Input  checked={task.isDone}
                                   callBack={(isDone)=>onChangeCheckboxHandler(task.id, isDone)} />

                           <span>{task.title}</span>
                           <Button title='X' callBack={() => onClickTaskButtonHandler(task.id)} />
                       </li>)
                })}

            </ul>
            <div>
                <Button
                    title='all'
                    callBack={() => changeFilterHandler('all')}
                    className={filterValue === 'all' ? 's.activeButton' : ''}/>
                <Button
                    title='active'
                    callBack={() => changeFilterHandler('active')}
                    className={filterValue === 'active' ? 's.activeButton' : ''}/>
                <Button title='completed' callBack={() => changeFilterHandler('completed')} />
            </div>
        </div>
    )
}