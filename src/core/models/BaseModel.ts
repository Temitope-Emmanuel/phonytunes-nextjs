import firebase from "firebase"
export interface IBaseModel {
    className?:string;
    style?:object;
}

export interface DataBaseModel {
    id?:string;
    createdAt?:ReturnType<typeof firebase.firestore.FieldValue.serverTimestamp>;
}