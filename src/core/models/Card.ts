import {IComment} from "./Comment"
export interface ICard {
    image:string;
    owner:string;
    id:string;
    name:string;
    status:string;
    createdAt:Date;
    comments:IComment[];
}
  