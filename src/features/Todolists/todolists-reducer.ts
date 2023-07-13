import {Dispatch} from "redux";
import {todolistAPI, TodolistType,} from "../../api/todolist-api";
import {RequestStatusType, setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {getTasksTC} from "./tasks-reducer";

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

const initialState: TodolistDomainType[] = []

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: ActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => ({
                ...tl,
                filter: 'all',
                entityStatus: "idle"
            }))
        }
        case 'REMOVE-TODOLIST':
            return state.filter(el => el.id !== action.payload.id)
        case 'ADD-TODOLIST':
            return [{...action.payload.item, filter: 'all', entityStatus: 'idle'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(el => el.id === action.payload.id
                ? {...el, title: action.payload.newTodolistTitle}
                : el)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(el => el.id === action.payload.id
                ? {...el, filter: action.payload.newFilter}
                : el)
        case "CHANGE-TODOLIST-ENTITY-STATUS":
            return state.map(el => el.id === action.id
                ? {...el, entityStatus: action.entityStatus}
                : el)
        case "CLEAR-DATA":
            return []
        default:
            return state
    }
}

export const removeTodoListAC = (id: string) => {
    return {type: 'REMOVE-TODOLIST', payload: {id}} as const
}
export const addTodoListAC = (item: TodolistType) => {
    return {type: 'ADD-TODOLIST', payload: {item}} as const
}
export const changeTodoListTitleAC = (id: string, newTodolistTitle: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', payload: {id, newTodolistTitle}} as const
}
export const changeTodoListFilterAC = (id: string, newFilter: FilterValuesType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', payload: {id, newFilter}} as const
}

type SetTodolistsActionType = {
    type: 'SET-TODOLISTS'
    todolists: Array<TodolistType>
}
export const setTodolistsAC = (todolists: TodolistType[]): SetTodolistsActionType => {
    return {type: 'SET-TODOLISTS', todolists} as const
}
export type clearTodoListsDataType = ReturnType<typeof clearTodoListsDataAC>
export const clearTodoListsDataAC = () => ({type: 'CLEAR-DATA'} as const)
const changeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType) => (
    {type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, entityStatus} as const)
export const getTodolistsTC = () => (dispatch: Dispatch<any>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.getTodolist()
        .then((res) => {
            dispatch(setTodolistsAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
            return res.data
        })
        .then((todolists) => {
            todolists.forEach((el) => {
                dispatch(getTasksTC(el.id))
            })
        })
}
export const updateTodolistTC = (todoListId: string, newTodoListTitle: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.updateTodolist(todoListId, newTodoListTitle)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodoListTitleAC(todoListId, newTodoListTitle))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error.message, dispatch)
        })
}
export const createTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.createTodolist(title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTodoListAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error.message, dispatch)
        })
}
export const deleteTodolistTC = (id: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(id, 'loading'))
    todolistAPI.deleteTodoList(id)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodoListAC(id))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            dispatch(changeTodolistEntityStatusAC(id, 'idle'))
            handleServerNetworkError(error.message, dispatch)
        })
}

type ActionsType = ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeTodoListFilterAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>
    | SetTodolistsActionType
    | clearTodoListsDataType