import {FilterValuesType} from "./App";
import './App.css'
import {useState} from "react";
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

type PropsType = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todoListId: string, taskID: string) => void
    changeFilter: (todoListId: string, value: FilterValuesType) => void
    addTask: (todoListId: string, newTitle: string) => void
    changeChecked: (todoListId: string, id: string, newIsDone: boolean) => void
    removeTodoList: (todoListId: string) => void
    changeTaskTitle: (todoListId: string, id: string, newTaskTitle: string) => void
    changeTodoListTitle: (todoListId: string, newTodoListTitle: string) => void
}

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (props: PropsType) => {

    const [filterValue, setFilterValue] = useState('all')

    const onClickRemoveTaskHandler = (el: string) => {
        props.removeTask(props.todoListId, el)
    }

    const tsarOnClickChangeFilterHandler = (filterType: FilterValuesType) => {
        props.changeFilter(props.todoListId, filterType)
        setFilterValue(filterType)
    }

    const changeCheckBoxHandler1 = (tID: string, eventValue: boolean) => {
        props.changeChecked(props.todoListId, tID, eventValue)
    }

    const removeTodoListHandler = () => {
        props.removeTodoList(props.todoListId)
    }

    const addTask = (title: string) => {
        props.addTask(props.todoListId, title)
    }

    const changeTodoListTitleHandler = (title: string) => {
        props.changeTodoListTitle(props.todoListId, title)
    }

    const mappedTodolist = props.tasks.map((el) => {

        const changeTaskTitleHandler = (title: string) => {
            props.changeTaskTitle(props.todoListId, el.id, title)
        }

        return (
            <li key={el.id}>
                <input type="checkbox" checked={el.isDone}
                       onClick={(e) =>
                           changeCheckBoxHandler1(el.id, e.currentTarget.checked)}/>
                <EditableSpan title={el.title} changeTaskTitle={changeTaskTitleHandler}/>
                <IconButton onClick={() => onClickRemoveTaskHandler(el.id)}>
                    <DeleteIcon />
                </IconButton>
            </li>
        )
    })

    return (
        <div className={"title"}>
            <h3>
                <EditableSpan title={props.title} changeTaskTitle={changeTodoListTitleHandler}/>
                <IconButton onClick={removeTodoListHandler}>
                    <DeleteIcon />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {mappedTodolist}
            </ul>
            <div>
                <button className={filterValue === 'all' ? 'active-filter' : ''}
                        onClick={() => tsarOnClickChangeFilterHandler('all')}>All
                </button>
                <button className={filterValue === 'active' ? 'active-filter' : ''}
                        onClick={() => tsarOnClickChangeFilterHandler('active')}>Active
                </button>
                <button className={filterValue === 'completed' ? 'active-filter' : ''}
                        onClick={() => tsarOnClickChangeFilterHandler('completed')}>Completed
                </button>
            </div>
        </div>
    )
}