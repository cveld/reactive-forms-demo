import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ElementRef, ViewEncapsulation, ChangeDetectorRef, Renderer, ViewChild, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import {
    IDate, IDateRange, IMonth, ICalendarDay, ICalendarMonth, ICalendarYear, IWeek, IDayLabels, IMonthLabels
    , IOptions, IDateModel, IInputFieldChanged, ICalendarViewChanged, IInputFocusBlur, IMarkedDates, IMarkedDate
} from "../interfaces/index";
import { LocaleService } from "../services/date-picker.locale.service";
import { UtilService } from "../services/date-picker.util.service";

export const MYDP_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatePicker),
    multi: true
};

enum CalToggle { Open = 1, CloseByDateSel = 2, CloseByCalBtn = 3, CloseByOutClick = 4, CloseByEsc = 5, CloseByApi = 6 }
enum Year { min = 1000, max = 9999 }
enum InputFocusBlur { focus = 1, blur = 2 }
enum KeyCode { enter = 13, esc = 27, space = 32 }
enum MonthId { prev = 1, curr = 2, next = 3 }

var MM = "mm";
const MMM = "mmm";
var DD = "dd";
const YYYY = "yyyy";

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: "date-picker",
    styles: [`
        .mydp {
    line-height: 1.1;
    display: inline-block;
    position: relative;
}

.mydp * {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
    padding: 0;
    margin: 0;
}

.mydp,
.mydp .selectiongroup,
.mydp .selection,
.mydp .selector,
.mydp .headertodaybtn {
    border-radius: 4px;
}

.mydp .header {
    border-radius: 4px 4px 0 0;
}

.mydp .caltable,
.mydp .monthtable,
.mydp .yeartable {
    border-radius: 0 0 4px 4px;
}

.mydp .caltable tbody tr:nth-child(6) td:first-child,
.mydp .monthtable tbody tr:nth-child(4) td:first-child,
.mydp .yeartable tbody tr:nth-child(7) td:first-child {
    border-bottom-left-radius: 4px;
}

.mydp .caltable tbody tr:nth-child(6) td:last-child,
.mydp .monthtable tbody tr:nth-child(4) td:last-child,
.mydp .yeartable tbody tr:nth-child(7) td:last-child {
    border-bottom-right-radius: 4px;
}

.mydp .btnpicker {
    border-radius: 0 4px 4px 0;
}

.mydp .btnleftborderradius {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
}

.mydp .selector {
    margin-top: 2px;
    margin-left: -1px;
    position: absolute;
    padding: 0;
    border: 1px solid #CCC;
    z-index: 100;
    animation: selectorfadein 0.1s;
}

.mydp .selector:focus {
    border: 1px solid #ADD8E6;
    outline: none;
}

@keyframes selectorfadein {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.mydp .selectorarrow {
    background: #FAFAFA;
    margin-top: 12px;
    padding: 0;
}

.mydp .selectorarrow:after,
.mydp .selectorarrow:before {
    bottom: 100%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
}

.mydp .selectorarrow:after {
    border-color: rgba(250, 250, 250, 0);
    border-bottom-color: #FAFAFA;
    border-width: 10px;
    margin-left: -10px;
}

.mydp .selectorarrow:before {
    border-color: rgba(204, 204, 204, 0);
    border-bottom-color: #CCC;
    border-width: 11px;
    margin-left: -11px;
}

.mydp .selectorarrow:focus:before {
    border-bottom-color: #ADD8E6;
}

.mydp .selectorarrowleft:after,
.mydp .selectorarrowleft:before {
    left: 24px;
}

.mydp .selectorarrowright:after,
.mydp .selectorarrowright:before {
    left: 86%;
}

.mydp .alignselectorright {
    right: -1px;
}

.mydp .selectiongroup {
    position: relative;
    display: table;
    border: none;
    border-spacing: 0;
    background-color: #FFF;
}

.mydp .selection {
    width: 100%;
    outline: none;
    background-color: #FFF;
    display: table-cell;
    position: absolute;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-left: 6px;
    border: none;
    color: #555;
}

.mydp .invaliddate {
    background-color: #F1DEDE;
}

.mydp ::-ms-clear {
    display: none;
}

.mydp .selbtngroup {
    position: relative;
    vertical-align: middle;
    white-space: nowrap;
    width: 1%;
    display: table-cell;
    font-size: 0;
}

.mydp .btnpicker,
.mydp .btnclear,
.mydp .btndecrease,
.mydp .btnincrease {
    height: 100%;
    width: 26px;
    border: none;
    padding: 0;
    outline: 0;
    font: inherit;
    -moz-user-select: none;
}

.mydp .btnleftborder {
    border-left: 1px solid #CCC;
}

.mydp .btnpickerenabled,
.mydp .btnclearenabled,
.mydp .btndecreaseenabled,
.mydp .btnincreaseenabled,
.mydp .headertodaybtnenabled,
.mydp .headerbtnenabled,
.mydp .yearchangebtnenabled {
    cursor: pointer;
}

.mydp .selectiondisabled,
.mydp .btnpickerdisabled,
.mydp .btncleardisabled,
.mydp .btndecreasedisabled,
.mydp .btnincreasedisabled,
.mydp .headertodaybtndisabled,
.mydp .headerbtndisabled,
.mydp .yearchangebtndisabled {
    cursor: not-allowed;
    opacity: 0.65;
}

.mydp .selectiondisabled {
    background-color: #EEE;
}

.mydp .btnpicker,
.mydp .btnclear,
.mydp .btndecrease,
.mydp .btnincrease,
.mydp .headertodaybtn {
    background: #FFF;
}

.mydp .header {
    width: 100%;
    height: 30px;
    background-color: #FAFAFA;
}

.mydp .header td {
    vertical-align: middle;
    border: none;
    line-height: 0;
}

.mydp .header td:nth-child(1) {
    padding-left: 4px;
}

.mydp .header td:nth-child(2) {
    text-align: center;
}

.mydp .header td:nth-child(3) {
    padding-right: 4px;
}

.mydp .caltable,
.mydp .monthtable,
.mydp .yeartable {
    table-layout: fixed;
    width: 100%;
    height: calc(100% - 30px);
    background-color: #FFF;
    font-size: 14px;
}

.mydp .caltable,
.mydp .monthtable,
.mydp .yeartable,
.mydp .weekdaytitle,
.mydp .daycell,
.mydp .monthcell,
.mydp .yearcell {
    border-collapse: collapse;
    color: #003366;
    line-height: 1.1;
}

.mydp .weekdaytitle,
.mydp .daycell,
.mydp .monthcell,
.mydp .yearcell {
    padding: 4px;
    text-align: center;
}

.mydp .weekdaytitle {
    background-color: #DDD;
    font-size: 11px;
    font-weight: normal;
    vertical-align: middle;
    max-width: 36px;
    overflow: hidden;
    white-space: nowrap;
}

.mydp .weekdaytitleweeknbr {
    width: 20px;
    border-right: 1px solid #BBB;
}

.mydp .monthcell {
    background-color: #FAFAFA;
    overflow: hidden;
    white-space: nowrap;
}

.mydp .yearcell {
    background-color: #FAFAFA;
    width: 20%;
}

.mydp .daycell .datevalue {
    background-color: inherit;
    vertical-align: middle;
}

.mydp .daycell .datevalue span {
    vertical-align: middle;
}

.mydp .daycellweeknbr {
    font-size: 10px;
    border-right: 1px solid #CCC;
    cursor: default;
    color: #000;
}

.mydp .inlinedp {
    position: relative;
    margin-top: -1px;
}

.mydp .prevmonth,
.mydp .nextmonth {
    color: #999;
}

.mydp .disabled {
    cursor: default !important;
    color: #CCC;
    background: #FBEFEF;
}

.mydp .highlight {
    color: #C30000;
}

.mydp .dimday {
    opacity: 0.5;
}

.mydp .currmonth {
    background-color: #F6F6F6;
    font-weight: normal;
}

.mydp .markdate {
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 4px;
}

.mydp .markcurrday,
.mydp .markcurrmonth,
.mydp .markcurryear {
    text-decoration: underline;
}

.mydp .selectedday .datevalue,
.mydp .selectedmonth .monthvalue,
.mydp .selectedyear .yearvalue {
    border: none;
    background-color: #8EBFFF;
    border-radius: 2px;
}

.mydp .headerbtncell {
    background-color: #FAFAFA;
    display: table-cell;
    vertical-align: middle;
}

.mydp .yearchangebtncell {
    text-align: center;
    background-color: #FAFAFA;
}

.mydp .headerbtn,
.mydp .headerlabelbtn,
.mydp .yearchangebtn {
    background: #FAFAFA;
    border: none;
    height: 22px;
}

.mydp .headerbtn {
    width: 16px;
}

.mydp .headerlabelbtn {
    font-size: 14px;
    outline: none;
    cursor: default;
}

.mydp,
.mydp .headertodaybtn {
    border: 1px solid #CCC;
}

.mydp .btnpicker,
.mydp .btnclear,
.mydp .btndecrease,
.mydp .btnincrease,
.mydp .headerbtn,
.mydp .headermonthtxt,
.mydp .headeryeartxt,
.mydp .headertodaybtn,
.mydp .yearchangebtn {
    color: #000;
}

.mydp .headertodaybtn {
    padding: 0 4px;
    font-size: 11px;
    height: 22px;
    min-width: 60px;
    max-width: 84px;
    overflow: hidden;
    white-space: nowrap;
}

.mydp button::-moz-focus-inner {
    border: 0;
}

.mydp .headermonthtxt,
.mydp .headeryeartxt {
    text-align: center;
    display: table-cell;
    vertical-align: middle;
    font-size: 14px;
    height: 26px;
    width: 40px;
    max-width: 40px;
    overflow: hidden;
    white-space: nowrap;
}

.mydp .btnclear:focus,
.mydp .btndecrease:focus,
.mydp .btnincrease:focus,
.mydp .btnpicker:focus,
.mydp .headertodaybtn:focus {
    background: #ADD8E6;
}

.mydp .headerbtn:focus,
.mydp .monthlabel:focus,
.mydp .yearlabel:focus,
.mydp .yearchangebtn:focus {
    color: #ADD8E6;
    outline: none;
}

.mydp .daycell:focus,
.mydp .monthcell:focus,
.mydp .yearcell:focus {
    outline: 1px solid #CCC;
}

.mydp .icon-mydpcalendar,
.mydp .icon-mydpremove {
    font-size: 16px;
}

.mydp .icon-mydpleft,
.mydp .icon-mydpright,
.mydp .icon-mydpup,
.mydp .icon-mydpdown {
    color: #222;
    font-size: 20px;
}

.mydp .btndecrease .icon-mydpleft,
.mydp .btnincrease .icon-mydpright {
    font-size: 16px;
}

.mydp .icon-mydptoday {
    color: #222;
    font-size: 11px;
}

.mydp table {
    display: table;
    border-spacing: 0;
}

.mydp table td {
    padding: 0;
}

.mydp table,
.mydp th,
.mydp td {
    border: none;
}

.mydp .btnpickerenabled:hover,
.mydp .btnclearenabled:hover,
.mydp .btndecreaseenabled:hover,
.mydp .btnincreaseenabled:hover,
.mydp .headertodaybtnenabled:hover {
    background-color: #E6E6E6;
}

.mydp .tablesingleday:hover,
.mydp .tablesinglemonth:hover,
.mydp .tablesingleyear:hover {
    background-color: #DDD;
}

.mydp .monthlabel,
.mydp .yearlabel,
.mydp .inputnoteditable,
.mydp .daycell,
.mydp .monthcell,
.mydp .yearcell {
    cursor: pointer;
}

.mydp .headerbtnenabled:hover,
.mydp .yearchangebtnenabled:hover,
.mydp .monthlabel:hover,
.mydp .yearlabel:hover {
    color: #777;
}

@font-face {
    font-family: 'mydatepicker';
    src: url('data:application/octet-stream;base64,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') format('truetype');
    font-weight: normal;
    font-style: normal;
}

.mydp .mydpicon {
    font-family: 'mydatepicker';
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.mydp .icon-mydpright:before {
    content: "\e800";
}

.mydp .icon-mydpleft:before {
    content: "\e801";
}

.mydp .icon-mydptoday:before {
    content: "\e802";
}

.mydp .icon-mydpcalendar:before {
    content: "\e803";
}

.mydp .icon-mydpup:before {
    content: "\e804";
}

.mydp .icon-mydpdown:before {
    content: "\e805";
}

.mydp .icon-mydpremove:before {
    content: "\e806";
}

    `],
    template: `
        <div class="inner-icon inner-icon-right inner-icon-divider">
    <div class="mydp" [ngStyle]="{'width': opts.showInputField ? opts.width : null, 'border': opts.inline ? 'none' : null}">
        <div class="selectiongroup" *ngIf="!opts.inline">
            <input [id]="geasocieerdeLabel" *ngIf="opts.showInputField" #inputBoxEl ngtype="text" class="selection"  (click)="opts.openSelectorOnInputClick&&!opts.editableDateField&&openBtnClicked()" [ngClass]="{'invaliddate': invalidDate&&opts.indicateInvalidDate, 'inputnoteditable': opts.openSelectorOnInputClick&&!opts.editableDateField, 'selectiondisabled': opts.componentDisabled}"
                   placeholder="{{placeholder}}" [ngStyle]="{'height': opts.height, 'font-size': opts.selectionTxtFontSize}" [ngModel]="selectionDayTxt" (ngModelChange)="onUserDateInput($event)" [value]="selectionDayTxt" (keyup)="onCloseSelector($event)"
                   (focus)="opts.editableDateField&&onFocusInput($event)" (blur)="opts.editableDateField&&onBlurInput($event)" [disabled]="opts.componentDisabled" [readonly]="!opts.editableDateField" autocomplete="off" spellcheck="false" autocorrect="off">
            <div class="selbtngroup" [style.height]="opts.height">
                <button type="button" [attr.aria-label]="opts.ariaLabelDecreaseDate" class="btndecrease" *ngIf="opts.showDecreaseDateBtn" (click)="onDecreaseBtnClicked()" [ngClass]="{'btndecreaseenabled': !opts.componentDisabled, 'btndecreasedisabled': opts.componentDisabled, 'btnleftborderradius': !opts.showInputField}" [disabled]="opts.componentDisabled">
                    <span class="mydpicon icon-mydpleft"></span>
                </button>
                <button type="button" [attr.aria-label]="opts.ariaLabelIncreaseDate" class="btnincrease" *ngIf="opts.showIncreaseDateBtn" (click)="onIncreaseBtnClicked()" [ngClass]="{'btnincreaseenabled': !opts.componentDisabled, 'btnincreasedisabled': opts.componentDisabled, 'btnleftborderradius': !opts.showDecreaseDateBtn&&!opts.showInputField}" [disabled]="opts.componentDisabled">
                    <span class="mydpicon icon-mydpright"></span>
                </button>
                <button type="button" [attr.aria-label]="opts.ariaLabelClearDate" class="btnclear" *ngIf="selectionDayTxt.length>0&&opts.showClearDateBtn" (click)="removeBtnClicked()" [ngClass]="{'btnclearenabled': !opts.componentDisabled, 'btncleardisabled': opts.componentDisabled, 'btnleftborderradius': !opts.showIncreaseDateBtn&&!opts.showDecreaseDateBtn&&!opts.showInputField}" [disabled]="opts.componentDisabled">
                    <span class="mydpicon icon-mydpremove"></span>
                </button>
                <button type="button" [attr.aria-label]="opts.ariaLabelOpenCalendar" class="btnpicker" (click)="openBtnClicked()" [ngClass]="{'btnpickerenabled': !opts.componentDisabled, 'btnpickerdisabled': opts.componentDisabled, 'btnleftborderradius': !opts.showClearDateBtn&&!opts.showIncreaseDateBtn&&!opts.showDecreaseDateBtn&&!opts.showInputField||selectionDayTxt.length===0&&!opts.showInputField}" [disabled]="opts.componentDisabled">
                    <span class="mydpicon icon-mydpcalendar"></span>
                </button>
            </div>
        </div>
        <div class="selector" #selectorEl [ngStyle]="{'width': opts.selectorWidth, 'height' : opts.selectorHeight, 'bottom': getSelectorTopPosition()}" *ngIf="showSelector||opts.inline" [dpfocus]="opts.inline?'0':'1'" [ngClass]="{'inlinedp': opts.inline, 'alignselectorright': opts.alignSelectorRight, 'selectorarrow': opts.showSelectorArrow&&!opts.inline, 'selectorarrowleft': opts.showSelectorArrow&&!opts.alignSelectorRight&&!opts.inline, 'selectorarrowright': opts.showSelectorArrow&&opts.alignSelectorRight&&!opts.inline}" (keyup)="onCloseSelector($event)" tabindex="0">
            <table class="header">
                <tr>
                    <td>
                        <div style="float:left">
                            <div class="headerbtncell"><button type="button" [attr.aria-label]="opts.ariaLabelPrevMonth" class="headerbtn mydpicon icon-mydpleft" (click)="onPrevMonth()" [disabled]="prevMonthDisabled" [ngClass]="{'headerbtnenabled': !prevMonthDisabled, 'headerbtndisabled': prevMonthDisabled}"></button></div>
                            <div class="headermonthtxt">
                                <button class="headerlabelbtn" type="button" [ngClass]="{'monthlabel': opts.monthSelector}" (click)="opts.monthSelector&&onSelectMonthClicked($event)" tabindex="{{opts.monthSelector?'0':'-1'}}">{{visibleMonth.monthTxt}}</button>
                            </div>
                            <div class="headerbtncell"><button type="button" [attr.aria-label]="opts.ariaLabelNextMonth" class="headerbtn mydpicon icon-mydpright" (click)="onNextMonth()" [disabled]="nextMonthDisabled" [ngClass]="{'headerbtnenabled': !nextMonthDisabled, 'headerbtndisabled': nextMonthDisabled}"></button></div>
                        </div>
                    </td>
                    <td>
                        <button *ngIf="opts.showTodayBtn" type="button" class="headertodaybtn" (click)="onTodayClicked()" [disabled]="disableTodayBtn" [ngClass]="{'headertodaybtnenabled': !disableTodayBtn, 'headertodaybtndisabled': disableTodayBtn}">
                            <span class="mydpicon icon-mydptoday"></span>
                            <span>{{opts.todayBtnTxt}}</span>
                        </button>
                    </td>
                    <td>
                        <div style="float:right">
                            <div class="headerbtncell"><button type="button" [attr.aria-label]="opts.ariaLabelPrevYear" class="headerbtn mydpicon icon-mydpleft" (click)="onPrevYear()" [disabled]="prevYearDisabled" [ngClass]="{'headerbtnenabled': !prevYearDisabled, 'headerbtndisabled': prevYearDisabled}"></button></div>
                            <div class="headeryeartxt">
                                <button class="headerlabelbtn" type="button" [ngClass]="{'yearlabel': opts.yearSelector}" (click)="opts.yearSelector&&onSelectYearClicked($event)" tabindex="{{opts.yearSelector?'0':'-1'}}">{{visibleMonth.year}}</button>
                            </div>
                            <div class="headerbtncell"><button type="button" [attr.aria-label]="opts.ariaLabelNextYear" class="headerbtn mydpicon icon-mydpright" (click)="onNextYear()" [disabled]="nextYearDisabled" [ngClass]="{'headerbtnenabled': !nextYearDisabled, 'headerbtndisabled': nextYearDisabled}"></button></div>
                        </div>
                    </td>
                </tr>
            </table>
            <table class="caltable" *ngIf="!selectMonth&&!selectYear">
                <thead><tr><th class="weekdaytitle weekdaytitleweeknbr" *ngIf="opts.showWeekNumbers&&opts.firstDayOfWeek==='mo'">#</th><th class="weekdaytitle" scope="col" *ngFor="let d of weekDays">{{d}}</th></tr></thead>
                <tbody>
                    <tr *ngFor="let w of dates">
                        <td class="daycell daycellweeknbr" *ngIf="opts.showWeekNumbers&&opts.firstDayOfWeek==='mo'">{{w.weekNbr}}</td>
                        <td class="daycell" *ngFor="let d of w.week"
                            [ngClass]="{'currmonth':d.cmo===currMonthId&&!d.disabled, 'selectedday':selectedDate.day===d.dateObj.day && selectedDate.month===d.dateObj.month && selectedDate.year===d.dateObj.year && d.cmo===currMonthId, 'disabled': d.disabled, 'tablesingleday':(!opts.allowSelectionOnlyInCurrentMonth||d.cmo===currMonthId&&opts.allowSelectionOnlyInCurrentMonth)&&!d.disabled}" (click)="!d.disabled&&onCellClicked(d);$event.stopPropagation()" (keydown)="onCellKeyDown($event, d)" tabindex="0">
                            <div *ngIf="d.markedDate.marked" class="markdate" [ngStyle]="{'background-color': d.markedDate.color}"></div>
                            <div class="datevalue" [ngClass]="{'prevmonth':d.cmo===prevMonthId,'currmonth':d.cmo===currMonthId,'nextmonth':d.cmo===nextMonthId,'highlight':d.highlight}">
                                <span [ngClass]="{'markcurrday':d.currDay&&opts.markCurrentDay, 'dimday': d.highlight && (d.cmo===prevMonthId || d.cmo===nextMonthId || d.disabled)}">{{d.dateObj.day}}</span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table class="monthtable" *ngIf="selectMonth">
                <tbody>
                    <tr *ngFor="let mr of months">
                        <td class="monthcell tablesinglemonth" [ngClass]="{'selectedmonth': m.selected, 'disabled': m.disabled}" *ngFor="let m of mr" (click)="!m.disabled&&onMonthCellClicked(m);$event.stopPropagation()" (keydown)="onMonthCellKeyDown($event, m)" tabindex="0">
                            <div class="monthvalue" [ngClass]="{'markcurrmonth':m.currMonth&&opts.markCurrentMonth}">{{m.name}}</div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table class="yeartable" *ngIf="selectYear">
                <tbody>
                    <tr>
                        <td colspan="5" class="yearchangebtncell" (click)="$event.stopPropagation()">
                            <button type="button" class="yearchangebtn mydpicon icon-mydpup" (click)="onPrevYears($event, years[0][0].year)" [disabled]="prevYearsDisabled" [ngClass]="{'yearchangebtnenabled': !prevYearsDisabled, 'yearchangebtndisabled': prevYearsDisabled}"></button>
                        </td>
                    </tr>
                    <tr *ngFor="let yr of years">
                        <td class="yearcell tablesingleyear" [ngClass]="{'selectedyear': y.selected, 'disabled': y.disabled}" *ngFor="let y of yr" (click)="!y.disabled&&onYearCellClicked(y);$event.stopPropagation()" (keydown)="onYearCellKeyDown($event, y)" tabindex="0">
                            <div class="yearvalue" [ngClass]="{'markcurryear':y.currYear&&opts.markCurrentYear}">{{y.year}}</div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="5" class="yearchangebtncell" (click)="$event.stopPropagation()">
                            <button type="button" class="yearchangebtn mydpicon icon-mydpdown" (click)="onNextYears($event, years[0][0].year)" [disabled]="nextYearsDisabled" [ngClass]="{'yearchangebtnenabled': !nextYearsDisabled, 'yearchangebtndisabled': nextYearsDisabled}"></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <span class="icon text-hide icon-md icon-datepicker"></span>
</div>

    `,
    providers: [LocaleService, UtilService, MYDP_VALUE_ACCESSOR]
})

