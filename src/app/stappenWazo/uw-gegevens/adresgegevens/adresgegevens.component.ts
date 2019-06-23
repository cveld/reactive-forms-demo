import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { IWizardStepComponent } from 'src/app/shared/models';
import { AdresgegevensService } from '../../../shared/services/adresgegevens.service';
import { AdresModel } from '../../../shared/models/adres-model';
import { Observable, Subscription } from 'rxjs';
import { AdresgegevensFormComponent } from './adresgegevens-form.component';
import { AdresgegevensForm } from './adresgegevens.form';
import { JaNeeEnum } from '../../../shared/enums';
import { distinctUntilChanged } from 'rxjs/operators';
import { ResultaatType } from 'src/app/shared/models/ResultaatType';
import { UwGegevensModel } from 'src/app/shared/models/uw-gegevens-model';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'adresgegevens',
    templateUrl: './adresgegevens.component.html'
})
export class AdresgegevensComponent implements OnInit, OnDestroy {
    adresgegevens: AdresModel;
    // validating = false;
    @Input()
    data: AdresModel;


    @ViewChild(AdresgegevensFormComponent)
    AdresgegevensFormComponent: AdresgegevensFormComponent;


    public submitted = false;

    private subscriptions: Array<Subscription> = new Array<Subscription>();

    complete(): void {
        throw new Error('Method not implemented.');
    }

    constructor(
        private adresgegevensService: AdresgegevensService,
    ) { }

    ngOnInit() {
        this.adresgegevensService.getAdresgegevens().subscribe(
            data => {
                setTimeout(() => {
                this.adresgegevens = data;
                this.AdresgegevensFormComponent.form.setResultaat(data.resultaat);
                }, 0);
            },
            error => {
                setTimeout(() => {
                this.adresgegevens = null;
                this.AdresgegevensFormComponent.form.setResultaat(ResultaatType.Fout);
                }, 0);
            }
        );

    }



    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    public validateForm() {
        this.submitted = true;
        this.AdresgegevensFormComponent.validateForm();
    }

}
