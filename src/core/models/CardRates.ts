import firebase from "firebase"
export interface IPrice {
    name:string;
    price:number
}

export interface IRates {
    name:string;
    createdAt:ReturnType<typeof firebase.firestore.FieldValue.serverTimestamp>
    rates:{
        [key:string]:string
    }
}