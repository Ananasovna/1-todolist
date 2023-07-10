import React, {ChangeEvent, FC} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

type TodoListPropsType = {
    todoListId: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeFilter: (nextFilterValue: FilterValuesType, todoListId: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList: FC<TodoListPropsType> = (props) => {

    const tasksList = (props.tasks.length === 0)
         ? <p>TodoList is empty</p>
         :  <ul className={"tasks-list"}>
            {
                props.tasks.map((task) => {
                    const removeTask = () => props.removeTask(task.id, props.todoListId)
                    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
                        props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)
                    return (
                        <li key={task.id} className={"tasks-list-item"}>
                            <div className={'taskInfo'}>
                               <Checkbox
                                    size={'small'}
                                    checked={task.isDone}
                                    onChange={changeTaskStatus}></Checkbox>
                                <EditableSpan
                                    startTitle={task.title}
                                    className={task.isDone ? "task-done" : "task"}
                                    changeTitle={(title) => props.changeTaskTitle(task.id, title, props.todoListId)}
                                />
                            </div>
                            <IconButton onClick={removeTask}>
                                <DeleteForeverIcon></DeleteForeverIcon>
                            </IconButton>
                        </li>
                    )
                })
            }
            </ul>

    const maxTaskTitleLength = 15;

    const addTask = (title: string) => props.addTask(title, props.todoListId);


    return (
        <div className="todoList">
            <EditableSpan startTitle={props.title} className={"todolist-header"} changeTitle={(title)=> props.changeTodoListTitle(title, props.todoListId)} />
                        <AddItemForm maxItemTitleLength={maxTaskTitleLength} addItemHandler={(title: string) => addTask(title)}/>
            {tasksList}
            <div className={"buttons-block"}>
                <Button
                    size={'small'}
                    variant={'contained'}
                    color={props.filter === "all" ? "secondary" : 'primary'}
                    onClick={() => props.changeFilter("all", props.todoListId)}>All
                </Button>
                <Button
                    size={'small'}
                    variant={'contained'}
                    color={props.filter === "active" ? "secondary" : 'primary'}
                    onClick={() => props.changeFilter("active", props.todoListId)}>Active
                </Button>
                <Button
                    size={'small'}
                    variant={'contained'}
                    color={props.filter === "completed" ? "secondary" : 'primary'}
                    onClick={() => props.changeFilter("completed", props.todoListId)}>Completed
                </Button>
            </div>
        </div>
    );
};

export default TodoList;