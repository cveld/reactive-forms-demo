import { Component, OnInit, Input } from '@angular/core';
import { IWizardStepComponent } from '../../../shared/models';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'adresgegevens-form',
  templateUrl: './adresgegevens-form.component.html'
})
export class AdresgegevensFormComponent implements OnInit {
  @Input()
  public forceValidation = false;
  isEditable: boolean;
  isCompleted: boolean;
  complete(): void {
    throw new Error('Method not implemented.');
  }

  constructor() { }

  ngOnInit() {
  }

}
