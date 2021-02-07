import {IBaseModel} from "./BaseModel"
import {IChat} from "./Chat"
export interface ITransaction extends IBaseModel {
    imageUrl:string;
    filePath:string;
    author:string;
    status:"Pending" | "Success" | "Denied"
    chats:IChat[];
}