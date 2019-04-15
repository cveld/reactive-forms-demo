import { IDateModel } from "./date-model.interface";
import { IDate } from "./date.interface";
export declare class DateModel implements IDateModel {
    date: IDate;
    jsdate: Date;
    formatted: string;
    epoc: number;
}
