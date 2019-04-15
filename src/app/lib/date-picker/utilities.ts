import { IDpOptions } from "./interfaces/index";

export class Utilities {
    datePickerOptions(): IDpOptions {
        return {
            dateFormat: 'd-m-yyyy',
            editableDateField: true,
            showClearDateBtn: false,
            dayLabels: { su: "Zo", mo: "Ma", tu: "Di", we: "Wo", th: "Do", fr: "Vr", sa: "Za" },
            monthLabels: { 1: "Jan", 2: "Feb", 3: "Maa", 4: "Apr", 5: "Mei", 6: "Jun", 7: "Jul", 8: "Aug", 9: "Sep", 10: "Okt", 11: "Nov", 12: "Dec" },
            showTodayBtn: false,
            sunHighlight: false,
            ariaLabelInputField: "dd-mm-jjjj",
            ariaLabelOpenCalendar: "Kies een datum",
            ariaLabelPrevMonth: "Voorgaande maand",
            ariaLabelNextMonth: "Volgende maand",
            ariaLabelPrevYear: "Voorgaande jaar",
            ariaLabelNextYear: "Volgende jaar",
        };
    }
}
