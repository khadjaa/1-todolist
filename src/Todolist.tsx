import {FilterValuesType} from "./AppWithRedux";
import './App.css'
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {addTaskAC} from "./store/tasks-reducer";
import React from "react";
import {Task} from "./Task";

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
    const dispatch = useDispatch()

    const tsarOnClickChangeFilterHandler = (filterType: FilterValuesType) => {
        props.changeFilter(props.todoListId, filterType)
    }

    const removeTodoListHandler = () => {
        props.removeTodoList(props.todoListId)
    }

    const addTask = (title: string) => {
        dispatch(addTaskAC(title, props.todoListId))
    }

    const changeTodoListTitleHandler = (title: string) => {
        props.changeTodoListTitle(props.todoListId, title)
    }

    let tasksForTodolist = tasks

    if (props.filter === 'active') {
        tasksForTodolist = tasks.filter(tasks => !tasks.isDone)
    }
    if (props.filter === 'completed') {
        tasksForTodolist = tasks.filter(tasks => tasks.isDone)
    }

    const mappedTodolist = tasksForTodolist.map((el) => <Task task={el} todoListId={props.todoListId} key={el.id}/>)

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