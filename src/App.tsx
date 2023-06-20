import React, {useState} from 'react';
import './App.css';
import TodoList, {TasksType, TaskType} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

export type TodoList = {
    id: string
    title: string
    filter: FilterValuesType
}

function App(): JSX.Element {

    const id1 = v1();
    const id2 = v1();

    const [todoLists, setTodoLists] = useState<TodoList[]>([
        {id: id1, title: "What to learn", filter: 'all'},
        {id: id2, title: "What to buy", filter: 'completed'},
    ]);

    const [tasks, setTasks] = useState<TasksType>({
            [id1]: [
                {id: v1(), title: "HTML", isDone: true},
                {id: v1(), title: "CSS", isDone: true},
                {id: v1(), title: "JS/TS", isDone: false},
            ],
            [id2]: [
                {id: v1(), title: "milk", isDone: true},
                {id: v1(), title: "bread", isDone: true},
                {id: v1(), title: "butter", isDone: false},
            ],
        }
    )


    const changeFilter = (nextFilterValue: FilterValuesType, todoListId: string) => {
        const filteredTodolists = todoLists.map(el => el.id === todoListId ? {...el, filter: nextFilterValue} : el);
        setTodoLists(filteredTodolists);
    }

    const removeTask = (taskId: string, todoListId: string) => {
        const nextTasksState: TaskType[] = tasks[todoListId].filter((t) => t.id !== taskId)
        setTasks({...tasks, [todoListId]: nextTasksState});
    }

    const addTask = (title: string, todoListId: string) => {
        setTasks( {...tasks, [todoListId]: [{id: v1(), title, isDone: false}, ...tasks[todoListId]]})

    }

    const changeTaskStatus = (taskId: string, newIsDoneValue: boolean, todoListId: string) => {
        const newTasksArr = tasks[todoListId].map(t => t.id === taskId ? {...t, isDone: newIsDoneValue}: t);
        setTasks({...tasks, [todoListId]: newTasksArr});
    }

    const removeTodoList = (todoListId: string) => {
        const updatedTodoLists = todoLists.filter(el => el.id !== todoListId);
        setTodoLists(updatedTodoLists);
        delete tasks[todoListId];
    }

    const getFilteredTasks =
        (filterValue: FilterValuesType, todoListId: string): Array<TaskType> => {
        switch (filterValue) {
            case "completed":
                return tasks[todoListId].filter(t => t.isDone)
            case "active":
                return tasks[todoListId].filter(t => !t.isDone)
            default:
                return tasks[todoListId]
        }
    }

    const todoListsComponent = todoLists.map(el => {
        const filteredTasks: Array<TaskType> = getFilteredTasks(el.filter, el.id)

        return (
            <TodoList
                key={el.id}
                id={el.id}
                title={el.title}
                filter={el.filter}
                tasks={filteredTasks}
                addTask={addTask}
                removeTask={removeTask}
                changeFilter={changeFilter}
                changeTaskStatus={changeTaskStatus}
                removeTodoList={removeTodoList}
            />
        )

    })


    return (
        <div className="App">
            {todoListsComponent}
        </div>
    );
}

export default App;
