import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import AddItemForm from "./AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import {Container, Grid} from "@mui/material";
import Paper from '@mui/material/Paper';
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
} from "./store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks-reducer";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";

export type FilterValuesType = 'all' | 'active' | 'completed'

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

function AppWithRedux() {

    const todoLists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists, shallowEqual)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const addTask = (todoListId: string, newTitle: string) => {
        const action = addTaskAC(newTitle, todoListId)
        dispatch(action)
    }

    function removeTask(todoListId: string, id: string) {
        const action = removeTaskAC(id, todoListId)
        dispatch(action)
    }

    const changeChecked = (todoListId: string, id: string, newIsDone: boolean) => {
        const action = changeTaskStatusAC(id, newIsDone, todoListId)
        dispatch(action)
    }

    function changeFilter(todoListId: string, value: FilterValuesType) {
        const action = changeTodoListFilterAC(todoListId, value)
        dispatch(action)
    }

    const removeTodoList = (todoListId: string) => {
        const action = removeTodoListAC(todoListId)
        dispatch(action)
        // delete tasks[todoListId]
    }
    console.log(tasks)

    const addTodoList = (titleTodoList: string) => {
        const action = addTodoListAC(titleTodoList)
        dispatch(action)
    }

    const changeTaskTitle = (todoListId: string, id: string, newTaskTitle: string) => {
        const action = changeTaskTitleAC(id, newTaskTitle, todoListId)
        dispatch(action)
    }

    function changeTodoListTitle(todoListId: string, newTodoListTitle: string) {
        const action = changeTodoListTitleAC(todoListId, newTodoListTitle)
        dispatch(action)
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

                        return <Grid item key={el.id}>
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

export default AppWithRedux;
