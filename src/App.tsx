import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

const shapka1 = 'What to learn-11111111111'


function App() {

    let [tasks1, setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Rest API", isDone: false},
        {id: 5, title: "GraphQL", isDone: false},
    ])

    function removeTask(id: number) {
        let filteredTasks = tasks1.filter(task => task.id !== id)
        setTasks(filteredTasks)
    }

    return (
        <div className="App">
            <Todolist shapka={shapka1}
                      tasks={tasks1}
                      removeTask={removeTask}
            />
        </div>
    );
}

export default App;