export class DatePicker implements OnChanges, ControlValueAccessor {
    @Input() options: IOptions;
    @Input() locale: string;
    @Input() defaultMonth: string;
    @Input() selDate: string;
    @Input() placeholder: string;
    @Input() selector: number;
    @Input() disabled: boolean;
    @Output() dateChanged: EventEmitter<IDateModel> = new EventEmitter<IDateModel>();
    @Output() inputFieldChanged: EventEmitter<IInputFieldChanged> = new EventEmitter<IInputFieldChanged>();
    @Output() calendarViewChanged: EventEmitter<ICalendarViewChanged> = new EventEmitter<ICalendarViewChanged>();
    @Output() calendarToggle: EventEmitter<number> = new EventEmitter<number>();
    @Output() inputFocusBlur: EventEmitter<IInputFocusBlur> = new EventEmitter<IInputFocusBlur>();
    @ViewChild("selectorEl") selectorEl: ElementRef;
    @ViewChild("inputBoxEl") inputBoxEl: ElementRef;
    @Input() geasocieerdeLabel: string;

    onChangeCb: (_: any) => void = () => { };
    onTouchedCb: () => void = () => { };

    showSelector: boolean = false;
    visibleMonth: IMonth = { monthTxt: "", monthNbr: 0, year: 0 };
    selectedMonth: IMonth = { monthTxt: "", monthNbr: 0, year: 0 };
    selectedDate: IDate = { year: 0, month: 0, day: 0, input: "" };
    weekDays: Array<string> = [];
    dates: Array<IWeek> = [];
    months: Array<Array<ICalendarMonth>> = [];
    years: Array<Array<ICalendarYear>> = [];
    selectionDayTxt: string = "";
    invalidDate: boolean = false;
    disableTodayBtn: boolean = false;
    dayIdx: number = 0;
    userInput: string;

