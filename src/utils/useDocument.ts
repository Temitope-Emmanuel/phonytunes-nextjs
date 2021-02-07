import React from "react"
import firebaseContext from "../firebase/context"
import {AlertContext} from "../components/Snackbar/SnackContext"
import {collectionType} from "./useCollection"

interface collectionArg {
    collectionName:collectionType;
    documentId:string
}

const useDocument = ({collectionName,documentId}:collectionArg) => {
    const [document,setDocument] = React.useState()
    const firebaseClass = React.useContext(firebaseContext)
    const alert = React.useContext(AlertContext)
    const documentRef = firebaseClass.firestore.collection(collectionName).doc(documentId)

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
            alert.handleOpen({
                message:`${collectionName} deleted succesful`,
                type:"success"
            })
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