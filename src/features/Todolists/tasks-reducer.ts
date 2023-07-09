import {addTodoListAC, removeTodoListAC} from "./todolists-reducer";
import {Dispatch} from "redux";
import {TaskStatuses, TaskType, todolistAPI} from "../../api/todolist-api";
import {AppRootStateType} from "../../app/store";
import {RequestStatusType, setAppStatusAC, SetErrorStatusType, SetLoadingStatusType} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

export type TasksDomainType = TaskType & {
    entityStatus: RequestStatusType
}
export type TasksStateType = {
    [key: string]: TasksDomainType[]
}
const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "SET-TASKS": {
            return {
                ...state,
                [action.todolistId]: action.tasks.map(el => ({...el, entityStatus: 'idle'}))
            }
        }
        case "REMOVE-TASK" : {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .filter(t => t.id !== action.payload.id)
            }
        }
        case "ADD-TASK": {
            return {
                ...state,
                [action.payload.task.todoListId]: [{
                    ...action.payload.task,
                    entityStatus: 'idle'
                }, ...state[action.payload.task.todoListId]]
            }
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(t => t.id === action.payload.id
                        ? {...t, status: action.payload.status}
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
        case "CHANGE-TASK-ENTITY-STATUS": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(el => el.id === action.id
                    ? {...el, entityStatus: action.entityStatus}
                    : el)
            }
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
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof changeTaskEntityStatusAC>
    | SetLoadingStatusType
    | SetErrorStatusType

export const removeTaskAC = (id: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', payload: {id, todolistId,}} as const
}
export const addTaskAC = (task: TaskType) => {
    return {type: 'ADD-TASK', payload: {task}} as const
}
export const changeTaskStatusAC = (id: string, todolistId: string, status: TaskStatuses) => {
    return {type: 'CHANGE-TASK-STATUS', payload: {id, todolistId, status}} as const
}
export const changeTaskTitleAC = (id: string, newTitle: string, todolistId: string) => {
    return {type: 'CHANGE-TASK-TITLE', payload: {id, newTitle, todolistId,}} as const
}
const setTasksAC = (todolistId: string, tasks: TaskType[]) => {
    return {type: 'SET-TASKS', todolistId, tasks} as const
}
const changeTaskEntityStatusAC = (todolistId: string, id: string, entityStatus: RequestStatusType) => (
    {type: 'CHANGE-TASK-ENTITY-STATUS', todolistId, id, entityStatus} as const
)

export const setTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(setTasksAC(todolistId, res.data.items))
        })
}
export const createTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.createTask(todolistId, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const deleteTaskTC = (id: string, todolistId: string) => (dispatch: Dispatch) => {
    dispatch(changeTaskEntityStatusAC(todolistId, id, 'loading'))
    todolistAPI.deleteTask(id, todolistId)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC(id, todolistId))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            dispatch(changeTaskEntityStatusAC(todolistId, id, 'idle'))
            handleServerNetworkError(error, dispatch)
        })
}
export const updateTaskStatusTC = (taskId: string, todolistId: string, status: TaskStatuses) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {

        const allTasksFromState = getState().tasks;
        const tasksForCurrentTodolist = allTasksFromState[todolistId]
        const task = tasksForCurrentTodolist.find(t => {
            return t.id === taskId
        })

        if (task) {
            todolistAPI.updateTask(todolistId, taskId, {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: status
            }).then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTaskStatusAC(taskId, todolistId, status))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            }).catch((error) => {
                handleServerNetworkError(error.message, dispatch)
            })
        }
    }
}
