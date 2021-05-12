import { DataBaseModel } from "./BaseModel";

export interface Transaction extends DataBaseModel {
    comment:string;
    file:{downloadURL:string,fullPath:string}[];
    type:"giftcard" | "cryptocurrency",
    status:"Pending" | "Rejected" | "Successful",
    reason?:string;
    cardCategory?:string;
    subCategory?:{
        name:string;
        cost:number;
    },
    user:{
        username:string;
        email:string;
        id:string
    }
}