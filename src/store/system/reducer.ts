import { SystemState, Action, ActionTypes } from "./types"

const initialState: SystemState = {
    pageTitle:"",
    alerts:[],
    notification:[],
    currentBreakpoints:"base"
}


export function systemReducer(state = initialState, action: Action): SystemState {
    switch (action.type) {
        case ActionTypes.SET_ALERT:{
            return {
                ...state,
                alerts:[...action.payload]
            }
        }
        case ActionTypes.ADD_ALERT:{
            return{
                ...state,
                alerts:[...state.alerts,action.payload]
            }
        }
        case ActionTypes.SET_BREAKPOINT:{
            return {
                ...state,
                currentBreakpoints:action.payload
            }
        }
        case ActionTypes.CREATE_NOTIFICATION:{
            return {
                ...state,
                notification:[...state.notification,action.payload]
            }
        }
        case ActionTypes.GET_NOTIFICATION:{
            return {
                ...state,
                notification:[...action.payload]
            }
        }
        case ActionTypes.DELETE_NOTIFICATION:{
            return {
                ...state,
                notification:[...state.notification.filter(item => item !== action.payload)]
            }
        }
        case ActionTypes.DELETE_ALL_NOTIFICATION:{
            return {
                ...state,
                notification:[]
            }
        }
        case ActionTypes.SET_PAGE_TITLE:
            return {
                ...state,
                pageTitle:action.payload
            }
        default:
            return state;
    }
}