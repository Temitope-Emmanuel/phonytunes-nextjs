import React from "react"
import firebaseContext from '../firebaseUtils/context'
import firebase from "firebase"

interface currentUser { 
    currentUser:firebase.User | null
}
const useUserAuth = () => {
    const firebaseClass = React.useContext(firebaseContext)
    const [currentUser,setCurrentUser] = React.useState<currentUser>({currentUser:null})

    const handleAuthChanges = (arg:currentUser) => {
        if(arg.currentUser){
            const response = firebaseClass.firestore.collection("users").doc(arg.currentUser.uid).get()
            const authUser = {
                id:arg.currentUser.uid,
                email:arg.currentUser.email,
                ...arg.currentUser,
                ...response
            }
            setCurrentUser({currentUser:authUser})
        }else{
            setCurrentUser({currentUser:null})
        }
    }
    React.useEffect(() => {
        firebaseClass.onAuthUserListener(setCurrentUser)
    },[])

    return {currentUser:currentUser.currentUser}
 }

 export default useUserAuth