import React from "react";

type PropsType = {
    shapka?: string
    shapka2?: string
    tasks: Array<TaskType>
    removeTask: (taskID: number) => void
}

type TaskType={
    id: number
    title: string
    isDone: boolean
}

export const  Todolist = (props:PropsType) => {
    return (
            <div>
                <h3>{props.shapka}</h3>
                <h3>{props.shapka2}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {props.tasks.map((el) =>{
                        return(
                            <li key={el.id}>
                                <input type="checkbox" checked={el.isDone}/>
                                <span>{el.title}</span>
                                <button onClick={() => {
                                    props.removeTask(el.id)
                                }}>✖</button>
                            </li>
                        )
                    })}
                </ul>
                <div>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
    )
}