    selectMonth: boolean = false;
    selectYear: boolean = false;

    prevMonthDisabled: boolean = false;
    nextMonthDisabled: boolean = false;
    prevYearDisabled: boolean = false;
    nextYearDisabled: boolean = false;
    prevYearsDisabled: boolean = false;
    nextYearsDisabled: boolean = false;

    prevMonthId: number = MonthId.prev;
    currMonthId: number = MonthId.curr;
    nextMonthId: number = MonthId.next;

    // Default options
    opts: IOptions = {
        dayLabels: <IDayLabels>{},
        monthLabels: <IMonthLabels>{},
        dateFormat: <string>"",
        showTodayBtn: <boolean>true,
        todayBtnTxt: <string>"",
        firstDayOfWeek: <string>"",
        satHighlight: <boolean>false,
        sunHighlight: <boolean>true,
        highlightDates: <Array<IDate>>[],
        markCurrentDay: <boolean>true,
        markCurrentMonth: <boolean>true,
        markCurrentYear: <boolean>true,
        disableUntil: <IDate>{ year: 0, month: 0, day: 0 },
        disableSince: <IDate>{ year: 0, month: 0, day: 0 },
        disableDays: <Array<IDate>>[],
        enableDays: <Array<IDate>>[],
        markDates: <Array<IMarkedDates>>[],
        markWeekends: <IMarkedDate>{},
        disableDateRanges: <Array<IDateRange>>[],
        disableWeekends: <boolean>false,
        disableWeekdays: <Array<string>>[],
        showWeekNumbers: <boolean>false,
        height: <string>"34px",
        width: <string>"100%",
        selectionTxtFontSize: <string>"14px",
        selectorHeight: <string>"232px",
        selectorWidth: <string>"252px",
        allowDeselectDate: <boolean>false,
        inline: <boolean>false,
        showClearDateBtn: <boolean>true,
        showDecreaseDateBtn: <boolean>false,
        showIncreaseDateBtn: <boolean>false,
        alignSelectorRight: <boolean>false,
        openSelectorTopOfInput: <boolean>false,
        indicateInvalidDate: <boolean>true,
        editableDateField: <boolean>true,
        monthSelector: <boolean>true,
        yearSelector: <boolean>true,
        disableHeaderButtons: <boolean>true,
        minYear: <number>Year.min,
        maxYear: <number>Year.max,
        componentDisabled: <boolean>false,
        showSelectorArrow: <boolean>true,
        showInputField: <boolean>true,
        openSelectorOnInputClick: <boolean>false,
        allowSelectionOnlyInCurrentMonth: <boolean>true,
        ariaLabelInputField: <string>"Date input field",
        ariaLabelClearDate: <string>"Clear Date",
        ariaLabelDecreaseDate: <string>"Decrease Date",
        ariaLabelIncreaseDate: <string>"Increase Date",
        ariaLabelOpenCalendar: <string>"Open Calendar",
        ariaLabelPrevMonth: <string>"Previous Month",
        ariaLabelNextMonth: <string>"Next Month",
        ariaLabelPrevYear: <string>"Previous Year",
        ariaLabelNextYear: <string>"Next Year"
    };

