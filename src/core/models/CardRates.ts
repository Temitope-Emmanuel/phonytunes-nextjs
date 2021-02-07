export interface IPrice {
    name:string;
    price:number
}

export interface IRates {
    name:string;
    rates:{
        [key:string]:string
    }
}