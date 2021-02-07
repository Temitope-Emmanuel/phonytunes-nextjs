import firebase from "firebase"
import {IBaseModel} from "./BaseModel"

export interface IAccount extends IBaseModel {
    username:string;
    email:string;
    pictureUrl:string;
    referralNumber:string;
    roles:string[];
    cards:string[];
    referralCount:number;
    createdAt:ReturnType<typeof firebase.firestore.FieldValue.serverTimestamp>
}