    constructor(public elem: ElementRef, private renderer: Renderer, private cdr: ChangeDetectorRef, private localeService: LocaleService, private utilService: UtilService) {
        this.setLocaleOptions();
        renderer.listenGlobal("document", "click", (event: any) => {
            if (this.showSelector && event.target && this.elem.nativeElement !== event.target && !this.elem.nativeElement.contains(event.target)) {
                this.showSelector = false;
                this.calendarToggle.emit(CalToggle.CloseByOutClick);
            }
            if (this.opts.monthSelector || this.opts.yearSelector) {
                this.resetMonthYearSelect();
            }
        });
    }

    setLocaleOptions(): void {
        let opts: IOptions = this.localeService.getLocaleOptions(this.locale);
        Object.keys(opts).forEach((k) => {
            (<IOptions>this.opts)[k] = opts[k];
        });
    }

    setOptions(): void {
        if (this.options !== undefined) {
            Object.keys(this.options).forEach((k) => {
                (<IOptions>this.opts)[k] = this.options[k];
            });
        }
        if (this.opts.minYear < Year.min) {
            this.opts.minYear = Year.min;
        }
        if (this.opts.maxYear > Year.max) {
            this.opts.maxYear = Year.max;
        }
        if (this.disabled !== undefined) {
            this.opts.componentDisabled = this.disabled;
        }
    }

