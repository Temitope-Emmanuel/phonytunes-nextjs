import React from "react"
import Firebase from "./firebase"

const createFirebase = () => {
    let firebase = null;
    if(!firebase || typeof window === "undefined"){
        firebase = new Firebase()
    }
    return firebase
}

const FirebaseContext = React.createContext<Firebase | null>(null)

export const FirebaseProvider = <P extends object>(Component:React.ComponentType<P>) => {
    const firebase = createFirebase()
    return function Proivder({...props}){
        return (
            <FirebaseContext.Provider value={firebase} >
                <Component {...props as P} />
            </FirebaseContext.Provider>
        )
    }
}

export default FirebaseContext