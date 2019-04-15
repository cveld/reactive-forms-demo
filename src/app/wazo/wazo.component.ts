import {
        Component, OnInit, ViewChild, ComponentFactoryResolver,
        OnDestroy, AfterContentInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Stap } from '../shared/models';
import { Observable, forkJoin, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IAppState, selectActieveStapIndex } from '../core/store/app-state.interface';
import { select, Store } from '@ngrx/store';
import { WizardStepHostDirective } from '../step-host/step-host';
import { Title } from '@angular/platform-browser';
import { SaveUwSituatie } from '../core/store/uw-situatie/uw-situatie.actions';
import { VolgendeStap } from '../core/store/actievestap/actievestap.actions';
import { WWSituatieEnum, WWofZelfstandigEnum, JaNeeEnum } from '../shared/enums';
import { selectStappen, selectActieveStap } from '../core/store/stappen.selector';

@Component({
    selector: 'app-wazo',
    templateUrl: './wazo.component.html',
    styleUrls: ['./wazo.component.css']
})
export class WazoComponent implements OnInit, OnDestroy, AfterViewInit {
    public stappen$: Observable<Array<Stap>>;
    public actieveStap$: Observable<{actieveStap: number, stappen: Array<Stap>}>;
    /** Template place holder to render the component in */
    @ViewChild(WizardStepHostDirective)
    public wizardStepHost: WizardStepHostDirective;
    public actieveStapIndex$: Observable<number>;
    private subscriptions: Array<Subscription> = new Array<Subscription>();

    constructor(
        private store: Store<IAppState>,
        private titleService: Title,
        private changeDetectorRef: ChangeDetectorRef,
        private componentFactoryResolver: ComponentFactoryResolver) { }

    ngOnInit() {
        this.stappen$ = this.store.pipe(select(selectStappen));
        this.actieveStapIndex$ = this.store.pipe(select(selectActieveStapIndex));
        this.actieveStap$ = this.store.pipe(select(selectActieveStap));
        this.titleService.setTitle('Zwangerschapsuitkering aanvragen');

        // submit ACTION
        // this.store.dispatch(new SaveUwSituatie({
        //     wwsituatie: WWSituatieEnum.aangevraagd,
        //     zelfstandige: JaNeeEnum.nee,
        //     wwofzelfstandig: WWofZelfstandigEnum.ww,
        //     meerling: JaNeeEnum.nee
        // }));
        // this.store.dispatch(new VolgendeStap());
    }

    ngAfterViewInit() {
        this.subscriptions.push(this.actieveStap$.subscribe((actieveStap) => {
            this.loadComponent(actieveStap.stappen[actieveStap.actieveStap]);
        }));
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((s => s.unsubscribe()));
    }



    private loadComponent(actieveStap: Stap) {
        if (this.wizardStepHost) {
            const componentFactory = this
            .componentFactoryResolver
            .resolveComponentFactory(actieveStap.componentType);

            const viewContainerRef = this.wizardStepHost.viewContainerRef;
            viewContainerRef.clear();
            const componentRef = viewContainerRef.createComponent(componentFactory);
            this.changeDetectorRef.detectChanges(); // Forces initial lifecycle (ngOnInit)

            let componentInstance = componentRef.instance;
            // componentInstance.isEditable = this.isEditable;
            // componentInstance.isCompleted = this.isCompleted;
        }
      }

}
