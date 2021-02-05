import React from "react"
import firebaseContext from "../firebase/context"
import {AlertContext} from "../components/Snackbar/SnackContext"

type collectionType = "blogs" | "cards" | "users" |"referral" | "comments" | "rates"

const useCollection = (collectionId:collectionType,addListener = false) => {
    const [documentsInCollection,setDocumentsInCollection] = React.useState([])
    const firebaseClass = React.useContext(firebaseContext)
    const alert = React.useContext(AlertContext)
    const collectionRef = firebaseClass.firestore.collection(collectionId)
    let snapListener;
    

    const loadCollection = async () => {
        if(addListener){
            snapListener = collectionRef.orderBy("createdAt","desc").limit(1).onSnapshot(snap => {
                const result = [];
                console.log("this is the docs snap",snap.docs)
                snap.docs.map(doc => {
                    doc.data().createdAt && result.push({...doc.data(),id:doc.id})
                })
    
                setDocumentsInCollection([...result])
            },err => {
                setDocumentsInCollection([])
                alert.handleOpen({
                    message:`Something went wrong:${err.message}`,
                    type:"error"
                })
            })
        }else{
            try{
                const response =  await collectionRef.get()
                const result = response.docs.map(item => ({
                    ...item.data(),id:item.id
                }))
                setDocumentsInCollection([...result])
            }catch(err){
                alert.handleOpen({
                    message:`Something went wrong:${err.message}`,
                    type:"error"
                })
            }
        }
    }
    const createDocument = async (arg:any) => {
        try{
            const response = await collectionRef.add(arg)
            return response
        }catch(err){
            throw err
        }
    }

    React.useEffect(() => {
        return () => {
            if(snapListener){
                snapListener()
            }
        }
    },[])
    return {documentsInCollection,loadCollection,createDocument}
}

export default useCollection