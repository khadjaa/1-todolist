export {}
// import {TasksStateType, TodolistType} from "../AppWithRedux";
// import {tasksReducer} from "../store/tasks-reducer";
// import {addTodoListAC, todolistsReducer} from "../store/todolists-reducer";

// test('ids should be equals', () => {
//     const startTasksState: TasksStateType = {}
//     const startTodolistsState: Array<TodolistType> = []
//
//     const action = addTodoListAC({})
//
//     const endTasksState = tasksReducer(startTasksState, action)
//     const endTodolistsState = todolistsReducer(startTodolistsState, action)
//
//     const keys = Object.keys(endTasksState)
//     const idFromTasks = keys[0]
//     const idFromTodolists = endTodolistsState[0].id
//
//     expect(idFromTasks).toBe(action.payload.item.id)
//     expect(idFromTodolists).toBe(action.payload.item.id)
// })