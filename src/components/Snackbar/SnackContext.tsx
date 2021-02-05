import React from "react"
import {Snackbar} from "."

export interface IPayload {
    type:"error" | "info" | "success" | "warning" | "";
    message:string
}

export interface IAlert {
    payload:IPayload;
    open:boolean;
    handleOpen?(arg:IPayload) :void
}


export const AlertContext = React.createContext<IAlert>({
    payload:{
        type:"",
        message:""
    },
    open:false
})


const SnackProvider = <P extends object>(Component: React.ComponentType<P>) => {
    return function Provider({...props}){
        const [alert,setAlert] = React.useState<IPayload>({
            type:"",
            message:""
        })
        const [openSnackbar,setOpenSnackbar] = React.useState(false)    
        const handleSnackbar = (payload:IPayload):void => {
            setOpenSnackbar(true)
            setAlert(payload)
            setTimeout(() => {
              setOpenSnackbar(false)
            },4000)
        }
        return(
            <AlertContext.Provider value={{
                payload:alert,open:openSnackbar,
                handleOpen:handleSnackbar}} >
                    <Snackbar handleOpen={handleSnackbar} open={openSnackbar} payload={alert} />
                    <Component {...props as P} />
            </AlertContext.Provider>
        )
    }
}

export default SnackProvider