import React, {useCallback, useEffect} from 'react';
import {Grid} from "@mui/material";
import AddItemForm from "../../components/AddItemForm/AddItemForm";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist/Todolist";
import {
    changeTodoListFilterAC,
    createTodolistTC,
    deleteTodolistTC,
    FilterValuesType, getTodolistsTC,
    TodolistDomainType, updateTodolistTC
} from "./todolists-reducer";
import {shallowEqual, useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../app/store";
import {Navigate} from "react-router-dom";

export const TodolistsList = () => {

    const todoLists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists, shallowEqual)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!isLoggedIn) {
            return
        }
        dispatch(getTodolistsTC())
    }, [])

    const addTodoList = useCallback((titleTodoList: string) => {
        dispatch(createTodolistTC(titleTodoList))
    },[])
    const changeFilter = useCallback((todoListId: string, value: FilterValuesType) => {
        const action = changeTodoListFilterAC(todoListId, value)
        dispatch(action)
    },[])
    const removeTodoList = useCallback((todoListId: string) => {
        dispatch(deleteTodolistTC(todoListId))
    },[])
    const changeTodoListTitle = useCallback((todoListId: string, newTodoListTitle: string) => {
        dispatch(updateTodolistTC(todoListId, newTodoListTitle))
    },[])

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <>
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
                                entityStatus={el.entityStatus}
                                changeFilter={changeFilter}
                                removeTodoList={removeTodoList}
                                changeTodoListTitle={changeTodoListTitle}
                            />
                        </Paper>
                    </Grid>
                })}
            </Grid>
        </>
    );
};

