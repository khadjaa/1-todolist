import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";


const title = 'ToDoList'
export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    let [tasks1, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ])

    const addTask = (newTitle: string) => {
        const newTask = {id: v1(), title: newTitle, isDone: true}
        setTasks([newTask, ...tasks1])
    }

    function removeTask(id: string) {
        let filteredTasks = tasks1.filter(task => task.id !== id)
        setTasks(filteredTasks)
    }

    const changeChecked = (id: string, newIsDone: boolean) => {
        //onClickCheckedHandler  !newIsDone
        //changeCheckBoxHandler1  newIsDone
        setTasks(tasks1.map(el => el.id === id ? {...el, isDone: newIsDone} : el))
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
                      addTask={addTask}
                      changeChecked={changeChecked}
            />
        </div>
    );
}

export default App;
