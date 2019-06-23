import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { Subscription } from 'rxjs';
import { BetaalwijzeForm } from './betaalwijze.form';
import { distinctUntilChanged } from 'rxjs/operators';
import { FormValidators } from '../../shared/forms/form-validators';
import { SoortRekeningnummerEnum, JaNeeEnum } from 'src/app/shared';

@Component({
    // tslint:disable-next-line:component-selector
        selector: 'betaalwijze-form',
        templateUrl: './betaalwijze-form.component.html'
})
export class BetaalwijzeFormComponent implements OnInit, OnDestroy {
    @Input()
    public forceValidation = false;
    @Input()
    public labelGroupId: string;

    private subscriptions: Array<Subscription> = new Array<Subscription>();
    private validating = false;
    public form: BetaalwijzeForm;

    public jaNee = JaNeeEnum;

    ngOnInit() {
        this.form = new BetaalwijzeForm();
        this.subscriptions.push(this.form.valueChanges.pipe(distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))).subscribe((...parameters) => {
            setTimeout(() =>
            this.revalidate(), 0);
        }));
    }

    public ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    // uitzoeken: wellicht kunnen we voorkomen dat we handmatig een revalidate moeten aftrappen? lijkt puur voor de validation messages
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

    public isVrijwillig(){
        return this.form.value.indicatieVrijwilligeZW === JaNeeEnum.ja;
    }

    public isNederland() {
        return this.form.value.soortRekeningnummer === SoortRekeningnummerEnum.Nederland;
    }

    public isBuitenland() {
        return this.form.value.soortRekeningnummer === SoortRekeningnummerEnum.Buitenland;
    }

    public isUitzendbureau() {
        return this.form.value.soortRekeningnummer === SoortRekeningnummerEnum.Uitzendbureau;
    }
}
