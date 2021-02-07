import React from "react"
import firebaseContext from "../firebase/context"
import {AlertContext} from "../components/Snackbar/SnackContext"

export type collectionType = "blogs" | "transactions" | "users" |"referral" | "comments" | "rates" | "cardRates"

interface collectionArgs{
    collectionName:collectionType;
    // orderBy?:{
    //     fieldValue:string;
    //     order:"asc" | "desc";
    // };
    limit?:number;
    query?:{
        selectField:string;
        filter:"==",
        selectValue:string
    };
    addListener?:boolean
}


const useCollection = ({collectionName,addListener,limit,query}:collectionArgs) => {
    const [documentsInCollection,setDocumentsInCollection] = React.useState([])
    const firebaseClass = React.useContext(firebaseContext)
    const alert = React.useContext(AlertContext)
    let collectionRef = firebaseClass.firestore.collection(collectionName)
    let snapListener;
    

    const loadCollection = async () => {
        if(typeof window !== "undefined"){
            let newCollectionRef = collectionRef.orderBy("createdAt","desc")
            if(limit){
                newCollectionRef = newCollectionRef.limit(limit)
            }
            if(query){
                newCollectionRef = newCollectionRef.where(query.selectField,query.filter,query.selectValue)
            }
            if(addListener){
                snapListener = newCollectionRef.onSnapshot(snap => {
                    const result = [];
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
                    const response =  await newCollectionRef.get()
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
    }
    const createDocument = async (arg:any) => {
        console.log("Calling the created document func",arg)
        try{
            const response = await collectionRef.add(arg)
            return response
        }catch(err){
            console.log("there's been an err",err)
            alert.handleOpen({
                message:`Something went wrong:${err.message}`,
                type:"error"
            })
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