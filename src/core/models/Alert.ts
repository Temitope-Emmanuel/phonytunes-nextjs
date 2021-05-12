import { IBaseModel } from "./BaseModel";

export interface IAlert extends IBaseModel {
    person:{
        username:string;
        role:string;
        email:string;
        imageURL:string;
        phoneNumber:string;
        id:string;
    };
    status:"Pending" | "Resolved" | "Reject";
    location:{
        lng:number;
        lat:number;
        geohash:string
    };
}