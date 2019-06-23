import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { DatumValidators } from 'src/app/shared/forms/datum-validators';
import { UwGegevensModel } from 'src/app/shared/models/uw-gegevens-model';
import { StappenVariantEnum, JaNeeEnum } from 'src/app/shared/enums';
import { FormValidators } from 'src/app/shared/forms/form-validators';
import { IDateModel, IDate } from 'src/app/lib/date-picker/interfaces';
import { AdresgegevensForm } from './adresgegevens/adresgegevens.form';
import * as domain from 'src/app/shared/helper/domain';

/** Form voor de WAZO-stap Uw Gegevens */
export class UwGegevensForm extends FormGroup {
    /** references to the changes of the hasEducation control */
    public valueChanges = this.valueChanges;

    constructor(public meerling: boolean, public stappenVariant: StappenVariantEnum, uwGegevens?: UwGegevensModel) {
        super({
            meerling: new FormControl(meerling),
            stappenVariant: new FormControl(stappenVariant),
            datumVermoedelijkeBevalling: new FormControl(uwGegevens ? uwGegevens.datumVermoedelijkeBevalling : undefined, [DatumValidators.datumVerplicht, DatumValidators.datumValide]),
            datumBevalling: new FormControl(uwGegevens ? uwGegevens.datumBevalling : undefined,
                FormValidators.ConditionalValidators<UwGegevensModel>(model => {
                    return UwGegevensModel.datumBevallingVanToepassing(model);
                }, [DatumValidators.datumVerplicht, DatumValidators.datumValide,  DatumValidators.datumNietInToekomst])),
            kindOverleden: new FormControl(uwGegevens ? uwGegevens.kindOverleden : undefined),
            bevallen: new FormControl(uwGegevens ? uwGegevens.bevallen : undefined, [Validators.required]),
            keuzeStartUitkering: new FormControl(uwGegevens ? uwGegevens.keuzeStartUitkering : undefined, [FormValidators.RequiredExpressionValidator<UwGegevensModel>((model, controlName) => {
                return UwGegevensModel.keuzeStartUitkeringVanToepassing(model);
            }, 'keuzeStartUitkering')]),
            datumUitkering: new FormControl(uwGegevens ? uwGegevens.datumUitkering : undefined,
                [FormValidators.ConditionalValidators<UwGegevensModel>(model => {
                    return UwGegevensModel.datumUitkeringVanToepassing(model);
                }, [DatumValidators.datumVerplicht, DatumValidators.datumValide, UwGegevensForm.DatumUitkeringValide])]),
            intentieverklaring: new FormControl(uwGegevens ? uwGegevens.intentieverklaring : undefined, [FormValidators.RequiredExpressionValidator<UwGegevensModel>((model, controlName) => {
                return stappenVariant === StappenVariantEnum.ww;
            })]),
        });
    }
    /** FormValidator om vast te stellen of de opgegeven datum een valide datum uitkering betreft */
    static DatumUitkeringValide(control: AbstractControl): {DatumUitkeringNietValide: boolean} {
        if (!control.parent) {
            return {
                DatumUitkeringNietValide: true
            };
        }

        if (!DatumValidators.isDatumValid(control)) {
            return null;
        }

        const form: UwGegevensForm = control.parent as UwGegevensForm;
        if (form.getModel().keuzeStartUitkering !== 'anders') {
            return null;
        }
        const periode = form.flexibiliseringsperiodeMetDatumBevalling();
        const datemodel: IDateModel = control.value as IDateModel;
        const datumUitkeringValide = datemodel.jsdate >= periode.min && datemodel.jsdate <= periode.max;
        return datumUitkeringValide ? null : {
            DatumUitkeringNietValide: true
        };
    }

    /** Geeft het datuminterval terug waarin de uitkeringsdatum moet vallen en compenseert voor een bevallingsdatum in deze flexperiode */
    flexibiliseringsperiodeMetDatumBevalling(): { min: Date, max: Date } {
        const model = this.getModel();
        return domain.flexibiliseringsperiodeMetDatumBevalling(this.meerling, model.datumVermoedelijkeBevalling, model.bevallen === JaNeeEnum.ja, model.datumBevalling);
    }

    /** Berekent op basis van de vermoedelijke bevallingsdatum de flexperiode. Deze is afhankelijk van meerlingen:
     *  * geen meerlingen: 6-4wk
     *  * meerlingen: 10-8wk
     */
    flexibiliseringsperiode(): {min: Date, max: Date} {
        return domain.flexibiliseringsperiode(this.meerling, this.getModel().datumVermoedelijkeBevalling);
    }

    /** functie om dagen op te tellen bij een javascript Date object met behoud van de timezone */
    addDays(date: IDateModel, days: number): Date {
        const result = new Date(date.jsdate);
        result.setDate(result.getDate() + days);
        return result;
    }

    /** Gets the model of this form */
    public getModel(): UwGegevensModel {
        return {
            meerling: this.meerling,
            stappenVariant: this.stappenVariant,
            datumVermoedelijkeBevalling: this.value.datumVermoedelijkeBevalling as IDateModel,
            datumBevalling: this.value.datumBevalling as IDateModel,
            kindOverleden: this.value.kindOverleden,
            bevallen: this.value.bevallen,
            keuzeStartUitkering: this.value.keuzeStartUitkering,
            datumUitkering: this.value.datumUitkering as IDateModel,
            intentieverklaring: this.value.intentieverklaring
        };
    }

    /** bepaalt op basis van bevallingsdatum en flexperiode of de situatie een vroeggeboorte betreft */
    public vroeggeboorte(): boolean {
        const model = this.getModel();
        if (!model.bevallen) {
            return false;
        }
        const result: boolean = domain.vroeggeboorte(model.meerling, model.datumVermoedelijkeBevalling, model.datumBevalling);
        return result;
    }

}
