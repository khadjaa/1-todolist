import {FilterValuesType} from "./App";
import './App.css'
import {ChangeEvent, KeyboardEvent, useState} from "react";

type PropsType = {
    title?: string
    tasks: Array<TaskType>
    removeTask: (taskID: number) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (newTitle: string) => void
}

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const Todolist = (props: PropsType) => {

    const mappedTodolist = props.tasks.map((el) => {
        return (
            <li key={el.id}>
                <input type="checkbox" checked={el.isDone}/>
                <span>{el.title}</span>
                <button onClick={() => {
                    props.removeTask(el.id)
                }}>x
                </button>
            </li>
        )
    })

    const [title, setTitle] = useState('')

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onClickAddTaskHandler = () => {
        props.addTask(title)
        setTitle('')
    }

    const onKeyDownAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.addTask(title)
            setTitle('')
        }
    }

    const tsarOnClickChangeFilterHandler = (filterType: FilterValuesType) => {
        props.changeFilter(filterType)
    }


    return (
        <div className={"title"}>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={onChangeTitleHandler} onKeyDown={onKeyDownAddTaskHandler}/>
                <button onClick={onClickAddTaskHandler}>+</button>
            </div>
            <ul>
                {mappedTodolist}
            </ul>
            <div>
                <button onClick={() => tsarOnClickChangeFilterHandler('all')}>All</button>
                <button onClick={() => tsarOnClickChangeFilterHandler('active')}>Active</button>
                <button onClick={() => tsarOnClickChangeFilterHandler('completed')}>Completed</button>
            </div>
        </div>
    )
}