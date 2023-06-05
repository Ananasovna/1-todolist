import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from 'uuid';


function App() {

    const title = 'What to learn1';

    let [tasks, setTasks] = useState<Array<TaskType>>([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false }
    ])


    const removeTask = (id: string) => {
        setTasks(tasks.filter(el => el.id !== id));
    }

    const addTask = (title: string) => {
        let newTask = { id: v1(), title: title, isDone: false };
        setTasks([newTask, ...tasks]);
    }


    return (
        <div className="App">
           <Todolist
               title={title}
               tasks={tasks}
               onClickHandler={removeTask}
               addTask={addTask}
                          />

        </div>
    );
}

export default App;
