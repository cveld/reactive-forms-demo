import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { DatumValidators } from 'src/app/shared/forms/datum-validators';
import { UwGegevens } from 'src/app/shared/models/uw-gegevens';
import { StappenVariantEnum, JaNeeEnum } from 'src/app/shared/enums';
import { FormValidators } from 'src/app/shared/forms/form-validators';
import { IDateModel, IDate } from 'src/app/lib/date-picker/interfaces';

/** Form voor de WAZO-stap Uw Gegevens */
export class UwGegevensForm extends FormGroup {
  /** references to the changes of the hasEducation control */
  // public hasEducationChanges: Observable<boolean> = this.controls.hasEducation.valueChanges;
    public valueChanges = this.valueChanges;

    constructor(public meerling: boolean, public stappenVariant: StappenVariantEnum, uwGegevens?: UwGegevens) {
        super({
            meerling: new FormControl(meerling),
            stappenVariant: new FormControl(stappenVariant),
            datumVermoedelijkeBevalling: new FormControl(undefined, [Validators.required, DatumValidators.datumNietValide]),
            datumBevalling: new FormControl(undefined, [FormValidators.RequiredExpressionValidator<UwGegevens>((model, controlName) => {
                return model.bevallen === JaNeeEnum.ja;
            }), DatumValidators.datumNietValide,  DatumValidators.datumNietInToekomst]),
            kindOverleden: new FormControl(undefined),
            bevallen: new FormControl(undefined, [Validators.required]),
            keuzeStartUitkering: new FormControl(undefined, [FormValidators.RequiredExpressionValidator<UwGegevens>((model, controlName) => {
                return !this.vroeggeboorte();
            })]),
            datumUitkering: new FormControl(undefined, [FormValidators.RequiredExpressionValidator<UwGegevens>((model, controlName) => {
                return model.keuzeStartUitkering === 'anders';
            }), DatumValidators.datumNietValide, UwGegevensForm.DatumUitkeringValide]),
            intentieverklaring: new FormControl(undefined, [FormValidators.RequiredExpressionValidator<UwGegevens>((model, controlName) => {
                return stappenVariant === StappenVariantEnum.ww;
            }), ])
        });
    }

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
        const b = datemodel.jsdate >= periode.min && datemodel.jsdate <= periode.max;
        return b ? null : {
            DatumUitkeringNietValide: true
        };
    }

    flexibiliseringsperiodeMetDatumBevalling() {
        const flexibiliseringsperiode = this.flexibiliseringsperiode();
        if (this.getModel().bevallen
            && DatumValidators.valideIDateModel(this.getModel().datumBevalling)
            && this.getModel().datumBevalling.jsdate >= flexibiliseringsperiode.min
            && this.getModel().datumBevalling.jsdate < flexibiliseringsperiode.max
            ) {
            flexibiliseringsperiode.max = this.getModel().datumBevalling.jsdate;
        }
        return flexibiliseringsperiode;
    }

    // 6-4wk
    // 10-8wk
    flexibiliseringsperiode(): {min: Date, max: Date} {
        let flexibiliseringsperiode;
        if (!this.meerling) {
            flexibiliseringsperiode = {
                min: this.addDays(this.getModel().datumVermoedelijkeBevalling, -6 * 7),
                max: this.addDays(this.getModel().datumVermoedelijkeBevalling, -4 * 7)
            };
        } else {
            flexibiliseringsperiode = {
                min: this.addDays(this.getModel().datumVermoedelijkeBevalling, -10 * 7),
                max: this.addDays(this.getModel().datumVermoedelijkeBevalling, -8 * 7)
            };
        }

        return flexibiliseringsperiode;
    }

    addDays(date: IDateModel, days: number): Date {
        const result = new Date(date.jsdate);
        result.setDate(result.getDate() + days);
        return result;
    }

    // addDays(theDate: IDateModel, days: number) {
    //     return new Date(theDate.jsdate.getTime() + days * 24 * 60 * 60 * 1000);
    // }



  /** (Re-)initializes the form */
  public setNoEducation(): void {


    this.reset({
      hasEducation: false
    });
  }

  /** Gets the model of this form */
  public getModel(): UwGegevens {
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

  public vroeggeboorte() {
    if (!DatumValidators.valideIDateModel(this.getModel().datumVermoedelijkeBevalling)
    || !DatumValidators.valideIDateModel(this.getModel().datumBevalling)) {
        return undefined;
    }
    const b = this.getModel().datumBevalling.jsdate < this.flexibiliseringsperiode().min;
    return b;
}

}
