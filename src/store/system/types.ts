import {IAccount} from "core/models/Account"
import { IAlert } from "core/models/Alert"

export type breakpoints = "base" | "sm" | "md" | "lg" | "xl"

export interface SystemState {
    pageTitle:string;
    alerts:IAlert[]
    notification:string[];
    currentBreakpoints:breakpoints
}

export enum ActionTypes {
    SET_PAGE_TITLE = "[System] SetPageTitle",
    SET_ALERT = "[System] SetAlert",
    ADD_ALERT = "[System] AddAlert",
    GET_NOTIFICATION = "[Systen] GET_NOTIFICATION",
    CREATE_NOTIFICATION = "[System] CREATE_NOTIFICATION",
    DELETE_NOTIFICATION = "[System] DELETE_NOTIFICATION",
    DELETE_ALL_NOTIFICATION = '[System] DELETE_ALL_NOTIFICATION',
    SET_BREAKPOINT = "[System] SET_BREAKPOINT"
}

export interface SetTitleAction {
    type:ActionTypes.SET_PAGE_TITLE,
    payload:string
}
export interface setBreakpointAction {
    type:ActionTypes.SET_BREAKPOINT,
    payload:breakpoints
}
export interface getNotificationAction {
    type:ActionTypes.GET_NOTIFICATION,
    payload:string[]
}
export interface createNotificationAction {
    type:ActionTypes.CREATE_NOTIFICATION,
    payload:string
}
export interface deleteNotificationAction {
    type:ActionTypes.DELETE_NOTIFICATION,
    payload:any
}
export interface deleteAllNotificationAction {
    type:ActionTypes.DELETE_ALL_NOTIFICATION
}
export interface getNotificationAction {
    type:ActionTypes.GET_NOTIFICATION,
    payload:string[]
}
export interface setAlertAction { 
    type:ActionTypes.SET_ALERT,
    payload:IAlert[]
}
export interface addAlertAction {
    type:ActionTypes.ADD_ALERT,
    payload:IAlert
}

export type Action = SetTitleAction | deleteNotificationAction | deleteAllNotificationAction | addAlertAction |
 getNotificationAction | createNotificationAction | getNotificationAction | setAlertAction | setBreakpointAction