    getSelectorTopPosition(): string {
        if (this.opts.openSelectorTopOfInput) {
            return this.elem.nativeElement.children[0].offsetHeight + "px";
        }
    }

    resetMonthYearSelect(): void {
        this.selectMonth = false;
        this.selectYear = false;
    }

    onSelectMonthClicked(event: any): void {
        event.stopPropagation();
        this.selectMonth = !this.selectMonth;
        this.selectYear = false;
        this.cdr.detectChanges();
        if (this.selectMonth) {
            let today: IDate = this.getToday();
            this.months.length = 0;
            for (let i = 1; i <= 12; i += 3) {
                let row: Array<ICalendarMonth> = [];
                for (let j = i; j < i + 3; j++) {
                    let disabled: boolean = this.utilService.isMonthDisabledByDisableUntil({ year: this.visibleMonth.year, month: j, day: this.daysInMonth(j, this.visibleMonth.year), input: this.userInput }, this.opts.disableUntil)
                        || this.utilService.isMonthDisabledByDisableSince({ year: this.visibleMonth.year, month: j, day: 1, input: this.userInput }, this.opts.disableSince);
                    row.push({ nbr: j, name: this.opts.monthLabels[j], currMonth: j === today.month && this.visibleMonth.year === today.year, selected: j === this.visibleMonth.monthNbr, disabled: disabled });
                }
                this.months.push(row);
            }
        }
    }

    onMonthCellClicked(cell: ICalendarMonth): void {
        let mc: boolean = cell.nbr !== this.visibleMonth.monthNbr;
        this.visibleMonth = { monthTxt: this.monthText(cell.nbr), monthNbr: cell.nbr, year: this.visibleMonth.year };
        this.generateCalendar(cell.nbr, this.visibleMonth.year, mc);
        this.selectMonth = false;
        this.selectorEl.nativeElement.focus();
    }

    onMonthCellKeyDown(event: any, cell: ICalendarMonth) {
        if ((event.keyCode === KeyCode.enter || event.keyCode === KeyCode.space) && !cell.disabled) {
            event.preventDefault();
            this.onMonthCellClicked(cell);
        }
    }

    onSelectYearClicked(event: any): void {
        event.stopPropagation();
        this.selectYear = !this.selectYear;
        this.selectMonth = false;
        this.cdr.detectChanges();
        if (this.selectYear) {
            this.generateYears(this.visibleMonth.year);
        }
    }

    onYearCellClicked(cell: ICalendarYear): void {
        let yc: boolean = cell.year !== this.visibleMonth.year;
        this.visibleMonth = { monthTxt: this.visibleMonth.monthTxt, monthNbr: this.visibleMonth.monthNbr, year: cell.year };
        this.generateCalendar(this.visibleMonth.monthNbr, cell.year, yc);
        this.selectYear = false;
        this.selectorEl.nativeElement.focus();
    }

    onYearCellKeyDown(event: any, cell: ICalendarYear) {
        if ((event.keyCode === KeyCode.enter || event.keyCode === KeyCode.space) && !cell.disabled) {
            event.preventDefault();
            this.onYearCellClicked(cell);
        }
    }

    onPrevYears(event: any, year: number): void {
        event.stopPropagation();
        this.generateYears(year - 25);
    }

    onNextYears(event: any, year: number): void {
        event.stopPropagation();
        this.generateYears(year + 25);
    }

    generateYears(year: number): void {
        this.years.length = 0;
        let today: IDate = this.getToday();
        for (let i = year; i <= 20 + year; i += 5) {
            let row: Array<ICalendarYear> = [];
            for (let j = i; j < i + 5; j++) {
                let disabled: boolean = this.utilService.isMonthDisabledByDisableUntil({ year: j, month: this.visibleMonth.monthNbr, day: this.daysInMonth(this.visibleMonth.monthNbr, j), input: this.userInput }, this.opts.disableUntil)
                    || this.utilService.isMonthDisabledByDisableSince({ year: j, month: this.visibleMonth.monthNbr, day: 1, input: this.userInput }, this.opts.disableSince);
                let minMax: boolean = j < this.opts.minYear || j > this.opts.maxYear;
                row.push({ year: j, currYear: j === today.year, selected: j === this.visibleMonth.year, disabled: disabled || minMax });
            }
            this.years.push(row);
        }
        this.prevYearsDisabled = this.years[0][0].year <= this.opts.minYear || this.utilService.isMonthDisabledByDisableUntil({ year: this.years[0][0].year - 1, month: this.visibleMonth.monthNbr, day: this.daysInMonth(this.visibleMonth.monthNbr, this.years[0][0].year - 1), input: this.userInput }, this.opts.disableUntil);
        this.nextYearsDisabled = this.years[4][4].year >= this.opts.maxYear || this.utilService.isMonthDisabledByDisableSince({ year: this.years[4][4].year + 1, month: this.visibleMonth.monthNbr, day: 1, input: this.userInput }, this.opts.disableSince);
    }

    onUserDateInput(value: string): void {
        this.userInput = value;
        if (value.length === 0) {
            if (this.utilService.isInitializedDate(this.selectedDate)) {
                this.clearDate();
            }
            else {
                let date: IDate = { day: 0, month: 0, year: 0, input: value };
                this.invalidInputFieldChanged(value, date, false);
            }
        }
        else {
            let date: IDate = this.utilService.isDateValid(value, this.opts.dateFormat, this.opts.minYear, this.opts.maxYear, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableWeekdays, this.opts.disableDays, this.opts.disableDateRanges, this.opts.monthLabels, this.opts.enableDays);
            if (date.day !== 0 && date.month !== 0 && date.year !== 0) {
                if (!this.utilService.isSameDate(date, this.selectedDate)) {
                    this.selectDate(date, CalToggle.CloseByDateSel, false);
                }
                else {
                    this.updateDateValue(date, false, false);
                }
            }
            else {
                this.invalidInputFieldChanged(value, date, false);
            }
        }
    }

    onFocusInput(event: any): void {
        this.inputFocusBlur.emit({ reason: InputFocusBlur.focus, value: event.target.value });
    }

    onBlurInput(event: any): void {
        this.selectionDayTxt = event.target.value;
        this.onTouchedCb();
        this.inputFocusBlur.emit({ reason: InputFocusBlur.blur, value: event.target.value });
    }

    onCloseSelector(event: any): void {
        if (event.keyCode === KeyCode.esc && this.showSelector && !this.opts.inline) {
            this.calendarToggle.emit(CalToggle.CloseByEsc);
            this.showSelector = false;
        }
    }

    invalidInputFieldChanged(value: string, date: IDate, fromDb: boolean): void {
        this.inputFieldChanged.emit({ value: value, dateFormat: this.opts.dateFormat, valid: false });
        if (fromDb) {
            this.selectionDayTxt = value;
        }
        this.invalidDate = false;

        this.triggerChange(date);
    }

    triggerChange(date: IDate): void {
        // Date selected, notifies parent using callbacks and value accessor
        let dateModel: IDateModel = this.getDateModel(date);
        this.onChangeCb(dateModel);
        this.onTouchedCb();
    }

