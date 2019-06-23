import { IDate } from './date.interface';

export interface IDateModel {
    date: IDate;
    jsdate: Date;
    formatted: string;
    epoc: number;
}
