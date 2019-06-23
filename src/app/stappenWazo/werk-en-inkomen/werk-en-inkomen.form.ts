import { FormGroup, FormControl, Validators } from '@angular/forms';
import { WerkEnInkomenModel } from 'src/app/shared/models/werk-en-inkomen-model';
import { FormValidators } from 'src/app/shared/forms/form-validators';
import { HeelKalenderjaarZEZEnum, JaNeeEnum } from 'src/app/shared/enums';
import { DatumValidators } from 'src/app/shared/forms/datum-validators';
import { SituatieInkomstenEnum } from 'src/app/shared/enums/situatieinkomsten.enum';

export class WerkEnInkomenForm extends FormGroup {
    constructor(werkEnInkomenData?: WerkEnInkomenModel) {
        super({
            situatieInkomsten: new FormControl(werkEnInkomenData ? werkEnInkomenData.situatieInkomsten : undefined, [Validators.required]),

            kvknummer: new FormControl(werkEnInkomenData ? werkEnInkomenData.kvknummer : undefined,
                FormValidators.ConditionalValidators<WerkEnInkomenModel>(model => this.shouldValidateKvknummer(model),
                    [Validators.required, Validators.pattern(/([0-9]{8})/)])),

            indicatieUrencriteriumZEZ: new FormControl(werkEnInkomenData ? werkEnInkomenData.indicatieUrencriteriumZEZ : undefined, [Validators.required]),

            datumStartWerk: new FormControl(werkEnInkomenData ? werkEnInkomenData.datumStartWerk : undefined,
                FormValidators.ConditionalValidators<WerkEnInkomenModel>(model => this.shouldValidateDatumStartWerk(model),
                    [Validators.required, DatumValidators.datumValide, DatumValidators.datumNietInToekomst])),

            heelKalenderjaarZEZ: new FormControl(werkEnInkomenData ? werkEnInkomenData.heelKalenderjaarZEZ : undefined,
                FormValidators.ConditionalValidators<WerkEnInkomenModel>(model => this.shouldValidateHeelKalenderjaarZEZ(model),
                    [Validators.required])),

            toelichtingHeelKalenderjaarZEZ: new FormControl(werkEnInkomenData ? werkEnInkomenData.toelichtingHeelKalenderjaarZEZ : undefined,
                FormValidators.ConditionalValidators<WerkEnInkomenModel>(model => this.shouldValidateToelichtingHeelKalenderjaarZEZ(model),
                    [Validators.required])),

            indicatieAangifteIB1: new FormControl(werkEnInkomenData ? werkEnInkomenData.indicatieAangifteIB1 : undefined,
                FormValidators.ConditionalValidators<WerkEnInkomenModel>(model => this.shouldValidateIndicatieAangifteIB1(model),
                    [Validators.required])),

            bedragInkomstenIB1: new FormControl(werkEnInkomenData ? werkEnInkomenData.bedragInkomstenIB1 : undefined,
                FormValidators.ConditionalValidators<WerkEnInkomenModel>(model => this.shouldValidateBedragInkomstenIB1(model),
                    [Validators.required, Validators.pattern(/([0-9,.]+)/), Validators.min(0)])),

            indicatieAangifteIB2: new FormControl(werkEnInkomenData ? werkEnInkomenData.indicatieAangifteIB2 : undefined,
                FormValidators.ConditionalValidators<WerkEnInkomenModel>(model => this.shouldValidateIndicatieAangifteIB2(model),
                    [Validators.required])),

            bedragInkomstenIB2: new FormControl(werkEnInkomenData ? werkEnInkomenData.bedragInkomstenIB2 : undefined,
                FormValidators.ConditionalValidators<WerkEnInkomenModel>(model => this.shouldValidateBedragInkomstenIB2(model),
                    [Validators.required, Validators.pattern(/([0-9,.]+)/), Validators.min(0)])),

            schattingInkomsten: new FormControl(werkEnInkomenData ? werkEnInkomenData.schattingInkomsten : undefined,
                FormValidators.ConditionalValidators<WerkEnInkomenModel>(model => this.shouldValidateSchattingInkomsten(model),
                    [Validators.required, Validators.pattern(/([0-9,.]+)/), Validators.min(0)]))
        });
    }

