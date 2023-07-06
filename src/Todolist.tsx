import './App.css'
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "./store/store";
import {createTaskTC, setTasksTC} from "./store/tasks-reducer";
import React, {useCallback, useEffect} from "react";
import {Task} from "./Task";
import {FilterValuesType} from "./store/todolists-reducer";

type PropsType = {
    todoListId: string
    title: string
    filter: string
    changeFilter: (todoListId: string, value: FilterValuesType) => void
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (todoListId: string, newTodoListTitle: string) => void
}

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = React.memo((props: PropsType) => {

    const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[props.todoListId])
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setTasksTC(props.todoListId))
    }, [])

    const tsarOnClickChangeFilterHandler = useCallback((filterType: FilterValuesType) => {
        props.changeFilter(props.todoListId, filterType)
    }, [])

    const removeTodoListHandler = () => {
        props.removeTodoList(props.todoListId)
    }

    const addTask = (title: string) => {
        dispatch(createTaskTC(props.todoListId, title))
    }

    const changeTodoListTitleHandler = useCallback((title: string) => {
        props.changeTodoListTitle(props.todoListId, title)
    }, [])

    let tasksForTodolist = tasks

    if (props.filter === 'active') {
        tasksForTodolist = tasks.filter(tasks => !tasks.isDone)
    }
    if (props.filter === 'completed') {
        tasksForTodolist = tasks.filter(tasks => tasks.isDone)
    }

    const mappedTodolist = tasksForTodolist?.map((el) => <Task task={el} todoListId={props.todoListId} key={el.id}/>)

    return (
        <div className={"title"}>
            <h3>
                <EditableSpan title={props.title}
                              changeTaskTitle={changeTodoListTitleHandler}/>
                <IconButton onClick={removeTodoListHandler}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {mappedTodolist}
            </ul>
            <div>
                <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                        onClick={() => tsarOnClickChangeFilterHandler('all')}
                        color={'info'}
                >All
                </Button>
                <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                        onClick={() => tsarOnClickChangeFilterHandler('active')}
                        color={'warning'}
                >Active
                </Button>
                <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
                        onClick={() => tsarOnClickChangeFilterHandler('completed')}
                        color={'success'}
                >Completed
                </Button>
            </div>
        </div>
    )
})