import {FilterValuesType} from "./App";
import './App.css'
import {ChangeEvent, KeyboardEvent, useState} from "react";

type PropsType = {
    todoListId: string
    title?: string
    tasks: Array<TaskType>
    removeTask: (todoListId: string, taskID: string) => void
    changeFilter: (todoListId: string, value: FilterValuesType) => void
    addTask: (todoListId: string, newTitle: string) => void
    changeChecked: (todoListId: string, id: string, newIsDone: boolean) => void
    removeTodoList: (todoListId: string) => void
}

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (props: PropsType) => {

    const [title, setTitle] = useState('')
    const [filterValue, setFilterValue] = useState('all')

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onClickAddTaskHandler = () => {
        props.addTask(props.todoListId, title)
        setTitle('')
    }

    const onKeyDownAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.addTask(props.todoListId, title)
            setTitle('')
        }
    }

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

    const mappedTodolist = props.tasks.map((el) => {
        return (
            <li key={el.id}>
                <input type="checkbox" checked={el.isDone}
                       onClick={(e) =>
                           changeCheckBoxHandler1(el.id, e.currentTarget.checked)}/>
                <span>{el.title}</span>
                <button onClick={() => onClickRemoveTaskHandler(el.id)}>x
                </button>
            </li>
        )
    })

    return (
        <div className={"title"}>
            <h3>{props.title}
                <button onClick={removeTodoListHandler}>x</button>
            </h3>
            <div>
                <input value={title} onChange={onChangeTitleHandler} onKeyDown={onKeyDownAddTaskHandler}/>
                <button onClick={onClickAddTaskHandler}>+</button>
            </div>
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