import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { IWizardStepComponent } from '../../shared/models';
import { UwGegevensFormComponent } from './uw-gegevens-form.component';
import { FormValidators } from '../../shared/forms/form-validators';
import { IAppState, selectStappenvariant, selectUwSituatie } from '../../core/store/app-state.interface';
import { Store, select } from '@ngrx/store';
import { VolgendeStap, ChangeStap } from '../../core/store/actievestap/actievestap.actions';
import { SaveUwGegevens } from '../../core/store/uw-gegevens/uw-gegevens.actions';
import { Subscription, Observable } from 'rxjs';
import { StappenVariantEnum, JaNeeEnum } from '../../shared/enums';
import { UwSituatieModel } from '../../shared/models/uw-situatie';
import { AdresgegevensComponent } from './adresgegevens/adresgegevens.component';
import { AdresgegevensForm } from './adresgegevens/adresgegevens.form';
import { UwGegevensForm } from './uw-gegevens.form';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'uw-gegevens',
    templateUrl: './uw-gegevens.component.html',
    styleUrls: ['./uw-gegevens.component.scss']
})
export class UwGegevensComponent implements OnInit, OnDestroy, IWizardStepComponent {
    isEditable: boolean;
    isCompleted: boolean;
    submitted = false;
    validating = false;
    @ViewChild(UwGegevensFormComponent)
    uwGegevensFormComponent: UwGegevensFormComponent;
    @ViewChild(AdresgegevensComponent)
    AdresgegevensComponent: AdresgegevensComponent;
    subscriptions: Array<Subscription> = new Array<Subscription>();
    stappenVariant$: Observable<StappenVariantEnum>;
    stappenVariant: StappenVariantEnum;
    uwSituatie: UwSituatieModel;
    uwSituatie$: Observable<UwSituatieModel>;
    params: Params;

    // Enum definition pass-throughs voor de view template:
    StappenVariantEnum = StappenVariantEnum;
    JaNeeEnum = JaNeeEnum;
    adresgegevensFormState: string[][];
    uwGegevensFormState: string[][];

    complete(): void {
        throw new Error('Method not implemented.');
    }

    constructor(
        private readonly store: Store<IAppState>,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        // WW of zelfstandige
        this.stappenVariant$ = this.store.pipe(select(selectStappenvariant));
        this.uwSituatie$ = this.store.pipe(select(selectUwSituatie));
        this.subscriptions.push(this.uwSituatie$.subscribe(d => {
            this.uwSituatie = d;
        }));
        this.subscriptions.push(this.stappenVariant$.subscribe(d => {
            this.stappenVariant = d;
        }));
        this.subscriptions.push(this.activatedRoute.queryParams.subscribe(params => {
            this.params = params;
        }));
    }

    ngAfterViewInit() {
        this.subscriptions.push(
            this.AdresgegevensComponent.AdresgegevensFormComponent.form.valueChanges.subscribe(form => {
                this.setAdresgegevensFormState(this.AdresgegevensComponent.AdresgegevensFormComponent.form);
            }));
        this.subscriptions.push(
            this.uwGegevensFormComponent.form.valueChanges.subscribe(form => {
                this.setUwGegevensFormState(this.uwGegevensFormComponent.form);
            }));
    }
    public setAdresgegevensFormState(form: AdresgegevensForm) {
        this.adresgegevensFormState = Object.keys(form.controls).map(c => [c, form.controls[c].status]);
    }

    public setUwGegevensFormState(form: UwGegevensForm) {
        this.uwGegevensFormState = Object.keys(this.uwGegevensFormComponent.form.controls).map(c => [c, this.uwGegevensFormComponent.form.controls[c].status]);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    volgendeClicked() {
        this.submitted = true;
        this.uwGegevensFormComponent.validateForm();
        if (this.uwGegevensFormComponent.form.valid) {
            // submit ACTION
            this.store.dispatch(new SaveUwGegevens(this.uwGegevensFormComponent.form.getModel()));

            if (this.stappenVariant === StappenVariantEnum.ww) {
                this.store.dispatch(new ChangeStap(0));
                this.router.navigate(['/bevestiging'] );
            } else {
                this.store.dispatch(new VolgendeStap());
            }
        }
    }
}
