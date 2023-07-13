export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        case "APP/SET-INITIALIZE":
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

export type SetLoadingStatusType = ReturnType<typeof setAppStatusAC>
export type SetErrorStatusType = ReturnType<typeof setAppErrorAC>
export type setIsInitializedStatusType = ReturnType<typeof setIsInitializedAC>
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setIsInitializedAC = (isInitialized: boolean) => ({type: 'APP/SET-INITIALIZE', isInitialized} as const)

type ActionsType = SetLoadingStatusType
    | SetErrorStatusType
    | setIsInitializedStatusType