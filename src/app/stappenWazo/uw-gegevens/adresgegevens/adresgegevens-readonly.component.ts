import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { AdresModel } from '../../../shared/models/adres-model';
import { AdresgegevensForm } from './adresgegevens.form';

/**
 * Adresgegevens readonly component.
 */
@Component({
    selector: 'adresgegevens-readonly',
    templateUrl: 'adresgegevens-readonly.component.html'
})
export class AdresgegevensReadonlyComponent implements OnInit {
    isCompleted: boolean;

    @Input()
    public adres: AdresModel;

   

    ngOnInit() {
        
    }

    //public ngOnChanges(changes: SimpleChanges): void {
    //    console.log(changes);
    //}
}
