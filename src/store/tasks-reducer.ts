import {TaskType} from "../AppWithRedux";
import {v1} from "uuid";
import {addTodoListAC, removeTodoListAC} from "./todolists-reducer";

const initialState: TasksStateType = {}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK" : {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .filter(t => t.id !== action.payload.id)
            }
        }
        case "ADD-TASK": {
            const newTask: TaskType = {id: v1(), title: action.payload.title, isDone: false}
            return {
                ...state,
                [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]
            }
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(t => t.id === action.payload.id
                        ? {...t, isDone: action.payload.newIsDone}
                        : t)
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(t => t.id === action.payload.id
                        ? {...t, title: action.payload.newTitle}
                        : t)
            }
        }
        case "ADD-TODOLIST" : {
            return {
                ...state,
                [action.payload.item.id]: []
            }
        }
        case "REMOVE-TODOLIST": {
            const copyState = {...state}
            delete copyState[action.payload.id]
            return copyState
        }
        default:
            return state
    }
}

type ActionsType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof addTodoListAC>
    |ReturnType<typeof removeTodoListAC>

export const removeTaskAC = (id: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            id,
            todolistId,
        }
    } as const
}

export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            title,
            todolistId,
        }
    } as const
}
export const changeTaskStatusAC = (id: string, newIsDone: boolean, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            id,
            newIsDone,
            todolistId,
        }
    } as const
}
export const changeTaskTitleAC = (id: string, newTitle: string, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            id,
            newTitle,
            todolistId,
        }
    } as const
}

