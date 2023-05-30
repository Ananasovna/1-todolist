import React, {useState} from "react";

type FilterValueType = 'all' | 'active' | 'completed';

type PropsType = {
    title: string;
    tasks: TaskType[];
    onClickHandler: (id: number) => void;
}

type TaskType = {
    id: number;
    title: string;
    isDone: boolean;
}
export const Todolist = (props: PropsType) => {
    const [filterValue, setFilterValue] = useState<FilterValueType>('all');

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

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {getFilteredTasks().map(task => {
                   return (
                       <li key={task.id}><input type="checkbox" checked={task.isDone}/>
                           <span>{task.title}</span>
                           <button onClick={() => {
                               props.onClickHandler(task.id);
                           }}>X</button>
                       </li>)
                })}

            </ul>
            <div>
                <button onClick={() => filterTasks('all')}>All</button>
                <button onClick={() => filterTasks('active')}>Active</button>
                <button onClick={() => filterTasks('completed')}>Completed</button>
            </div>
        </div>
    )
}