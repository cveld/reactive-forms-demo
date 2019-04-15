import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IWizardStepComponent } from '../../shared/models';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAppState } from '../../core/store/app-state.interface';
import { SaveUwSituatie } from '../../core/store/uw-situatie/uw-situatie.actions';
import { VolgendeStap } from '../../core/store/actievestap/actievestap.actions';
import { UwSituatieModel } from '../../shared/models/uw-situatie';
import { FormValidators } from '../../shared/forms/form-validators';





@Component({
  // tslint:disable-next-line:component-selector
  selector: 'uw-situatie',
  templateUrl: './uw-situatie.component.html',
  styleUrls: ['./uw-situatie.component.css']
})
export class UwSituatieComponent implements OnInit, OnDestroy, IWizardStepComponent {
    naamStap = 'Uw situatie';
    isEditable: boolean;
    isCompleted: boolean;
    public form: FormGroup;
    public submitted = false;
    private subscriptions: Array<Subscription> = new Array<Subscription>();
    private validating = false;

    complete(): void {
      throw new Error('Method not implemented.');
    }

    constructor(
      private formBuilder: FormBuilder,
      private readonly store: Store<IAppState>
    ) { }

    ngOnInit() {
        this.setupFormData();
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((s) => s.unsubscribe());
    }

    setupFormData() {
        this.form = this.formBuilder.group({
            wwsituatie: ['', [Validators.required]],
            zelfstandige: ['', [Validators.required]],
            wwofzelfstandig: ['', [FormValidators.RequiredExpressionValidator<UwSituatieModel>((model, controlName) => {
                return model.wwsituatie !== 'geen' && model.zelfstandige === 'ja';
            })]],
            meerling: ['', [FormValidators.RequiredExpressionValidator<UwSituatieModel>((model, controlName) => {
                return model.wwsituatie !== 'geen' || model.zelfstandige === 'ja';
            })]]
        });

        this.subscriptions.push(this.form.valueChanges.subscribe((...parameters) => {
            setTimeout(() =>
            this.revalidate(...parameters), 0);
        }));
    }

    // uitzoeken: wellicht kunnen we voorkomen dat we handmatig een revalidate moeten aftrappen?
    revalidate(...parameters): void {
        if (this.submitted && !this.validating) {
            this.validateForm();
        }
    }

    volgendeClicked() {
        this.submitted = true;
        this.validateForm();
        if (this.form.invalid) {
            return;
        }

        // submit ACTION
        this.store.dispatch(new SaveUwSituatie(this.form.value));
        this.store.dispatch(new VolgendeStap());
    }

    private validateForm() {
        this.validating = true;
        FormValidators.validateForm(this.form, true);
        this.validating = false;
    }
}
