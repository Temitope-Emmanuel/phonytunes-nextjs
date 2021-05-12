import firebase from "firebase"
import {DataBaseModel} from "./BaseModel"

export interface IAccount extends DataBaseModel {
    username:string;
    email:string;
    phoneNumber:number;
    providerData:any[]
    profileImage:string;
    favorite:boolean;
    referralNumber:string;
    role:"Admin" | "User"
}