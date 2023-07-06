import {Dispatch} from "redux";
import {todolistAPI, TodolistType,} from "../api/todolist-api";

type ActionsType = ReturnType<typeof removeTodoListAC> |
    ReturnType<typeof addTodoListAC> |
    ReturnType<typeof changeTodoListTitleAC> |
    ReturnType<typeof changeTodoListFilterAC> |
    SetTodolistsActionType

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}
const initialState: TodolistDomainType[] = []

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: ActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => ({
                ...tl,
                filter: 'all'
            }))
        }
        case 'REMOVE-TODOLIST':
            return state.filter(el => el.id !== action.payload.id)
        case 'ADD-TODOLIST':
            return [{...action.payload.item, filter: 'all'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(el => el.id === action.payload.id
                ? {...el, title: action.payload.newTodolistTitle}
                : el)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(el => el.id === action.payload.id
                ? {...el, filter: action.payload.newFilter}
                : el)
        default:
            return state
    }
}

export const removeTodoListAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id
        }
    } as const
}
export const addTodoListAC = (item: TodolistType) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            item
        }
    } as const
}
export const changeTodoListTitleAC = (id: string, newTodolistTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id,
            newTodolistTitle
        }
    } as const
}
export const changeTodoListFilterAC = (id: string, newFilter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id,
            newFilter
        }
    } as const
}

type SetTodolistsActionType = {
    type: 'SET-TODOLISTS'
    todolists: Array<TodolistType>
}
export const setTodolistsAC = (todolists: TodolistType[]): SetTodolistsActionType => {
    return {type: 'SET-TODOLISTS', todolists}
}
export const getTodolistsTC = () => (dispatch: Dispatch) => {
    todolistAPI.getTodolist().then((res) => {
        dispatch(setTodolistsAC(res.data))
    })
}
export const updateTodolistTC = (todoListId: string, newTodoListTitle: string) => (dispatch: Dispatch) => {
    todolistAPI.updateTodolist(todoListId, newTodoListTitle).then((res) => {
        dispatch(changeTodoListTitleAC(todoListId, newTodoListTitle))
    })
}
export const createTodolistTC = (title: string) => (dispatch: Dispatch) => {
    todolistAPI.createTodolist(title).then((res) => {
        dispatch(addTodoListAC(res.data.data.item))
    })
}
export const deleteTodolistTC = (id: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTodoList(id).then((res) => {
        dispatch(removeTodoListAC(id))
    })
}
