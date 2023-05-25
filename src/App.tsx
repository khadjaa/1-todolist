import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import {Container, Grid} from "@mui/material";
import Paper from '@mui/material/Paper';

export type FilterValuesType = 'all' | 'active' | 'completed'

const todoListId_1 = v1()
const todoListId_2 = v1()

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export type TasksType = {
    [key: string]: Array<TaskType>
}

function App() {

    const [todoLists, setTodoList] = useState<TodolistType[]>([
        {id: todoListId_1, title: 'What to Learn', filter: 'all'},
        {id: todoListId_2, title: 'What to Buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksType>({
        [todoListId_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: "Courses IT", isDone: true},
            {id: v1(), title: "Married", isDone: true},
            {id: v1(), title: "Shelby", isDone: false},
        ]
    })

    const addTask = (todoListId: string, newTitle: string) => {
        const newTask = {id: v1(), title: newTitle, isDone: true}
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }

    function removeTask(todoListId: string, id: string) {
        setTasks({...tasks, [todoListId]: [...tasks[todoListId].filter(el => el.id !== id)]})
    }

    const changeChecked = (todoListId: string, id: string, newIsDone: boolean) => {
        setTasks({
            ...tasks, [todoListId]: [...tasks[todoListId]
                .map(el => el.id === id ? {...el, isDone: newIsDone} : el)]
        })
    }

    function changeFilter(todoListId: string, value: FilterValuesType) {
        setTodoList([...todoLists.map(el => el.id === todoListId ? {...el, filter: value} : el)])
    }

    const removeTodoList = (todoListId: string) => {
        setTodoList(todoLists.filter(el => el.id !== todoListId))
        delete tasks[todoListId]
        console.log(tasks)
    }

    const addTodoList = (titleTodoList: string) => {
        const newTodoList: TodolistType = {
            id: v1(), title: titleTodoList, filter: 'all'
        }
        setTodoList([newTodoList, ...todoLists])
        setTasks({...tasks, [newTodoList.id]: []})
    }

    const changeTaskTitle = (todoListId: string, id: string, newTaskTitle: string) => {
        setTasks({
            ...tasks, [todoListId]: [...tasks[todoListId]
                .map(el => el.id === id ? {...el, title: newTaskTitle} : el)]
        })
    }

    function changeTodoListTitle(todoListId: string, newTodoListTitle: string) {
        setTodoList([...todoLists.map(el => el.id === todoListId ? {...el, title: newTodoListTitle} : el)])
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map(el => {

                        let tasksForTodolist = tasks[el.id]

                        if (el.filter === 'active') {
                            tasksForTodolist = tasks[el.id].filter(tasks => !tasks.isDone)
                        }
                        if (el.filter === 'completed') {
                            tasksForTodolist = tasks[el.id].filter(tasks => tasks.isDone)
                        }

                        return <Grid item>
                            <Paper style={{padding: '10px'}}>
                                <Todolist
                                    key={el.id}
                                    todoListId={el.id}
                                    title={el.title}
                                    tasks={tasksForTodolist}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeChecked={changeChecked}
                                    removeTodoList={removeTodoList}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodoListTitle={changeTodoListTitle}
                                />
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>

        </div>
    );
}

export default App;
