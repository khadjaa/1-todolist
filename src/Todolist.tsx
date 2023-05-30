import {FilterValuesType} from "./AppWithRedux";
import './App.css'
import {useState} from "react";
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import {Checkbox} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks-reducer";

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

export const Todolist = (props: PropsType) => {

    const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[props.todoListId])
    const dispatch = useDispatch()

    // const [filterValue, setFilterValue] = useState('all')

    const onClickRemoveTaskHandler = (id: string) => {
        dispatch(removeTaskAC(id, props.todoListId))
    }

    const tsarOnClickChangeFilterHandler = (filterType: FilterValuesType) => {
        props.changeFilter(props.todoListId, filterType)
        // setFilterValue(filterType)
    }

    const changeCheckBoxHandler1 = (tID: string, eventValue: boolean) => {
        dispatch(changeTaskStatusAC(tID, eventValue, props.todoListId))
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

    const mappedTodolist = tasksForTodolist.map((el) => {

        const changeTaskTitleHandler = (title: string) => {
            dispatch(changeTaskTitleAC(el.id, title, props.todoListId))
        }

        return (
            <div key={el.id}>
                <Checkbox
                    checked={el.isDone}
                    color='primary'
                    onChange={(e) => changeCheckBoxHandler1(el.id, e.currentTarget.checked)}
                />
                <EditableSpan title={el.title} changeTaskTitle={changeTaskTitleHandler}/>
                <IconButton onClick={() => onClickRemoveTaskHandler(el.id)}>
                    <DeleteIcon/>
                </IconButton>
            </div>
        )
    })

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
}