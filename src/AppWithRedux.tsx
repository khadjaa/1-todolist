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
    const dispatch = useDispatch()

    function changeFilter(todoListId: string, value: FilterValuesType) {
        const action = changeTodoListFilterAC(todoListId, value)
        dispatch(action)
    }

    const removeTodoList = (todoListId: string) => {
        const action = removeTodoListAC(todoListId)
        dispatch(action)
    }

    const addTodoList = (titleTodoList: string) => {
        const action = addTodoListAC(titleTodoList)
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
                        return <Grid item key={el.id}>
                            <Paper style={{padding: '10px'}}>
                                <Todolist
                                    key={el.id}
                                    todoListId={el.id}
                                    title={el.title}
                                    changeFilter={changeFilter}
                                    removeTodoList={removeTodoList}
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