    public getModel(): WerkEnInkomenModel {
        return {
            situatieInkomsten: this.value.situatieInkomsten,
            kvknummer: this.shouldValidateKvknummer(this.value) ? this.value.kvknummer : undefined,
            indicatieUrencriteriumZEZ: this.value.indicatieUrencriteriumZEZ,
            datumStartWerk: this.shouldValidateDatumStartWerk(this.value) ? this.value.datumStartWerk : undefined,
            heelKalenderjaarZEZ: this.shouldValidateHeelKalenderjaarZEZ(this.value) ? this.value.heelKalenderjaarZEZ : undefined,
            toelichtingHeelKalenderjaarZEZ: this.shouldValidateToelichtingHeelKalenderjaarZEZ(this.value) ? this.value.toelichtingHeelKalenderjaarZEZ : undefined,
            indicatieAangifteIB1: this.shouldValidateIndicatieAangifteIB1(this.value) ? this.value.indicatieAangifteIB1 : undefined,
            bedragInkomstenIB1: this.shouldValidateBedragInkomstenIB1(this.value) ? this.value.bedragInkomstenIB1 : undefined,
            indicatieAangifteIB2: this.shouldValidateIndicatieAangifteIB2(this.value) ? this.value.indicatieAangifteIB2 : undefined,
            bedragInkomstenIB2: this.shouldValidateBedragInkomstenIB2(this.value) ? this.value.bedragInkomstenIB2 : undefined,
            schattingInkomsten: this.shouldValidateSchattingInkomsten(this.value) ? this.value.schattingInkomsten : undefined
        };
    }

    private shouldValidateKvknummer(model: WerkEnInkomenModel): boolean {
        return model.situatieInkomsten === SituatieInkomstenEnum.EigenOnderneming;
    }

    private shouldValidateDatumStartWerk(model: WerkEnInkomenModel): boolean {
        return ((model.situatieInkomsten === SituatieInkomstenEnum.BedrijfEchtgenootPartner
            || model.situatieInkomsten === SituatieInkomstenEnum.EigenOnderneming
            || model.situatieInkomsten === SituatieInkomstenEnum.AlfaParticuliereHulp)
            && model.indicatieUrencriteriumZEZ === JaNeeEnum.nee);
    }

    private shouldValidateHeelKalenderjaarZEZ(model: WerkEnInkomenModel): boolean {
        return ((model.situatieInkomsten === SituatieInkomstenEnum.BedrijfEchtgenootPartner
            || model.situatieInkomsten === SituatieInkomstenEnum.EigenOnderneming
            || model.situatieInkomsten === SituatieInkomstenEnum.AlfaParticuliereHulp)
            && model.indicatieUrencriteriumZEZ === JaNeeEnum.nee);
    }

    private shouldValidateToelichtingHeelKalenderjaarZEZ(model: WerkEnInkomenModel): boolean {
        return ((model.situatieInkomsten === SituatieInkomstenEnum.BedrijfEchtgenootPartner
            || model.situatieInkomsten === SituatieInkomstenEnum.EigenOnderneming
            || model.situatieInkomsten === SituatieInkomstenEnum.AlfaParticuliereHulp)
            && model.indicatieUrencriteriumZEZ === JaNeeEnum.nee
            && model.heelKalenderjaarZEZ === HeelKalenderjaarZEZEnum.NeeToelichting);
    }

    private shouldValidateIndicatieAangifteIB1(model: WerkEnInkomenModel): boolean {
        return ((model.situatieInkomsten === SituatieInkomstenEnum.BedrijfEchtgenootPartner
            || model.situatieInkomsten === SituatieInkomstenEnum.EigenOnderneming
            || model.situatieInkomsten === SituatieInkomstenEnum.AlfaParticuliereHulp)
            && model.indicatieUrencriteriumZEZ === JaNeeEnum.nee);
    }

    private shouldValidateBedragInkomstenIB1(model: WerkEnInkomenModel): boolean {
        return this.shouldValidateIndicatieAangifteIB1(model)
            && model.indicatieAangifteIB1 === JaNeeEnum.ja;
    }

    private shouldValidateIndicatieAangifteIB2(model: WerkEnInkomenModel): boolean {
        return this.shouldValidateIndicatieAangifteIB1(model)
            && model.indicatieAangifteIB1 === JaNeeEnum.nee;
    }

    private shouldValidateBedragInkomstenIB2(model: WerkEnInkomenModel): boolean {
        return this.shouldValidateIndicatieAangifteIB2(model)
            && model.indicatieAangifteIB2 === JaNeeEnum.ja;
    }

    private shouldValidateSchattingInkomsten(model: WerkEnInkomenModel): boolean {
        return this.shouldValidateIndicatieAangifteIB2(model)
            && model.indicatieAangifteIB2 === JaNeeEnum.nee;
    }
}
