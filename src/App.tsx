import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";


function App() {

    const title = 'What to learn1';

    // let tasks = [
    //     { id: 1, title: "HTML&CSS", isDone: true },
    //     { id: 2, title: "JS", isDone: true },
    //     { id: 3, title: "ReactJS", isDone: false }
    // ]

    let [tasks, setTasks] = useState([
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false }
    ])


    const removeTask = (id: number) => {
        setTasks(tasks.filter(el => el.id !== id));
    }


    return (
        <div className="App">
           <Todolist
               title={title}
               tasks={tasks}
               onClickHandler={removeTask}
                          />

        </div>
    );
}

export default App;