    isTodayDisabled(): void {
        this.disableTodayBtn = this.utilService.isDisabledDay(this.getToday(), this.opts.minYear, this.opts.maxYear, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableWeekdays, this.opts.disableDays, this.opts.disableDateRanges, this.opts.enableDays);
    }

    parseOptions(): void {
        if (this.locale) {
            this.setLocaleOptions();
        }
        this.setOptions();
        let weekDays: Array<string> = this.utilService.getWeekDays();
        this.isTodayDisabled();
        this.dayIdx = weekDays.indexOf(this.opts.firstDayOfWeek);
        if (this.dayIdx !== -1) {
            let idx: number = this.dayIdx;
            for (let i = 0; i < weekDays.length; i++) {
                this.weekDays.push(this.opts.dayLabels[weekDays[idx]]);
                idx = weekDays[idx] === "sa" ? 0 : idx + 1;
            }
        }
    }

    writeValue(value: any): void {
        if (value && (value["date"] || value["jsdate"] || value["formatted"])) {
            this.selectedDate = value["date"] ? this.parseSelectedDate(value["date"]) : value["jsdate"] ? this.parseSelectedDate(this.jsDateToMyDate(value["jsdate"])) : this.parseSelectedDate(value["formatted"]);
            let cvc: boolean = this.visibleMonth.year !== this.selectedDate.year || this.visibleMonth.monthNbr !== this.selectedDate.month;
            if (cvc) {
                this.visibleMonth = { monthTxt: this.opts.monthLabels[this.selectedDate.month], monthNbr: this.selectedDate.month, year: this.selectedDate.year };
                this.generateCalendar(this.selectedDate.month, this.selectedDate.year, cvc);
            }
            if (!this.opts.inline) {
                this.updateDateValue(this.selectedDate, false, false);
            }
        }
        else if (value === null || value === "") {
            if (!this.opts.inline) {
                this.updateDateValue({ year: 0, month: 0, day: 0, input: this.userInput }, true, false);
            }
            else {
                this.selectedDate = { year: 0, month: 0, day: 0, input: this.userInput };
            }
        }
    }

    setDisabledState(disabled: boolean): void {
        this.opts.componentDisabled = disabled;
    }

    registerOnChange(fn: any): void {
        this.onChangeCb = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouchedCb = fn;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.hasOwnProperty("selector")) {
            let s: any = changes["selector"].currentValue;
            if (typeof s === "object") {
                if (s.open) {
                    this.showSelector = true;
                    this.openSelector(CalToggle.Open);
                }
                else {
                    this.showSelector = false;
                    this.closeSelector(CalToggle.CloseByApi);
                }
            }
            else if (s > 0) {
                this.openBtnClicked();
            }
        }

        if (changes.hasOwnProperty("placeholder")) {
            this.placeholder = changes["placeholder"].currentValue;
        }

        if (changes.hasOwnProperty("locale")) {
            this.locale = changes["locale"].currentValue;
        }

        if (changes.hasOwnProperty("disabled")) {
            this.disabled = changes["disabled"].currentValue;
        }

        if (changes.hasOwnProperty("options")) {
            this.options = changes["options"].currentValue;
            if (this.options.dateFormat) {
                DD = this.utilService.getFormattedToken(this.options.dateFormat, "d");
                MM = this.utilService.getFormattedToken(this.options.dateFormat, "m");
            }
        }

        this.weekDays.length = 0;
        this.parseOptions();

        let dmChange: boolean = false;
        if (changes.hasOwnProperty("defaultMonth")) {
            let dm: any = changes["defaultMonth"].currentValue;
            if (typeof dm === "object") {
                dm = dm.defMonth;
            }
            if (dm !== null && dm !== undefined && dm !== "") {
                this.selectedMonth = this.parseSelectedMonth(dm);
            }
            else {
                this.selectedMonth = { monthTxt: "", monthNbr: 0, year: 0 };
            }
            dmChange = true;
        }

