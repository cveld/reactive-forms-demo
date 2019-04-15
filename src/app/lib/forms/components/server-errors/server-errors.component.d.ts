import { OnChanges, SimpleChanges } from '@angular/core';
import { FormGroupDirective, FormControlName } from '@angular/forms';
export declare class ServerErrorsComponent implements OnChanges {
    private form;
    errors: any;
    control: FormControlName;
    constructor(form: FormGroupDirective);
    ngOnChanges(changes: SimpleChanges): void;
}
