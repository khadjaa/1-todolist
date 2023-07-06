import {v1} from "uuid";
import {Dispatch} from "redux";
import {todolistAPI, TodolistType,} from "../api/todolist-api";

const initialState: TodolistDomainType[] = []
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

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

type ActionsType = ReturnType<typeof removeTodoListAC> |
    ReturnType<typeof addTodoListAC> |
    ReturnType<typeof changeTodoListTitleAC> |
    ReturnType<typeof changeTodoListFilterAC> |
    SetTodolistsActionType

export const removeTodoListAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id
        }
    } as const
}

export const _addTodoListAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title,
            id: v1()
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

export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS'
    todolists: Array<TodolistType>
}

export const setTodolistsAC = (todolists: Array<TodolistType>): SetTodolistsActionType => {
    return {type: 'SET-TODOLISTS', todolists}
}

export const getTodolistsTC = () => (dispatch: Dispatch) => {
    todolistAPI.getTodolist().then((res) => {
        dispatch(setTodolistsAC(res.data))
    })
}

export const changeTodolistTC = (todoListId: string, newTodoListTitle: string) => (dispatch: Dispatch) => {
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