        if (changes.hasOwnProperty("selDate")) {
            let sd: any = changes["selDate"];
            if (sd.currentValue !== null && sd.currentValue !== undefined && sd.currentValue !== "" && Object.keys(sd.currentValue).length !== 0) {
                this.selectedDate = this.parseSelectedDate(sd.currentValue);
                setTimeout(() => {
                    this.onChangeCb(this.getDateModel(this.selectedDate));
                });
            }
            else {
                // Do not clear on init
                if (!sd.isFirstChange()) {
                    this.clearDate();
                }
            }
        }
        if (this.visibleMonth.year === 0 && this.visibleMonth.monthNbr === 0 || dmChange) {
            this.setVisibleMonth();
        }
        else {
            this.visibleMonth.monthTxt = this.opts.monthLabels[this.visibleMonth.monthNbr];
            this.generateCalendar(this.visibleMonth.monthNbr, this.visibleMonth.year, false);
        }
    }

    removeBtnClicked(): void {
        // Remove date button clicked
        this.clearDate();
        if (this.showSelector) {
            this.calendarToggle.emit(CalToggle.CloseByCalBtn);
        }
        this.showSelector = false;
    }

    onDecreaseBtnClicked(): void {
        // Decrease date button clicked
        this.decreaseIncreaseDate(true);
    }

    onIncreaseBtnClicked(): void {
        // Increase date button clicked
        this.decreaseIncreaseDate(false);
    }

    openBtnClicked(): void {
        // Open selector button clicked
        this.showSelector = !this.showSelector;
        this.cdr.detectChanges();
        if (this.showSelector) {
            this.openSelector(CalToggle.Open);
        }
        else {
            this.closeSelector(CalToggle.CloseByCalBtn);
        }
    }

    openSelector(reason: number): void {
        this.setVisibleMonth();
        this.calendarToggle.emit(reason);
    }

    closeSelector(reason: number): void {
        this.calendarToggle.emit(reason);
    }

    setVisibleMonth(): void {
        // Sets visible month of calendar
        let y: number = 0, m: number = 0;
        if (!this.utilService.isInitializedDate(this.selectedDate)) {
            if (this.selectedMonth.year === 0 && this.selectedMonth.monthNbr === 0) {
                let today: IDate = this.getToday();
                y = today.year;
                m = today.month;
            } else {
                y = this.selectedMonth.year;
                m = this.selectedMonth.monthNbr;
            }
        }
        else {
            y = this.selectedDate.year;
            m = this.selectedDate.month;
        }
        this.visibleMonth = { monthTxt: this.opts.monthLabels[m], monthNbr: m, year: y };

        // Create current month
        this.generateCalendar(m, y, true);
    }

    onPrevMonth(): void {
        // Previous month from calendar
        let d: Date = this.getDate(this.visibleMonth.year, this.visibleMonth.monthNbr, 1);
        d.setMonth(d.getMonth() - 1);

        let y: number = d.getFullYear();
        let m: number = d.getMonth() + 1;

        this.visibleMonth = { monthTxt: this.monthText(m), monthNbr: m, year: y };
        this.generateCalendar(m, y, true);
    }

    onNextMonth(): void {
        // Next month from calendar
        let d: Date = this.getDate(this.visibleMonth.year, this.visibleMonth.monthNbr, 1);
        d.setMonth(d.getMonth() + 1);

        let y: number = d.getFullYear();
        let m: number = d.getMonth() + 1;

        this.visibleMonth = { monthTxt: this.monthText(m), monthNbr: m, year: y };
        this.generateCalendar(m, y, true);
    }

    onPrevYear(): void {
        // Previous year from calendar
        this.visibleMonth.year--;
        this.generateCalendar(this.visibleMonth.monthNbr, this.visibleMonth.year, true);
    }

    onNextYear(): void {
        // Next year from calendar
        this.visibleMonth.year++;
        this.generateCalendar(this.visibleMonth.monthNbr, this.visibleMonth.year, true);
    }

    onTodayClicked(): void {
        // Today button clicked
        let today: IDate = this.getToday();
        this.selectDate(today, CalToggle.CloseByDateSel, true);
        if (this.opts.inline && today.year !== this.visibleMonth.year || today.month !== this.visibleMonth.monthNbr) {
            this.visibleMonth = { monthTxt: this.opts.monthLabels[today.month], monthNbr: today.month, year: today.year };
            this.generateCalendar(today.month, today.year, true);
        }
    }

    onCellClicked(cell: any): void {
        // Cell clicked on the calendar
        if (cell.cmo === this.prevMonthId) {
            // Previous month day
            this.onPrevMonth();
            if (!this.opts.allowSelectionOnlyInCurrentMonth) {
                this.selectDate(cell.dateObj, CalToggle.CloseByDateSel, true);
            }
        }
        else if (cell.cmo === this.currMonthId) {
            // Current month day - if date is already selected clear it
            if (this.opts.allowDeselectDate && this.utilService.isSameDate(cell.dateObj, this.selectedDate)) {
                this.clearDate();
            }
            else {
                this.selectDate(cell.dateObj, CalToggle.CloseByDateSel, true);
            }
        }
        else if (cell.cmo === this.nextMonthId) {
            // Next month day
            this.onNextMonth();
            if (!this.opts.allowSelectionOnlyInCurrentMonth) {
                this.selectDate(cell.dateObj, CalToggle.CloseByDateSel, true);
            }
        }
        this.resetMonthYearSelect();
    }

    onCellKeyDown(event: any, cell: any) {
        // Cell keyboard handling
        if ((event.keyCode === KeyCode.enter || event.keyCode === KeyCode.space) && !cell.disabled) {
            event.preventDefault();
            this.onCellClicked(cell);
        }
    }

    clearDate(): void {
        // Clears the date and notifies parent using callbacks and value accessor
        this.userInput = "";
        let date: IDate = { year: 0, month: 0, day: 0, input: ""  };
        this.dateChanged.emit({ date: date, jsdate: null, formatted: "", epoc: 0});
        this.onChangeCb(null);
        this.onTouchedCb();
        this.updateDateValue(date, true, true);
        this.setFocusToInputBox();
    }

    decreaseIncreaseDate(decrease: boolean): void {
        // Decreases or increases the date depending on the parameter
        let date: IDate = this.selectedDate;
        if (this.utilService.isInitializedDate(date)) {
            let d: Date = this.getDate(date.year, date.month, date.day);
            d.setDate(decrease ? d.getDate() - 1 : d.getDate() + 1);
            date = { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate(), input: "" };
            date.input = this.formatDate(date);
        }
        else {
            date = this.getToday();
        }
        this.selectDate(date, CalToggle.CloseByCalBtn, true);
    }

    selectDate(date: IDate, closeReason: number, fromDb: boolean): void {
        // Date selected, notifies parent using callbacks and value accessor
        let dateModel: IDateModel = this.getDateModel(date);
        this.dateChanged.emit(dateModel);
        this.onChangeCb(dateModel);
        this.onTouchedCb();
        this.updateDateValue(date, false, fromDb);
        if (this.showSelector) {
            this.calendarToggle.emit(closeReason);
        }
        this.showSelector = false;
        this.setFocusToInputBox();
    }

    setFocusToInputBox(): void {
        if (!this.opts.inline && this.opts.showInputField) {
            setTimeout(() => {
                this.inputBoxEl.nativeElement.focus();
            }, 100);
        }
    }

    updateDateValue(date: IDate, clear: boolean, fromDb: boolean): void {
        // Updates date values
        this.selectedDate = date;
        const formattedDate = this.formatDate(date);
        if (fromDb) {
            this.selectionDayTxt = clear ? '' : formattedDate;
        }
        let emitValue: string;
        if (date.day === 0 && date.month === 0 && date.year === 0) {
            // if user input was inconsistent / invalid date, return this very input to the DOM
            emitValue = date.input;
        } else {
            // if user input was consistent, return the formatted date to the DOM
            emitValue = formattedDate;
        }
        this.inputFieldChanged.emit({ value: emitValue, dateFormat: this.opts.dateFormat, valid: !clear });
        this.invalidDate = false;
        this.triggerChange(date);
    }

    getDateModel(date: IDate): IDateModel {
        // Creates a date model object from the given parameter
        return { date: date, jsdate: this.getDate(date.year, date.month, date.day), formatted: this.formatDate(date), epoc: Math.round(this.getTimeInMilliseconds(date) / 1000.0) };
    }

    preZero(val: string): string {
        // Prepend zero if smaller than 10
        return parseInt(val) < 10 ? "0" + val : val;
    }

    formatDate(val: any): string {
        // Returns formatted date string, if mmm is part of dateFormat returns month as a string
        let formatted: string = this.opts.dateFormat.replace(YYYY, val.year);
        formatted = this.formatDay(val, formatted);
        return this.formatMonth(val, formatted);

    }

    formatDay(val: any, formatted: string) {
        return formatted.replace(DD, this.preZero(val.day));
    }

    formatMonth(val: any, formatted: string) {
        if (this.opts.dateFormat.indexOf(MMM) !== -1) {
            return formatted.replace(MMM, this.monthText(val.month));
        } else {
            return formatted.replace(MM, this.preZero(val.month));
        }
    }

    monthText(m: number): string {
        // Returns month as a text
        return this.opts.monthLabels[m];
    }

    monthStartIdx(y: number, m: number): number {
        // Month start index
        let d = new Date();
        d.setDate(1);
        d.setMonth(m - 1);
        d.setFullYear(y);
        let idx = d.getDay() + this.sundayIdx();
        return idx >= 7 ? idx - 7 : idx;
    }

    daysInMonth(m: number, y: number): number {
        // Return number of days of current month
        return new Date(y, m, 0).getDate();
    }

    daysInPrevMonth(m: number, y: number): number {
        // Return number of days of the previous month
        let d: Date = this.getDate(y, m, 1);
        d.setMonth(d.getMonth() - 1);
        return this.daysInMonth(d.getMonth() + 1, d.getFullYear());
    }

    isCurrDay(d: number, m: number, y: number, cmo: number, today: IDate): boolean {
        // Check is a given date the today
        return d === today.day && m === today.month && y === today.year && cmo === this.currMonthId;
    }

    getToday(): IDate {
        let date: Date = new Date();
        let datepickerDate = { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate(), input: "" };
        datepickerDate.input = this.formatDate(datepickerDate);
        return datepickerDate;
    }

    getTimeInMilliseconds(date: IDate): number {
        return this.getDate(date.year, date.month, date.day).getTime();
    }

    getWeekday(date: IDate): string {
        // Get weekday: su, mo, tu, we ...
        let weekDays: Array<string> = this.utilService.getWeekDays();
        return weekDays[this.utilService.getDayNumber(date)];
    }

    getDate(year: number, month: number, day: number): Date {
        // Creates a date object from given year, month and day
        return new Date(year, month - 1, day, 0, 0, 0, 0);
    }

    sundayIdx(): number {
        // Index of Sunday day
        return this.dayIdx > 0 ? 7 - this.dayIdx : 0;
    }

    generateCalendar(m: number, y: number, notifyChange: boolean): void {
        this.dates.length = 0;
        let today: IDate = this.getToday();
        let monthStart: number = this.monthStartIdx(y, m);
        let dInThisM: number = this.daysInMonth(m, y);
        let dInPrevM: number = this.daysInPrevMonth(m, y);

        let dayNbr: number = 1;
        let cmo: number = this.prevMonthId;
        for (let i = 1; i < 7; i++) {
            let week: Array<ICalendarDay> = [];
            if (i === 1) {
                // First week
                let pm = dInPrevM - monthStart + 1;
                // Previous month
                for (let j = pm; j <= dInPrevM; j++) {
                    let date: IDate = { year: m === 1 ? y - 1 : y, month: m === 1 ? 12 : m - 1, day: j, input: "" };
                    date.input = this.formatDate(date);
                    week.push({
                        dateObj: date, cmo: cmo, currDay: this.isCurrDay(j, m, y, cmo, today),
                        disabled: this.utilService.isDisabledDay(date, this.opts.minYear, this.opts.maxYear, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableWeekdays, this.opts.disableDays, this.opts.disableDateRanges, this.opts.enableDays),
                        markedDate: this.utilService.isMarkedDate(date, this.opts.markDates, this.opts.markWeekends),
                        highlight: this.utilService.isHighlightedDate(date, this.opts.sunHighlight, this.opts.satHighlight, this.opts.highlightDates)
                    });
                }

                cmo = this.currMonthId;
                // Current month
                let daysLeft: number = 7 - week.length;
                for (let j = 0; j < daysLeft; j++) {
                    let date: IDate = { year: y, month: m, day: dayNbr, input: "" };
                    date.input = this.formatDate(date);
                    week.push({
                        dateObj: date, cmo: cmo, currDay: this.isCurrDay(dayNbr, m, y, cmo, today),
                        disabled: this.utilService.isDisabledDay(date, this.opts.minYear, this.opts.maxYear, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableWeekdays, this.opts.disableDays, this.opts.disableDateRanges, this.opts.enableDays),
                        markedDate: this.utilService.isMarkedDate(date, this.opts.markDates, this.opts.markWeekends),
                        highlight: this.utilService.isHighlightedDate(date, this.opts.sunHighlight, this.opts.satHighlight, this.opts.highlightDates)
                    });
                    dayNbr++;
                }
            }
            else {
                // Rest of the weeks
                for (let j = 1; j < 8; j++) {
                    if (dayNbr > dInThisM) {
                        // Next month
                        dayNbr = 1;
                        cmo = this.nextMonthId;
                    }
                    let date: IDate = { input: "", year: cmo === this.nextMonthId && m === 12 ? y + 1 : y, month: cmo === this.currMonthId ? m : cmo === this.nextMonthId && m < 12 ? m + 1 : 1, day: dayNbr };
                    date.input = this.formatDate(date);
                    week.push({
                        dateObj: date, cmo: cmo, currDay: this.isCurrDay(dayNbr, m, y, cmo, today),
                        disabled: this.utilService.isDisabledDay(date, this.opts.minYear, this.opts.maxYear, this.opts.disableUntil, this.opts.disableSince, this.opts.disableWeekends, this.opts.disableWeekdays, this.opts.disableDays, this.opts.disableDateRanges, this.opts.enableDays),
                        markedDate: this.utilService.isMarkedDate(date, this.opts.markDates, this.opts.markWeekends),
                        highlight: this.utilService.isHighlightedDate(date, this.opts.sunHighlight, this.opts.satHighlight, this.opts.highlightDates)
                    });
                    dayNbr++;
                }
            }
            let weekNbr: number = this.opts.showWeekNumbers && this.opts.firstDayOfWeek === "mo" ? this.utilService.getWeekNumber(week[0].dateObj) : 0;
            this.dates.push({ week: week, weekNbr: weekNbr });
        }

        this.setHeaderBtnDisabledState(m, y);

        if (notifyChange) {
            // Notify parent
            let weekDayBegin = this.getWeekday({ year: y, month: m, day: 1, input: this.userInput });
            let weekDayEnd = this.getWeekday({ year: y, month: m, day: dInThisM, input: this.userInput });
            this.calendarViewChanged.emit({ year: y, month: m, first: { number: 1, weekday: weekDayBegin }, last: { number: dInThisM, weekday: weekDayEnd } });
        }
    }

    parseSelectedDate(selDate: any): IDate {
        // Parse date value - it can be string or IMyDate object
        let date: IDate = { day: 0, month: 0, year: 0, input: "" };
        if (typeof selDate === "string") {
            let sd: string = <string>selDate;
            let df: string = this.opts.dateFormat;
            let dmy = this.utilService.parseDatePartsToNumbers(df, sd);

            date.month = df.indexOf(MMM) !== -1
                ? this.utilService.parseDatePartMonthName(df, sd, MMM, this.opts.monthLabels)
                : dmy[1];

            if (df.indexOf(MMM) !== -1 && this.opts.monthLabels[date.month]) {
                df = this.utilService.changeDateFormat(df, this.opts.monthLabels[date.month].length);
            }

            date.day = dmy[0];
            date.year = dmy[2];
        }
        else if (typeof selDate === "object") {
            date = selDate;
        }
        if (date.day === 0 && date.month === 0 && date.year === 0) {
            // if user input was inconsistent, return input to DOM
            this.selectionDayTxt = date.input;
        } else {
            // if user input was valid, return formatted date to DOM
            this.selectionDayTxt = this.formatDate(date);
        }
        return date;
    }

    jsDateToMyDate(date: Date): IDate {
        let dpDate = { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate(), input: this.userInput };
        dpDate.input = this.formatDate(dpDate);
        return dpDate;
    }

    parseSelectedMonth(ms: string): IMonth {
        return this.utilService.parseDefaultMonth(ms);
    }

    setHeaderBtnDisabledState(m: number, y: number): void {
        let dpm: boolean = false;
        let dpy: boolean = false;
        let dnm: boolean = false;
        let dny: boolean = false;
        if (this.opts.disableHeaderButtons) {
            dpm = this.utilService.isMonthDisabledByDisableUntil({ input: this.userInput, year: m === 1 ? y - 1 : y, month: m === 1 ? 12 : m - 1, day: this.daysInMonth(m === 1 ? 12 : m - 1, m === 1 ? y - 1 : y) }, this.opts.disableUntil);
            dpy = this.utilService.isMonthDisabledByDisableUntil({ input: this.userInput, year: y - 1, month: m, day: this.daysInMonth(m, y - 1) }, this.opts.disableUntil);
            dnm = this.utilService.isMonthDisabledByDisableSince({ input: this.userInput,year: m === 12 ? y + 1 : y, month: m === 12 ? 1 : m + 1, day: 1 }, this.opts.disableSince);
            dny = this.utilService.isMonthDisabledByDisableSince({ input: this.userInput, year: y + 1, month: m, day: 1 }, this.opts.disableSince);
        }
        this.prevMonthDisabled = m === 1 && y === this.opts.minYear || dpm;
        this.prevYearDisabled = y - 1 < this.opts.minYear || dpy;
        this.nextMonthDisabled = m === 12 && y === this.opts.maxYear || dnm;
        this.nextYearDisabled = y + 1 > this.opts.maxYear || dny;
    }
}
