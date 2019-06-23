import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { IWizardStepComponent } from '../../shared/models';
import { Utilities } from '../../lib/date-picker/utilities';
import { UwGegevensForm } from './uw-gegevens.form';
import { UwGegevensModel } from '../../shared/models/uw-gegevens-model';
import { IDateModel } from '../../lib/date-picker/interfaces';
import { StappenVariantEnum, JaNeeEnum, KeuzeStartUitkeringEnum } from '../../shared/enums';
import { Subscription } from 'rxjs';
import { FormValidators } from '../../shared/forms/form-validators';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DatumValidators } from '../../shared/forms/datum-validators';
import * as domain from 'src/app/shared/helper/domain';
import { Params, ActivatedRoute } from '@angular/router';
import { datumOuderDanEenJaar } from 'src/app/shared/helper/domain';

@Component({
// tslint:disable-next-line:component-selector
    selector: 'uw-gegevens-form',
    templateUrl: './uw-gegevens-form.component.html'
})
export class UwGegevensFormComponent implements OnInit, OnDestroy {
    isEditable: boolean;
    isCompleted: boolean;
    utilities = new Utilities();
    /** Form to expose to the DOM. */
    public form: UwGegevensForm;
    @Input()
    public data: UwGegevensModel;
    @Input()
    public stappenVariant: StappenVariantEnum;
    @Input()
    public params: Params;
    @Input()
    public meerling: boolean;
    @Input()
    public forceValidation = false;
    private subscriptions: Array<Subscription> = new Array<Subscription>();
    private validating = false;

    // utility pass-throughs voor de view:
    public StappenVariantEnum = StappenVariantEnum;
    public KeuzeStartUitkeringEnum = KeuzeStartUitkeringEnum;
    public valideIDateModel = DatumValidators.valideIDateModel;
    public JaNeeEnum = JaNeeEnum;

    public readonly labelGroupId = 'stap2';

    complete(): void {
        throw new Error('Method not implemented.');
    }

    constructor() { }

    ngOnInit() {
        this.form = new UwGegevensForm(this.meerling, this.stappenVariant, this.data);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    onDatumChanged($event: IDateModel): void {
    }

    public validateForm() {
        this.validating = true;
        FormValidators.validateForm(this.form, true);
        this.validating = false;
    }

    public equalDates(date1: Date, date2: Date): boolean {
        return date1.getTime() === date2.getTime();
    }

    public keuzeStartUitkeringZichtbaar() {
        return UwGegevensModel.keuzeStartUitkeringVanToepassing(this.form.getModel());
    }

    public sectieBevallingZichtbaar(): boolean {
        return this.form.getModel().bevallen === JaNeeEnum.ja;
    }

    public uitkeringsdatum() {
        const model = this.form.getModel();
        if (!model.keuzeStartUitkering) {
            return;
        }
        const berekendeuitkeringsdatum = domain.uitkeringsdatum(
            this.meerling,
            model.datumVermoedelijkeBevalling,
            model.bevallen === JaNeeEnum.ja,
            model.datumBevalling,
            model.keuzeStartUitkering,
            model.datumUitkering);
        return berekendeuitkeringsdatum;
    }

    public uitkeringsdatumOuderDanEenJaar() {
        return datumOuderDanEenJaar(this.uitkeringsdatum());
    }

    public uitkeringsjaar() {
        const model = this.form.getModel();
        if (!model.keuzeStartUitkering) {
            return;
        }
        const berekenduitkeringsjaar = domain.uitkeringsjaar(
            this.meerling,
            model.datumVermoedelijkeBevalling,
            model.bevallen === JaNeeEnum.ja,
            model.datumBevalling,
            model.keuzeStartUitkering,
            model.datumUitkering);
        return berekenduitkeringsjaar;
    }
}
