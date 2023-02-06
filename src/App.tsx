import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

const title = 'ToDoList'
export type FilterValuesType = 'all' | 'active' | 'completed'

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

    let [filter, setFilter] = useState<FilterValuesType>("all")

    let tasksForTodolist = tasks1

    if (filter === 'active') {
        tasksForTodolist = tasks1.filter(tasks1 => !tasks1.isDone)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks1.filter(tasks1 => tasks1.isDone)
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    return (
        <div className="App">
            <Todolist title={title}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
