import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { IWizardStepComponent } from '../../shared/models';
import { Utilities } from '../../lib/date-picker/utilities';
import { UwGegevensForm } from './uw-gegevens.form';
import { UwGegevens } from '../../shared/models/uw-gegevens';
import { IDateModel } from '../../lib/date-picker/interfaces';
import { StappenVariantEnum, JaNeeEnum } from '../../shared/enums';
import { Subscription } from 'rxjs';
import { FormValidators } from '../../shared/forms/form-validators';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DatumValidators } from '../../shared/forms/datum-validators';

@Component({
// tslint:disable-next-line:component-selector
    selector: 'uw-gegevens-form',
    templateUrl: './uw-gegevens-form.component.html'
})
export class UwGegevensFormComponent implements OnInit, OnDestroy, IWizardStepComponent {
    isEditable: boolean;
    isCompleted: boolean;
    utilities = new Utilities();
    /** Form to expose to the DOM. */
    public form: UwGegevensForm;
    /** PersonalInformation data. */
    @Input()
    public data: UwGegevens;
    @Input()
    public stappenVariant: StappenVariantEnum;
    @Input()
    public meerling: boolean;
    @Input()
    public forceValidation = false;
    private subscriptions: Array<Subscription> = new Array<Subscription>();
    private validating = false;

    // utility pass-throughs voor de view:
    public StappenVariantEnum = StappenVariantEnum;
    public valideIDateModel = DatumValidators.valideIDateModel;

    complete(): void {
        throw new Error('Method not implemented.');
    }


    constructor() { }

    ngOnInit() {
        this.form = new UwGegevensForm(this.meerling, this.stappenVariant, this.data);
        this.subscriptions.push(this.form.valueChanges.pipe(distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))).subscribe((...parameters) => {
            setTimeout(() =>
            this.revalidate(), 100);
        }));
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    onDatumChanged($event: IDateModel): void {
    }

    // uitzoeken: wellicht kunnen we voorkomen dat we handmatig een revalidate moeten aftrappen?
    revalidate(): void {
        if (this.forceValidation && !this.validating) {
            this.validateForm();
        }
    }

    public validateForm() {
        this.validating = true;
        FormValidators.validateForm(this.form, true);
        this.validating = false;
    }

    public equalDates(date1: Date, date2: Date): boolean {
        return date1.getTime() === date2.getTime();
    }
}
