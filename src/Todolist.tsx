import {FilterValuesType} from "./App";
import './App.css'
import {ChangeEvent, useState} from "react";

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

    const [title, setTitle] = useState('')

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onClickAddTaskHandler = () => {
        props.addTask(title)
        setTitle('')
    }

    return (
        <div className={"title"}>
            <h3 >{props.title}</h3>
            <div>
                <input value={title} onChange={onChangeTitleHandler}/>
                <button onClick={onClickAddTaskHandler}>+</button>
            </div>
            <ul>
                {props.tasks.map((el) => {
                    return (
                        <li key={el.id}>
                            <input type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
                            <button onClick={() => {
                                props.removeTask(el.id)
                            }} >✖
                            </button>
                        </li>
                    )
                })}
            </ul>
            <div >
                <button onClick={() => props.changeFilter('all')}>All</button>
                <button onClick={() => props.changeFilter('active')}>Active</button>
                <button onClick={() => props.changeFilter('completed')}>Completed</button>
            </div>
        </div>
    )
}