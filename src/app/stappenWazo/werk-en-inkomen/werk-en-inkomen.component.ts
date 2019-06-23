import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { IWizardStepComponent } from 'src/app/shared/models';
import { Subscription, Observable } from 'rxjs';
import { JaNeeEnum } from '../../shared/enums';
import { WerkEnInkomenFormComponent } from './werk-en-inkomen-form.component';
import { Store, select } from '@ngrx/store';
import { IAppState, selectUwGegevens, selectUitkeringsjaar } from 'src/app/core/store/app-state.interface';
import { VolgendeStap } from 'src/app/core/store/actievestap/actievestap.actions';
import { SaveWerkEnInkomen } from 'src/app/core/store/werk-en-inkomen/werk-en-inkomen.actions';
import { UwGegevensModel } from 'src/app/shared/models/uw-gegevens-model';

@Component({
  selector: 'app-werk-en-inkomen',
  templateUrl: './werk-en-inkomen.component.html'
})
export class WerkEnInkomenComponent implements OnInit, OnDestroy, IWizardStepComponent {
    isEditable: boolean;
    isCompleted: boolean;
    subscriptions: Array<Subscription> = new Array<Subscription>();
    submitted = false;
    uwGegevens$: Observable<UwGegevensModel>;
    uitkeringsjaar$: Observable<number>;

    public readonly labelGroupId = 'stap3';

    @ViewChild(WerkEnInkomenFormComponent)
    WerkEnInkomenFormComponent: WerkEnInkomenFormComponent;

    // Enum definition pass-throughs voor de view template:
    JaNeeEnum = JaNeeEnum;

    complete(): void {
        throw new Error('Method not implemented.');
    }

    constructor(
        private readonly store: Store<IAppState>
    ) { }

    ngOnInit() {
        this.uwGegevens$ = this.store.pipe(select(selectUwGegevens));
        this.uitkeringsjaar$ = this.store.pipe(select(selectUitkeringsjaar));
        // this.subscriptions.push(this.uwGegevens$.subscribe(d => {
        //     this.uwGegevens = d;
        // }));
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    volgendeClicked() {
        this.submitted = true;
        this.WerkEnInkomenFormComponent.validateForm();

        if (this.WerkEnInkomenFormComponent.form.valid) {
            // submit ACTION
            this.store.dispatch(new SaveWerkEnInkomen(this.WerkEnInkomenFormComponent.form.getModel()));
            this.store.dispatch(new VolgendeStap());
        }
    }
}
