import {IBaseModel} from "./BaseModel"

export interface IBlog extends IBaseModel {
    title:string;
    content:string;
}