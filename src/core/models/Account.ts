import firebase from "firebase"

export interface IAccount {
    username:string;
    email:string;
    pictureUrl:string;
    referralNumber:string;
    roles:string[];
    cards:string[];
    referralCount:number;
    createdAt:ReturnType<typeof firebase.firestore.FieldValue.serverTimestamp>
}