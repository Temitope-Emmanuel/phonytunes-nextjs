import React from "react"
import firebaseContext from "../firebase/context"
import {AlertContext} from "../components/Snackbar/SnackContext"

interface collectionType {
    id:string;
    [key:string]:any
}

// const useDocument = <T extends unknown>(x: T) => x
const useDocument = <T extends collectionType >(collectionId:string,documentId:string) => {
// const useDocument = (collectionId:string,documentId:string) => {
    const [document,setDocument] = React.useState<T>()
    const firebaseClass = React.useContext(firebaseContext)
    const alert = React.useContext(AlertContext)
    const documentRef = firebaseClass.firestore.collection(collectionId).doc(documentId)

    const updateDocument = async (arg:any) => {
        try{
            await documentRef.update(arg)
        }catch(err){
            alert.handleOpen({
                message:`Something went wrong:${err.message}`,
                type:"error"
            })
        }
    }
    const readDocument = () => {
        try{
            documentRef.onSnapshot(doc => {
                if(doc.exists){
                    setDocument({...doc.data(),id:doc.id} as any)
                }
            })
        }catch(err){
            alert.handleOpen({
                message:`Something went wrong:${err.message}`,
                type:"error"
            })
        }
    }
    const deleteDocument = async () => {
        try{
            await documentRef.delete()
        }catch(err){
            alert.handleOpen({
                message:`Something went wrong:${err.message}`,
                type:"error"
            })
        }
    }

    return {document,updateDocument,readDocument,deleteDocument}
}

export default useDocument