import { IDateModel } from "./date-model.interface";
import { IDate } from "./date.interface";

export class DateModel implements IDateModel{
    date: IDate;
    jsdate: Date;
    formatted: string;
    epoc: number;  
}