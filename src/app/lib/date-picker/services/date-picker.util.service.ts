import { Injectable } from "@angular/core";
import { IDate } from "../interfaces/date.interface";
import { IDateRange } from "../interfaces/date-range.interface";
import { IMonth } from "../interfaces/month.interface";
import { IMonthLabels } from "../interfaces/month-labels.interface";
import { IMarkedDates } from "../interfaces/marked-dates.interface";
import { IMarkedDate } from "../interfaces/marked-date.interface";

const M = "m";
var MM = "mm";
const MMM = "mmm";
var DD = "dd";
const YYYY = "yyyy";
var SEPARATOR = "-";
@Injectable()
export class UtilService {
    weekDays: Array<string> = ["su", "mo", "tu", "we", "th", "fr", "sa"];

    isDateValid(dateStr: string, dateFormat: string, minYear: number, maxYear: number, disableUntil: IDate, disableSince: IDate, disableWeekends: boolean, disableWeekDays: Array<string>, disableDays: Array<IDate>, disableDateRanges: Array<IDateRange>, monthLabels: IMonthLabels, enableDays: Array<IDate>): IDate {
        MM = this.getFormattedToken(dateFormat, "m");
        DD = this.getFormattedToken(dateFormat, "d");
        let returnDate: IDate = { day: 0, month: 0, year: 0, input: dateStr };
        let daysInMonth: Array<number> = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let separators: Array<string> = this.getDateFormatSeparators(dateFormat);
        SEPARATOR = separators[0];
        var dayMonthYear = this.parseDatePartsToNumbers(dateFormat, dateStr);
        let month: number = dayMonthYear[1];
        
        let day: number = dayMonthYear[0];
        let year: number = dayMonthYear[2];

        if (month !== -1 && day !== -1 && year !== -1) {
            if (year < minYear || year > maxYear || month < 1 || month > 12) {
                return returnDate;
            }

            let date: IDate = { year: year, month: month, day: day, input: dateStr };

            if (this.isDisabledDay(date, minYear, maxYear, disableUntil, disableSince, disableWeekends, disableWeekDays, disableDays, disableDateRanges, enableDays)) {
                return returnDate;
            }

            if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
                daysInMonth[1] = 29;
            }

            if (day < 1 || day > daysInMonth[month - 1]) {
                return returnDate;
            }

            // Valid date
            return date;
        }
        return returnDate;
    }

    getDateFormatSeparators(dateFormat: string): Array<string> {
        return dateFormat.match(/[^(dmy)]{1,}/g);
    }

    changeDateFormat(dateFormat: string, len: number): string {
        let mp: string = "";
        for (let i = 0; i < len; i++) {
            mp += M;
        }
        return dateFormat.replace(MMM, mp);
    }

    isMonthLabelValid(monthLabel: string, monthLabels: IMonthLabels): number {
        for (let key = 1; key <= 12; key++) {
            if (monthLabel.toLowerCase() === monthLabels[key].toLowerCase()) {
                return key;
            }
        }
        return -1;
    }

    getFormattedToken(val: string, token: string): string {
        let index = val.lastIndexOf(token);
        if (index === -1) return "";
        let retVal: string = val.charAt(index);


        for (let i = index + 1; i < val.length; i++) {
            let char = val.charAt(i);
            if (char === token) {
                retVal += char;
            } else {
                break;
            }
        }

        return retVal;
    }

    isYearLabelValid(yearLabel: number, minYear: number, maxYear: number): number {
        if (yearLabel >= minYear && yearLabel <= maxYear) {
            return yearLabel;
        }
        return -1;
    }

    parseDatePartsToNumbers(dateFormat: string, dateString: string): number[] {
        let dayMonthYear: number[] = [0, 0, 0];
        let data = dateString.split(SEPARATOR);
        if (data == undefined ||
            data.length !== 3 || isNaN(Number(data[0])) || isNaN(Number(data[1])) || isNaN(Number(data[2]))) {
            return dayMonthYear;
        }
        let formatLowerCase = dateFormat.toLowerCase();
        let formatItems = formatLowerCase.split(SEPARATOR);
        let dateItems = dateString.split(SEPARATOR);
        let monthIndex = formatItems.indexOf(MM);
        let dayIndex = formatItems.indexOf(DD);
        let yearIndex = formatItems.indexOf(YYYY);
        let day = Number(dateItems[dayIndex]);
        let month = Number(dateItems[monthIndex]);
        let year = Number(dateItems[yearIndex]);

        dayMonthYear[0] = day;
        dayMonthYear[1] = month;
        dayMonthYear[2] = year;

        return dayMonthYear;
    }

    parseDatePartMonthName(dateFormat: string, dateString: string, datePart: string, monthLabels: IMonthLabels): number {
        let monthLabel: string = "";
        let start: number = dateFormat.indexOf(datePart);
        if (dateFormat.substr(dateFormat.length - 3) === MMM) {
            monthLabel = dateString.substring(start);
        }
        else {
            let end: number = dateString.indexOf(dateFormat.charAt(start + datePart.length), start);
            monthLabel = dateString.substring(start, end);
        }
        return this.isMonthLabelValid(monthLabel, monthLabels);
    }

    parseDefaultMonth(monthString: string): IMonth {
        let month: IMonth = {monthTxt: "", monthNbr: 0, year: 0};
        if (monthString !== "") {
            let split = monthString.split(monthString.match(/[^0-9]/)[0]);
            month.monthNbr = split[0].length === 2 ? parseInt(split[0]) : parseInt(split[1]);
            month.year = split[0].length === 2 ? parseInt(split[1]) : parseInt(split[0]);
        }
        return month;
    }

    isDisabledDay(date: IDate, minYear: number, maxYear: number, disableUntil: IDate, disableSince: IDate, disableWeekends: boolean, disableWeekDays: Array<string>, disableDays: Array<IDate>, disableDateRanges: Array<IDateRange>, enableDays: Array<IDate>): boolean {
        for (let e of enableDays) {
            if (e.year === date.year && e.month === date.month && e.day === date.day) {
                return false;
            }
        }

        let dn = this.getDayNumber(date);

        if (date.year < minYear && date.month === 12 || date.year > maxYear && date.month === 1) {
            return true;
        }

        let dateMs: number = this.getTimeInMilliseconds(date);
        if (this.isInitializedDate(disableUntil) && dateMs <= this.getTimeInMilliseconds(disableUntil)) {
            return true;
        }

        if (this.isInitializedDate(disableSince) && dateMs >= this.getTimeInMilliseconds(disableSince)) {
            return true;
        }

        if (disableWeekends) {
            if (dn === 0 || dn === 6) {
                return true;
            }
        }

        if (disableWeekDays.length > 0) {
            for (let wd of disableWeekDays) {
                if (dn === this.getWeekdayIndex(wd)) {
                    return true;
                }
            }
        }

        for (let d of disableDays) {
            if (d.year === date.year && d.month === date.month && d.day === date.day) {
                return true;
            }
        }

        for (let d of disableDateRanges) {
            if (this.isInitializedDate(d.begin) && this.isInitializedDate(d.end) && dateMs >= this.getTimeInMilliseconds(d.begin) && dateMs <= this.getTimeInMilliseconds(d.end)) {
                return true;
            }
        }
        return false;
    }

    isMarkedDate(date: IDate, markedDates: Array<IMarkedDates>, markWeekends: IMarkedDate): IMarkedDate {
        for (let md of markedDates) {
            for (let d of md.dates) {
                if (d.year === date.year && d.month === date.month && d.day === date.day) {
                    return {marked: true, color: md.color};
                }
            }
        }
        if (markWeekends && markWeekends.marked) {
            let dayNbr = this.getDayNumber(date);
            if (dayNbr === 0 || dayNbr === 6) {
                return {marked: true, color: markWeekends.color};
            }
        }
        return {marked: false, color: ""};
    }

    isHighlightedDate(date: IDate, sunHighlight: boolean, satHighlight: boolean, highlightDates: Array<IDate>): boolean {
        let dayNbr: number = this.getDayNumber(date);
        if (sunHighlight && dayNbr === 0 || satHighlight && dayNbr === 6) {
            return true;
        }
        for (let d of highlightDates) {
            if (d.year === date.year && d.month === date.month && d.day === date.day) {
                return true;
            }
        }
        return false;
    }

    getWeekNumber(date: IDate): number {
        let d: Date = new Date(date.year, date.month - 1, date.day, 0, 0, 0, 0);
        d.setDate(d.getDate() + (d.getDay() === 0 ? -3 : 4 - d.getDay()));
        return Math.round(((d.getTime() - new Date(d.getFullYear(), 0, 4).getTime()) / 86400000) / 7) + 1;
    }

    isMonthDisabledByDisableUntil(date: IDate, disableUntil: IDate): boolean {
        return this.isInitializedDate(disableUntil) && this.getTimeInMilliseconds(date) <= this.getTimeInMilliseconds(disableUntil);
    }

    isMonthDisabledByDisableSince(date: IDate, disableSince: IDate): boolean {
        return this.isInitializedDate(disableSince) && this.getTimeInMilliseconds(date) >= this.getTimeInMilliseconds(disableSince);
    }

    isInitializedDate(date: IDate): boolean {
        return date.year !== 0 && date.month !== 0 && date.day !== 0;
    }

    isSameDate(d1: IDate, d2: IDate): boolean {
        return d1.year === d2.year && d1.month === d2.month && d1.day === d2.day;
    }

    getTimeInMilliseconds(date: IDate): number {
        return new Date(date.year, date.month - 1, date.day, 0, 0, 0, 0).getTime();
    }

    getDayNumber(date: IDate): number {
        let d: Date = new Date(date.year, date.month - 1, date.day, 0, 0, 0, 0);
        return d.getDay();
    }

    getWeekDays(): Array<string> {
        return this.weekDays;
    }

    getWeekdayIndex(wd: string) {
        return this.weekDays.indexOf(wd);
    }
}