import {Dispatch} from "redux";
import {todolistAPI, TodolistType,} from "../../api/todolist-api";
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "../../app/app-reducer";

type ActionsType = ReturnType<typeof removeTodoListAC> |
    ReturnType<typeof addTodoListAC> |
    ReturnType<typeof changeTodoListTitleAC> |
    ReturnType<typeof changeTodoListFilterAC> |
    SetTodolistsActionType | ReturnType<typeof changeTodolistEntityStatusAC>

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
    return {type: 'SET-TODOLISTS', todolists}
}
const changeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType) => ({
    type: 'CHANGE-TODOLIST-ENTITY-STATUS',
    id,
    entityStatus
} as const)
export const getTodolistsTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.getTodolist().then((res) => {
        dispatch(setTodolistsAC(res.data))
        dispatch(setAppStatusAC('succeeded'))
    })
}
export const updateTodolistTC = (todoListId: string, newTodoListTitle: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.updateTodolist(todoListId, newTodoListTitle).then((res) => {
        dispatch(changeTodoListTitleAC(todoListId, newTodoListTitle))
        dispatch(setAppStatusAC('succeeded'))
    })
}
export const createTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.createTodolist(title).then((res) => {
        if (res.data.resultCode === 0) {
            dispatch(addTodoListAC(res.data.data.item))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            if (res.data.messages.length) {
                dispatch(setAppErrorAC(res.data.messages[0]))
            } else {
                dispatch(setAppErrorAC('Some error occurred'))
            }
            dispatch(setAppStatusAC('failed'))
        }

    })
}
export const deleteTodolistTC = (id: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(id, 'loading'))
    todolistAPI.deleteTodoList(id).then((res) => {
        dispatch(removeTodoListAC(id))
        dispatch(setAppStatusAC('succeeded'))
    })

}
