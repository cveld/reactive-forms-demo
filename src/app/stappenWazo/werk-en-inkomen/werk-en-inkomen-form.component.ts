import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { IWizardStepComponent } from 'src/app/shared/models';
import { Subscription } from 'rxjs';
import { WerkEnInkomenForm } from './werk-en-inkomen.form';
import { WerkEnInkomenModel } from 'src/app/shared/models/werk-en-inkomen-model';
import { distinctUntilChanged } from 'rxjs/operators';
import { FormValidators } from 'src/app/shared/forms/form-validators';
import { Utilities } from 'src/app/lib/date-picker/utilities';
import { IDateModel } from 'src/app/lib/date-picker/interfaces';
import { SituatieInkomstenEnum, JaNeeEnum, HeelKalenderjaarZEZEnum, inputCurrency } from '../../shared';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'werk-en-inkomen-form',
    templateUrl: './werk-en-inkomen-form.component.html'
})
export class WerkEnInkomenFormComponent implements OnInit, OnDestroy {
    private subscriptions: Array<Subscription> = new Array<Subscription>();
    private validating = false;
    /** Form to expose to the DOM. */
    public form: WerkEnInkomenForm;
    /** PersonalInformation data. */
    @Input()
    public data: WerkEnInkomenModel;
    @Input()
    public forceValidation = false;
    @Input()
    public uitkeringsDatum: number;
    utilities = new Utilities();

    @Input()
    public labelGroupId;

    public readonly kalenderJaar = new Date().getFullYear();

    constructor() { }

    ngOnInit() {
        this.form = new WerkEnInkomenForm(this.data);
        this.subscriptions.push(this.form.valueChanges.pipe(distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))).subscribe((...parameters) => {
            setTimeout(() =>
                this.revalidate(), 100);
        }));
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
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

    public showKVKNummer(): boolean {
        return this.form.value.situatieInkomsten === SituatieInkomstenEnum.EigenOnderneming;
    }

    public showIndicatieUrencriteriumZEZ(): boolean {
        return this.form.value.situatieInkomsten === SituatieInkomstenEnum.AlfaParticuliereHulp
            || this.form.value.situatieInkomsten === SituatieInkomstenEnum.EigenOnderneming
            || this.form.value.situatieInkomsten === SituatieInkomstenEnum.BedrijfEchtgenootPartner;
    }

    public showDatumStartWerk(): boolean {
        return (this.form.value.situatieInkomsten === SituatieInkomstenEnum.AlfaParticuliereHulp
            || this.form.value.situatieInkomsten === SituatieInkomstenEnum.EigenOnderneming
            || this.form.value.situatieInkomsten === SituatieInkomstenEnum.BedrijfEchtgenootPartner)
            && this.form.value.indicatieUrencriteriumZEZ === JaNeeEnum.nee;
    }

    public showHeelKalenderjaarZEZ(): boolean {
        return (this.form.value.situatieInkomsten === SituatieInkomstenEnum.AlfaParticuliereHulp
            || this.form.value.situatieInkomsten === SituatieInkomstenEnum.EigenOnderneming
            || this.form.value.situatieInkomsten === SituatieInkomstenEnum.BedrijfEchtgenootPartner)
            && this.form.value.indicatieUrencriteriumZEZ === JaNeeEnum.nee;
    }

    public showToelichtingHeelKalenderjaarZEZ(): boolean {
        return ((this.form.value.situatieInkomsten === SituatieInkomstenEnum.AlfaParticuliereHulp
            || this.form.value.situatieInkomsten === SituatieInkomstenEnum.EigenOnderneming
            || this.form.value.situatieInkomsten === SituatieInkomstenEnum.BedrijfEchtgenootPartner)
            && this.form.value.indicatieUrencriteriumZEZ === JaNeeEnum.nee)
            && this.form.value.heelKalenderjaarZEZ === HeelKalenderjaarZEZEnum.NeeToelichting;
    }

    public showIndicatieAangifteIB1(): boolean {
        return (this.form.value.situatieInkomsten === SituatieInkomstenEnum.AlfaParticuliereHulp
            || this.form.value.situatieInkomsten === SituatieInkomstenEnum.EigenOnderneming
            || this.form.value.situatieInkomsten === SituatieInkomstenEnum.BedrijfEchtgenootPartner)
            && this.form.value.indicatieUrencriteriumZEZ === JaNeeEnum.nee;
    }

    public showBedragInkomstenIB1(): boolean {
        return ((this.form.value.situatieInkomsten === SituatieInkomstenEnum.AlfaParticuliereHulp
            || this.form.value.situatieInkomsten === SituatieInkomstenEnum.EigenOnderneming
            || this.form.value.situatieInkomsten === SituatieInkomstenEnum.BedrijfEchtgenootPartner)
            && this.form.value.indicatieUrencriteriumZEZ === JaNeeEnum.nee)
            && this.form.value.indicatieAangifteIB1 === JaNeeEnum.ja;
    }

    public showIndicatieAangifteIB2(): boolean {
        return ((this.form.value.situatieInkomsten === SituatieInkomstenEnum.AlfaParticuliereHulp
            || this.form.value.situatieInkomsten === SituatieInkomstenEnum.EigenOnderneming
            || this.form.value.situatieInkomsten === SituatieInkomstenEnum.BedrijfEchtgenootPartner)
            && this.form.value.indicatieUrencriteriumZEZ === JaNeeEnum.nee)
            && this.form.value.indicatieAangifteIB1 === JaNeeEnum.nee;
    }

    public showBedragInkomstenIB2(): boolean {
        return ((this.form.value.situatieInkomsten === SituatieInkomstenEnum.AlfaParticuliereHulp
            || this.form.value.situatieInkomsten === SituatieInkomstenEnum.EigenOnderneming
            || this.form.value.situatieInkomsten === SituatieInkomstenEnum.BedrijfEchtgenootPartner)
            && this.form.value.indicatieUrencriteriumZEZ === JaNeeEnum.nee)
            && this.form.value.indicatieAangifteIB1 === JaNeeEnum.nee
            && this.form.value.indicatieAangifteIB2 === JaNeeEnum.ja;
    }

    public showSchattingInkomsten(): boolean {
        return ((this.form.value.situatieInkomsten === SituatieInkomstenEnum.AlfaParticuliereHulp
            || this.form.value.situatieInkomsten === SituatieInkomstenEnum.EigenOnderneming
            || this.form.value.situatieInkomsten === SituatieInkomstenEnum.BedrijfEchtgenootPartner)
            && this.form.value.indicatieUrencriteriumZEZ === JaNeeEnum.nee)
            && this.form.value.indicatieAangifteIB1 === JaNeeEnum.nee
            && this.form.value.indicatieAangifteIB2 === JaNeeEnum.nee;
    }

    public onBlurBedragInkomstenIB1() {
        this.form.controls.bedragInkomstenIB1.setValue(inputCurrency.transform(this.form.value.bedragInkomstenIB1));
    }

    public onBlurBedragInkomstenIB2() {
        this.form.controls.bedragInkomstenIB2.setValue(inputCurrency.transform(this.form.value.bedragInkomstenIB2));
    }

    public onBlurSchattingInkomsten() {
        this.form.controls.schattingInkomsten.setValue(inputCurrency.transform(this.form.value.schattingInkomsten));
    }
}
