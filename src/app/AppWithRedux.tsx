import React, {useEffect} from 'react';
import './App.css';
import ButtonAppBar from "../components/ButtonAppBar/ButtonAppBar";
import {Container} from "@mui/material";
import {getTodolistsTC} from "../features/Todolists/todolists-reducer";
import {useAppDispatch} from "./store";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {TodolistsList} from "../features/Todolists/TodolistsList";
import {Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Login";

function AppWithRedux() {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTodolistsTC())
    }, [])

    return (
        <div className="App">
            <ErrorSnackbar/>
            <ButtonAppBar/>
            <Container fixed>
                <Routes>
                    <Route path={'/'} element={<TodolistsList/>}></Route>
                    <Route path={'/login'} element={<Login/>}></Route>
                </Routes>
            </Container>
        </div>
    );
}

export default AppWithRedux;
