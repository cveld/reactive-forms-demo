import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { IWizardStepComponent } from '../../shared/models';
import { Observable, Subscription } from 'rxjs';
import { IServerOperation } from 'edv-ngrx-server-operation';
import { HttpErrorResponse } from '@angular/common/http';
import { selectVerstuurOperation, selectVerstuurValidationError } from 'src/app/core/store/formulier/formulier.interface';
import { select, Store } from '@ngrx/store';
import { IAppState } from 'src/app/core/store/app-state.interface';
import { Router } from '@angular/router';
import { BetaalwijzeFormComponent } from './betaalwijze-form.component';
import { BetaalwijzeModel } from 'src/app/shared/models/betaalwijze-model';
import { SaveBetaalwijze } from 'src/app/core/store/betaalwijze/betaalwijze.actions';
import { VerstuurFormulierModel } from 'src/app/shared/models/verstuur-formulier.model';
import { FormulierActions } from 'src/app/core/store/formulier/formulier.actions';
import { StappenVariantEnum } from 'src/app/shared/enums';
import { ConfigurationService } from 'edv-configuration';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'betaalwijze',
  templateUrl: './betaalwijze.component.html'
})
export class BetaalwijzeComponent implements OnInit, OnDestroy, IWizardStepComponent {
    private subscriptions: Array<Subscription> = new Array<Subscription>();
    submitted = false;
    validating = false;
    isEditable: boolean;
    isCompleted: boolean;
    public verstuurOperation$: Observable<IServerOperation | undefined>;
    public verstuurErrors$: Observable<HttpErrorResponse | undefined>;

    public readonly labelGroupId = 'stap4';

    @ViewChild(BetaalwijzeFormComponent)
    betaalwijzeFormComponent: BetaalwijzeFormComponent;

    complete(): void {
        throw new Error('Method not implemented.');
    }

    constructor(
        private readonly store: Store<IAppState>,
        private router: Router,
        private readonly configurationService: ConfigurationService
    ) { }

    ngOnInit() {
        this.verstuurOperation$ = this.store.pipe(select(selectVerstuurOperation));
        this.verstuurOperation$.subscribe(result => {
        if (result && result.succeeded === true) {
                    this.router.navigate(['/bevestiging'] );
            }
        });

        this.verstuurErrors$ = this.store.pipe(select(selectVerstuurValidationError));
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    public kcc() {
        return this.configurationService.getValue('kccIdentity') !== 'False';
    }

    volgendeClicked() {
        this.submitted = true;
        this.betaalwijzeFormComponent.validateForm();
        if (this.betaalwijzeFormComponent.form.valid && this.betaalwijzeFormComponent.form.valid) {
            // submit ACTION
            this.store.dispatch(new SaveBetaalwijze(this.betaalwijzeFormComponent.form.getModel()));

            // Zet xhr call de lijn op naar de webapi om het formulier te versturen.
            this.store.dispatch(new FormulierActions.Verstuur(StappenVariantEnum.zelfstandige));
            //  this.store.dispatch(new ChangeStap(0));
            //   this.router.navigate(['/bevestiging'] );
        }
    }
}
