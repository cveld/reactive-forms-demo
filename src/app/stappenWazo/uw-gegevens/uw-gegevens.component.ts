import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { IWizardStepComponent } from '../../shared/models';
import { UwGegevensFormComponent } from './uw-gegevens-form.component';
import { FormValidators } from '../../shared/forms/form-validators';
import { IAppState, selectStappenvariant, selectUwSituatie, selectUwGegevens, selectUitkeringsjaar } from '../../core/store/app-state.interface';
import { Store, select } from '@ngrx/store';
import { VolgendeStap, ChangeStap } from '../../core/store/actievestap/actievestap.actions';
import { SaveUwGegevens } from '../../core/store/uw-gegevens/uw-gegevens.actions';
import { Subscription, Observable } from 'rxjs';
import { StappenVariantEnum, JaNeeEnum } from '../../shared/enums';
import { UwSituatieModel } from '../../shared/models/uw-situatie-model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { VerstuurFormulierModel } from '../../shared/models/verstuur-formulier.model';
import { FormulierActions } from '../../core/store/formulier/formulier.actions';
import { IServerOperation } from 'edv-ngrx-server-operation';
import { selectVerstuurOperation, selectVerstuurValidationError } from '../../core/store/formulier/formulier.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { AdresgegevensFormComponent } from './adresgegevens/adresgegevens-form.component';
import { AdresgegevensComponent } from './adresgegevens/adresgegevens.component';
import { UwGegevensModel } from 'src/app/shared/models/uw-gegevens-model';
import { ConfigurationService } from 'edv-configuration';
import { AdresgegevensForm } from './adresgegevens/adresgegevens.form';
import { UwGegevensForm } from './uw-gegevens.form';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'uw-gegevens',
    templateUrl: './uw-gegevens.component.html',
    styleUrls: ['./uw-gegevens.component.scss']
})
export class UwGegevensComponent implements OnInit, AfterViewInit, OnDestroy, IWizardStepComponent {
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
    uwGegevens$: Observable<UwGegevensModel>;
    params: Params;
    public verstuurOperation$: Observable<IServerOperation | undefined>;
    public verstuurErrors$: Observable<HttpErrorResponse | undefined>;
    public readonly labelGroupId = 'stap2';
    public adresgegevensFormState: any;
    public uwGegevensFormState: any;

    // Enum definition pass-throughs voor de view template:
    StappenVariantEnum = StappenVariantEnum;
    JaNeeEnum: typeof JaNeeEnum = JaNeeEnum;
    complete(): void {
        throw new Error('Method not implemented.');
    }

    constructor(
        private readonly store: Store<IAppState>,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private readonly configurationService: ConfigurationService
    ) { }

    ngOnInit() {
        // WW of zelfstandige
        this.stappenVariant$ = this.store.pipe(select(selectStappenvariant));
        this.uwSituatie$ = this.store.pipe(select(selectUwSituatie));
        this.uwGegevens$ = this.store.pipe(select(selectUwGegevens));
        this.subscriptions.push(this.uwSituatie$.subscribe(d => {
            this.uwSituatie = d;
        }));
        this.subscriptions.push(this.stappenVariant$.subscribe(d => {
            this.stappenVariant = d;
        }));
        this.subscriptions.push(this.activatedRoute.queryParams.subscribe(params => {
            this.params = params;
        }));

        this.verstuurOperation$ = this.store.pipe(select(selectVerstuurOperation));
        this.verstuurOperation$.subscribe(result => {
            if (result && result.succeeded === true) {
                this.router.navigate(['/bevestiging'] );
            }
        });


        this.verstuurErrors$ = this.store.pipe(select(selectVerstuurValidationError));
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

    ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    public setAdresgegevensFormState(form: AdresgegevensForm) {
        this.adresgegevensFormState = Object.keys(form.controls).map(c => [c, form.controls[c].status]);
    }

    public setUwGegevensFormState(form: UwGegevensForm) {
        this.uwGegevensFormState = Object.keys(this.uwGegevensFormComponent.form.controls).map(c => [c, this.uwGegevensFormComponent.form.controls[c].status]);
    }

    public kcc() {
        return this.configurationService.getValue('kccIdentity') !== 'False';
    }

    volgendeClicked() {
        this.submitted = true;
        this.uwGegevensFormComponent.validateForm();
        this.AdresgegevensComponent.validateForm();
        if (this.uwGegevensFormComponent.form.valid && this.AdresgegevensComponent.AdresgegevensFormComponent.form.valid) {
            // submit ACTION
            const uwGegevensModel: UwGegevensModel = this.uwGegevensFormComponent.form.getModel();
            uwGegevensModel.adres = this.AdresgegevensComponent.AdresgegevensFormComponent.form.getModel();
            this.store.dispatch(new SaveUwGegevens(uwGegevensModel));

            if (this.stappenVariant === StappenVariantEnum.ww) {
                this.store.dispatch(new FormulierActions.Verstuur(StappenVariantEnum.ww));
            } else {
                this.store.dispatch(new VolgendeStap());
            }
        }
    }
}
