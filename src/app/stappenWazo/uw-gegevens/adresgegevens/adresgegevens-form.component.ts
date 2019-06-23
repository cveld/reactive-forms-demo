import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AdresModel } from '../../../shared/models/adres-model';
import { AdresgegevensForm } from './adresgegevens.form';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { FormValidators } from '../../../shared/forms/form-validators';
import { JaNeeEnum } from 'src/app/shared';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'adresgegevens-form',
    templateUrl: './adresgegevens-form.component.html'
})
export class AdresgegevensFormComponent implements OnInit, OnDestroy {

    /** Form to expose to the DOM. */
    public form: AdresgegevensForm;

    @Input()
    public forceValidation = false;

    @Input()
    public data: AdresModel;

    public readonly labelGroupId = 'stap2';

    private subscriptions: Array<Subscription> = new Array<Subscription>();
    private validating = false;

    // utility pass-throughs voor de view:
    public JaNeeEnum: typeof JaNeeEnum = JaNeeEnum;

    complete(): void {
        throw new Error('Method not implemented.');
    }

    constructor() { }

    ngOnInit() {
        this.form = new AdresgegevensForm({adres: this.data});
        this.subscriptions.push(this.form.valueChanges.pipe(
            distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))).subscribe((...parameters) => {
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

}
