import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AdresModel } from '../../../shared/models/adres-model';

import { log } from 'util';
import { ResultaatType } from '../../../shared/models/ResultaatType';
import { FormValidators } from 'src/app/shared/forms/form-validators';
import { JaNeeEnum } from 'src/app/shared/enums';
import { CustomValidators } from 'src/app/lib/forms/shared/custom-validators';

export class AdresgegevensForm extends FormGroup {
    constructor(options?: {resultaat?: ResultaatType, adres?: AdresModel}) {
        super({

            // 1 veld voor binnen en buitenland toont melding niet goed
            // velden die afwijkende validatie nodig hebben zijn geplitst naar 'normaal'en'buitendland.
            // Geldt nu voor postcode,huisnummer en telefoonnummer

            postcode: new FormControl(options.adres ? options.adres.postcode : undefined,
                [
                    FormValidators.ConditionalValidators<AdresModel>(model => this.shouldValidateBinnenlandsAdres(model),
                        [Validators.required, CustomValidators.postalcodeValidator]),
                ]),
            postcodebuitenland: new FormControl(options.adres ? options.adres.postcodebuitenland : undefined,
                [
                    // Buitenland:
                    FormValidators.ConditionalValidators<AdresModel>(model => this.shouldValidateBuitenlandsAdres(model),
                        [Validators.required])
                ]),
            huisnummer: new FormControl(options.adres ? options.adres.huisnummer : undefined,
                [
                    FormValidators.ConditionalValidators<AdresModel>(model => this.shouldValidateBinnenlandsAdres(model),
                        [Validators.required, CustomValidators.huisnummerBinnenlandValidator]),
                ]),
            huisnummerbuitenland: new FormControl(options.adres ? options.adres.huisnummer : undefined,
                [
                    FormValidators.ConditionalValidators<AdresModel>(model => this.shouldValidateBuitenlandsAdres(model),
                        [Validators.required])
                ]),
            huisnummertoevoeging: new FormControl(options.adres ? options.adres.huisnummertoevoeging : undefined),

            straat: new FormControl(options.adres ? options.adres.straat : undefined,
                [
                    FormValidators.ConditionalValidators<AdresModel>(model => this.shouldValidateAdres(model),
                    [Validators.required, CustomValidators.straatValidator]),
                ]),

            woonplaats: new FormControl(options.adres ? options.adres.woonplaats : undefined,
                FormValidators.ConditionalValidators<AdresModel>(model => this.shouldValidateAdres(model),
                    [Validators.required, CustomValidators.woonplaatsValidator])),

            locatieOmschrijving: new FormControl(options.adres ? options.adres.locatieOmschrijving : undefined),
            regio: new FormControl(options.adres ? options.adres.regio : undefined),
            land: new FormControl(options.adres ? options.adres.land : undefined, FormValidators.ConditionalValidators<AdresModel>(model => this.shouldValidateBuitenlandsAdres(model),
                [Validators.required])),

            telefoonnummer: new FormControl(options.adres ? options.adres.telefoonnummer : undefined, [CustomValidators.phonenumberValidatorNederland]),
            telefoonnummerbuitenland: new FormControl(options.adres ? options.adres.telefoonnummerbuitenland : undefined, [CustomValidators.phonenumberValidatorBuitenland]),

            adresbuitenland: new FormControl(undefined, [FormValidators.RequiredExpressionValidator<AdresModel>((model, controlName) => {
                return (this.shouldValidateAdres(model));
            })]),
            bekendadresgebruiken: new FormControl(options.adres ? options.adres.bekendadresgebruiken : undefined, [FormValidators.RequiredExpressionValidator<AdresModel>((model, controlName) => {
                return (model.resultaat === ResultaatType.Succes);
            }, 'bekendadresgebruiken')]),
            resultaat: new FormControl(options.resultaat ? options.resultaat : undefined),

        });

        //this.valueChanges.subscribe(() => {
        //   console.log(this);
        //   console.log(this.getModel());
        //});
    }

    public setResultaat(resultaat: ResultaatType) {
        this.controls.resultaat.setValue(resultaat);
    }

    /**
     * Gets the model of the form
     */
    public getModel(): AdresModel {
        return {
            postcode: this.shouldValidateBinnenlandsAdres(this.value) ? this.value.postcode : undefined,
            postcodebuitenland: this.shouldValidateBuitenlandsAdres(this.value) ? this.value.postcodebuitenland : undefined,
            huisnummer: this.shouldValidateBinnenlandsAdres(this.value) ? this.value.huisnummer : undefined,
            huisnummerbuitenland: this.shouldValidateBuitenlandsAdres(this.value) ? this.value.huisnummerbuitenland : undefined,
            huisnummertoevoeging: this.shouldValidateAdres(this.value) ? this.value.huisnummertoevoeging : undefined,
            straat: this.shouldValidateAdres(this.value) ? this.value.straat : undefined,
            woonplaats: this.shouldValidateAdres(this.value) ? this.value.woonplaats : undefined,
            locatieOmschrijving: this.shouldValidateAdres(this.value) ? this.value.locatieOmschrijving : undefined,
            regio: this.shouldValidateAdres(this.value) ? this.value.regio : undefined,
            land: this.shouldValidateAdres(this.value) ? this.value.land : undefined,
            telefoonnummer: this.shouldValidateBinnenlandsAdres(this.value) ? this.value.telefoonnummer : undefined,
            telefoonnummerbuitenland: this.shouldValidateBuitenlandsAdres(this.value) ? this.value.telefoonnummerbuitenland : undefined,

            adresbuitenland: this.shouldValidateAdres(this.value) ? this.value.adresbuitenland : undefined,
            bekendadresgebruiken: this.value.bekendadresgebruiken,
            resultaat: this.value.resultaat,
        };
    }

    // het gaat om velden die zowel bij binnenland als buitenland worden ingevuld (i.g.v. een niet bekend adres)
    private shouldValidateAdres(model: AdresModel): boolean {
        const b = (model.bekendadresgebruiken === JaNeeEnum.nee || model.resultaat === ResultaatType.NietGevonden || model.resultaat === ResultaatType.Fout);
        return b;
    }

    private shouldValidateBinnenlandsAdres(model: AdresModel): boolean {
        return this.shouldValidateAdres(model) && model.adresbuitenland === JaNeeEnum.nee;
    }
    private shouldValidateBuitenlandsAdres(model: AdresModel): boolean {
        return this.shouldValidateAdres(model) && model.adresbuitenland === JaNeeEnum.ja;
    }
}
