import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { BetaalwijzeModel } from 'src/app/shared/models/betaalwijze-model';
import { FormValidators } from 'src/app/shared/forms/form-validators';
import { SoortRekeningnummerEnum } from 'src/app/shared';
import { CustomValidators } from 'src/app/lib/forms/shared/custom-validators';

export class BetaalwijzeForm extends FormGroup {
    constructor(betaalwijzeData?: BetaalwijzeModel) {
        super({
            indicatieLoonheffingskorting: new FormControl(betaalwijzeData ? betaalwijzeData.indicatieLoonheffingskorting : undefined, [Validators.required]),
            indicatieVrijwilligeZW: new FormControl(betaalwijzeData ? betaalwijzeData.indicatieVrijwilligeZW : undefined, [Validators.required]),
            soortRekeningnummer: new FormControl(betaalwijzeData ? betaalwijzeData.soortRekeningnummer : undefined, [Validators.required]),
            IBAN: new FormControl(betaalwijzeData ? betaalwijzeData.IBAN : undefined, [Validators.required, CustomValidators.validIBAN]),
            BIC: new FormControl(betaalwijzeData ? betaalwijzeData.BIC : undefined,
                FormValidators.ConditionalValidators<BetaalwijzeModel>(model => this.shouldValidateForBuitenland(model),
                    [Validators.required, CustomValidators.validBIC])),
            bankNaam: new FormControl(betaalwijzeData ? betaalwijzeData.bankNaam : undefined,
                FormValidators.ConditionalValidators<BetaalwijzeModel>(model => this.shouldValidateForBuitenland(model),
                    [Validators.required])),
            bankPlaats: new FormControl(betaalwijzeData ? betaalwijzeData.bankPlaats : undefined,
                FormValidators.ConditionalValidators<BetaalwijzeModel>(model => this.shouldValidateForBuitenland(model),
                    [Validators.required])),
            loonheffingennummer: new FormControl(betaalwijzeData ? betaalwijzeData.loonheffingennummer : undefined,
                FormValidators.ConditionalValidators<BetaalwijzeModel>(model => this.shouldValidateForUitzendbureau(model),
                    [Validators.required, CustomValidators.LoonheffingennummerValidator])),
            uitzendbureauNaam: new FormControl(betaalwijzeData ? betaalwijzeData.uitzendbureauNaam : undefined,
                FormValidators.ConditionalValidators<BetaalwijzeModel>(model => this.shouldValidateForUitzendbureau(model),
                    [Validators.required])),
            intentieverklaring: new FormControl(betaalwijzeData ? betaalwijzeData.intentieverklaring : undefined, (control: AbstractControl) => {
                return control.value === true ? null : { checked : false };
            })
        });
    }

    public getModel(): BetaalwijzeModel {
        return {
            indicatieLoonheffingskorting: this.value.indicatieLoonheffingskorting,
            indicatieVrijwilligeZW: this.value.indicatieVrijwilligeZW,
            soortRekeningnummer: this.value.soortRekeningnummer,
            IBAN: this.value.IBAN,
            BIC: this.shouldValidateForBuitenland(this.value) ? this.value.BIC : undefined,
            bankNaam: this.shouldValidateForBuitenland(this.value) ? this.value.bankNaam : undefined,
            bankPlaats: this.shouldValidateForBuitenland(this.value) ? this.value.bankPlaats : undefined,
            loonheffingennummer: this.shouldValidateForUitzendbureau(this.value) ? this.value.loonheffingennummer : undefined,
            uitzendbureauNaam: this.shouldValidateForUitzendbureau(this.value) ? this.value.uitzendbureauNaam : undefined,
            intentieverklaring: this.value.intentieverklaring
        };
    }

    private shouldValidateForBuitenland(model: BetaalwijzeModel): boolean {
        return model.soortRekeningnummer === SoortRekeningnummerEnum.Buitenland;
    }

    private shouldValidateForUitzendbureau(model: BetaalwijzeModel): boolean {
        return model.soortRekeningnummer === SoortRekeningnummerEnum.Uitzendbureau;
    }
}
