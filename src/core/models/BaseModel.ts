import firebase from "firebase"

export interface IBaseModel {
    createdAt:ReturnType<typeof firebase.firestore.FieldValue.serverTimestamp>
    id?:string;
}