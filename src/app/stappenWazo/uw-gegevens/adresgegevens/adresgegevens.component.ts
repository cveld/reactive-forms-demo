import { Component, OnInit } from '@angular/core';
import { IWizardStepComponent } from 'src/app/shared/models';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'adresgegevens',
  templateUrl: './adresgegevens.component.html'
})
export class AdresgegevensComponent implements OnInit {
  isEditable: boolean;
  isCompleted: boolean;
  complete(): void {
    throw new Error('Method not implemented.');
  }

  constructor() { }

  ngOnInit() {
  }

}
