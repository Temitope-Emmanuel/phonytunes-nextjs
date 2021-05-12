import { IAlert } from "core/models/Alert"
import {
    ActionTypes,createNotificationAction,deleteNotificationAction,
    deleteAllNotificationAction,getNotificationAction,setAlertAction,
    setBreakpointAction,breakpoints,addAlertAction
} from "./types"

export function createNotification(payload:string):createNotificationAction{
    return({
        type:ActionTypes.CREATE_NOTIFICATION,
        payload
    })
}
export function createAlert(arg:IAlert):addAlertAction{
    return({
        type:ActionTypes.ADD_ALERT,
        payload:arg
    })
}
export function getAllAlert(arg:IAlert[]):setAlertAction{
    return({
        type:ActionTypes.SET_ALERT,
        payload:arg
    })
}
export function deleteNotification(payload:string):deleteNotificationAction{
    return{
        type:ActionTypes.DELETE_NOTIFICATION,
        payload
    }
}
export function deleteAllNotification():deleteAllNotificationAction{
    return {
        type:ActionTypes.DELETE_ALL_NOTIFICATION
    }
}
export function getAllNotification(payload:string[]):getNotificationAction{
    return {
        type:ActionTypes.GET_NOTIFICATION,
        payload
    }
}

export function setBreakpoint(arg:breakpoints):setBreakpointAction{
    return({
        type:ActionTypes.SET_BREAKPOINT,
        payload:arg
    })
}