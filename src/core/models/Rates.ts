import {DataBaseModel} from "./BaseModel"

export interface IRates extends DataBaseModel {
    cardCategory:string;
    subCategory:{
        [key:string]:number
    }[]
}