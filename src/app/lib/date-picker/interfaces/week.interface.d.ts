import { ICalendarDay } from "./calendar-day.interface";
export interface IWeek {
    week: Array<ICalendarDay>;
    weekNbr: number;
}
