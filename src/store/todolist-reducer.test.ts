import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todolistsReducer
} from './todolist-reducer'
import {v1} from 'uuid'
import {FilterValuesType, TodolistType} from '../App'

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistType>

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    startState =  [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]
})

test('correct todolist should be removed', () => {
    // const endState = TodoListsReducer(startState, {type: 'REMOVE-TODOLIST', id: todolistId1})
    const endState = todolistsReducer(startState, removeTodoListAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    let newTodolistTitle = 'New Todolist'

    const endState = todolistsReducer(startState, addTodoListAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
})

test('correct todolist should change its name', () => {
    let newTodolistTitle = 'New Todolist'

    const action = {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId2,
        title: newTodolistTitle
    }

    const endState = todolistsReducer(startState, changeTodoListTitleAC(action.id, action.title))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = 'completed'

    const action = {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId2,
        filter: newFilter
    }

    const endState = todolistsReducer(startState, changeTodoListFilterAC(action.id, action.filter))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})