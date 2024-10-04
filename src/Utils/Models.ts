import { columnType } from "./Enums";

export interface taskModel{

    id:number,
    title:string,
    column:columnType,
    color:string
}