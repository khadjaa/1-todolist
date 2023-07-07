import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "../features/Todolists/Todolist/Todolist";
import AddItemForm from "../components/AddItemForm/AddItemForm";
import ButtonAppBar from "../components/ButtonAppBar/ButtonAppBar";
import {Container, Grid} from "@mui/material";
import Paper from '@mui/material/Paper';
import {
    changeTodoListFilterAC, updateTodolistTC,
    createTodolistTC, deleteTodolistTC, FilterValuesType, getTodolistsTC, TodolistDomainType,
} from "../features/Todolists/todolists-reducer";
import {shallowEqual, useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "./store";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";

function AppWithRedux() {

    const todoLists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists, shallowEqual)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTodolistsTC())
    }, [])

    const changeFilter = useCallback((todoListId: string, value: FilterValuesType) => {
        const action = changeTodoListFilterAC(todoListId, value)
        dispatch(action)
    },[])

    const removeTodoList = useCallback((todoListId: string) => {
        dispatch(deleteTodolistTC(todoListId))
    },[])

    const addTodoList = useCallback((titleTodoList: string) => {
        dispatch(createTodolistTC(titleTodoList))
    },[])

    const changeTodoListTitle = useCallback((todoListId: string, newTodoListTitle: string) => {
        dispatch(updateTodolistTC(todoListId, newTodoListTitle))
    },[])

    return (
        <div className="App">
            <ErrorSnackbar/>
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
                                    filter={el.filter}
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
