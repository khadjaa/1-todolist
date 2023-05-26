import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import {Container, Grid} from "@mui/material";
import Paper from '@mui/material/Paper';
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todolistsReducer
} from "./store/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./store/tasks-reducer";

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

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    let [todoLists, dispatchToTodoList] = useReducer(todolistsReducer, [
        {id: todoListId_1, title: 'What to Learn', filter: 'all'},
        {id: todoListId_2, title: 'What to Buy', filter: 'all'},
    ])
    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
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
        const action = addTaskAC(newTitle, todoListId)
        dispatchToTasks(action)
    }

    function removeTask(todoListId: string, id: string) {
        const action = removeTaskAC(id, todoListId)
        dispatchToTasks(action)
    }

    const changeChecked = (todoListId: string, id: string, newIsDone: boolean) => {
        const action = changeTaskStatusAC(id, newIsDone, todoListId)
        dispatchToTasks(action)
    }

    function changeFilter(todoListId: string, value: FilterValuesType) {
        const action = changeTodoListFilterAC(todoListId, value)
        dispatchToTodoList(action)
    }

    const removeTodoList = (todoListId: string) => {
        const action = removeTodoListAC(todoListId)
        dispatchToTodoList(action)
        dispatchToTasks(action)
        // delete tasks[todoListId]
    }
    console.log(tasks)

    const addTodoList = (titleTodoList: string) => {
        const action = addTodoListAC(titleTodoList)
        dispatchToTodoList(action)
        dispatchToTasks(action)
    }

    const changeTaskTitle = (todoListId: string, id: string, newTaskTitle: string) => {
        const action = changeTaskTitleAC(id, newTaskTitle, todoListId)
        dispatchToTasks(action)
    }

    function changeTodoListTitle(todoListId: string, newTodoListTitle: string) {
        const action = changeTodoListTitleAC(todoListId, newTodoListTitle)
        dispatchToTodoList(action)
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
