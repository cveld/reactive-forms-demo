import { EventEmitter, OnChanges, SimpleChanges, ElementRef, ChangeDetectorRef, Renderer } from "@angular/core";
import { ControlValueAccessor } from "@angular/forms";
import { IDate, IMonth, ICalendarMonth, ICalendarYear, IWeek, IOptions, IDateModel, IInputFieldChanged, ICalendarViewChanged, IInputFocusBlur } from "../interfaces/index";
import { LocaleService } from "../services/date-picker.locale.service";
import { UtilService } from "../services/date-picker.util.service";
export declare const MYDP_VALUE_ACCESSOR: any;
export declare class DatePicker implements OnChanges, ControlValueAccessor {
    elem: ElementRef;
    private renderer;
    private cdr;
    private localeService;
    private utilService;
    options: IOptions;
    locale: string;
    defaultMonth: string;
    selDate: string;
    placeholder: string;
    selector: number;
    disabled: boolean;
    dateChanged: EventEmitter<IDateModel>;
    inputFieldChanged: EventEmitter<IInputFieldChanged>;
    calendarViewChanged: EventEmitter<ICalendarViewChanged>;
    calendarToggle: EventEmitter<number>;
    inputFocusBlur: EventEmitter<IInputFocusBlur>;
    selectorEl: ElementRef;
    inputBoxEl: ElementRef;
    geasocieerdeLabel: string;
    onChangeCb: (_: any) => void;
    onTouchedCb: () => void;
    showSelector: boolean;
    visibleMonth: IMonth;
    selectedMonth: IMonth;
    selectedDate: IDate;
    weekDays: Array<string>;
    dates: Array<IWeek>;
    months: Array<Array<ICalendarMonth>>;
    years: Array<Array<ICalendarYear>>;
    selectionDayTxt: string;
    invalidDate: boolean;
    disableTodayBtn: boolean;
    dayIdx: number;
    userInput: string;
    selectMonth: boolean;
    selectYear: boolean;
    prevMonthDisabled: boolean;
    nextMonthDisabled: boolean;
    prevYearDisabled: boolean;
    nextYearDisabled: boolean;
    prevYearsDisabled: boolean;
    nextYearsDisabled: boolean;
    prevMonthId: number;
    currMonthId: number;
    nextMonthId: number;
    opts: IOptions;
    constructor(elem: ElementRef, renderer: Renderer, cdr: ChangeDetectorRef, localeService: LocaleService, utilService: UtilService);
    setLocaleOptions(): void;
    setOptions(): void;
    getSelectorTopPosition(): string;
    resetMonthYearSelect(): void;
    onSelectMonthClicked(event: any): void;
    onMonthCellClicked(cell: ICalendarMonth): void;
    onMonthCellKeyDown(event: any, cell: ICalendarMonth): void;
    onSelectYearClicked(event: any): void;
    onYearCellClicked(cell: ICalendarYear): void;
    onYearCellKeyDown(event: any, cell: ICalendarYear): void;
    onPrevYears(event: any, year: number): void;
    onNextYears(event: any, year: number): void;
    generateYears(year: number): void;
    onUserDateInput(value: string): void;
    onFocusInput(event: any): void;
    onBlurInput(event: any): void;
    onCloseSelector(event: any): void;
    invalidInputFieldChanged(value: string, date: IDate, fromDb: boolean): void;
    triggerChange(date: IDate): void;
    isTodayDisabled(): void;
    parseOptions(): void;
    writeValue(value: any): void;
    setDisabledState(disabled: boolean): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    ngOnChanges(changes: SimpleChanges): void;
    removeBtnClicked(): void;
    onDecreaseBtnClicked(): void;
    onIncreaseBtnClicked(): void;
    openBtnClicked(): void;
    openSelector(reason: number): void;
    closeSelector(reason: number): void;
    setVisibleMonth(): void;
    onPrevMonth(): void;
    onNextMonth(): void;
    onPrevYear(): void;
    onNextYear(): void;
    onTodayClicked(): void;
    onCellClicked(cell: any): void;
    onCellKeyDown(event: any, cell: any): void;
    clearDate(): void;
    decreaseIncreaseDate(decrease: boolean): void;
    selectDate(date: IDate, closeReason: number, fromDb: boolean): void;
    setFocusToInputBox(): void;
    updateDateValue(date: IDate, clear: boolean, fromDb: boolean): void;
    getDateModel(date: IDate): IDateModel;
    preZero(val: string): string;
    formatDate(val: any): string;
    formatDay(val: any, formatted: string): string;
    formatMonth(val: any, formatted: string): string;
    monthText(m: number): string;
    monthStartIdx(y: number, m: number): number;
    daysInMonth(m: number, y: number): number;
    daysInPrevMonth(m: number, y: number): number;
    isCurrDay(d: number, m: number, y: number, cmo: number, today: IDate): boolean;
    getToday(): IDate;
    getTimeInMilliseconds(date: IDate): number;
    getWeekday(date: IDate): string;
    getDate(year: number, month: number, day: number): Date;
    sundayIdx(): number;
    generateCalendar(m: number, y: number, notifyChange: boolean): void;
    parseSelectedDate(selDate: any): IDate;
    jsDateToMyDate(date: Date): IDate;
    parseSelectedMonth(ms: string): IMonth;
    setHeaderBtnDisabledState(m: number, y: number): void;
}
