import {FilterValuesType} from "./App";
import './App.css'
import {ChangeEvent, KeyboardEvent, useState} from "react";

type PropsType = {
    title?: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (newTitle: string) => void
    changeChecked: (id: string, newIsDone: boolean) => void
}

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (props: PropsType) => {

    const [title, setTitle] = useState('')
    // const [checked, setChecked] = useState(true)

    const onClickCheckedHandler = (el: string, isDone: boolean) => {
        props.changeChecked(el, isDone)
    }

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

    const onClickRemoveTaskHandler = (el: string) => {
        props.removeTask(el)
    }

    const tsarOnClickChangeFilterHandler = (filterType: FilterValuesType) => {
        props.changeFilter(filterType)
    }

    const changeCheckBoxHandler1 = (tID: string, eventValue: boolean) => {
        props.changeChecked(tID, eventValue)
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