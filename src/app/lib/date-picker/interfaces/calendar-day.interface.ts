import { IDate } from "./date.interface";
import { IMarkedDate } from "./marked-date.interface";

export interface ICalendarDay {
    dateObj: IDate;
    cmo: number;
    currDay: boolean;
    disabled: boolean;
    markedDate: IMarkedDate;
    highlight: boolean;
}