import {TodolistType} from "../App";
import {v1} from "uuid";

type ActionType = {
    type: string
    [key: string]: any
}

export const TodoListsReducer = (state: TodolistType[], action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(el => el.id !== action.id)
        case 'ADD-TODOLIST':
            const newTodolist = {id: v1(), title: action.title, filter: 'all'}
            return [newTodolist, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(el => el.id === action.id
                ? {...el, title: action.title}
                : el)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(el => el.id === action.id
                ? {...el, filter: action.filter}
                : el)
        default:
            throw new Error('I don\'t understand this type')
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