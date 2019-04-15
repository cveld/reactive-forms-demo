import { IWeekday } from "./weekday.interface";
export interface ICalendarViewChanged {
    year: number;
    month: number;
    first: IWeekday;
    last: IWeekday;
}
