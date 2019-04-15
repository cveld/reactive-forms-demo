import { Component, OnInit } from '@angular/core';
import { IWizardStepComponent } from '../../shared/models';

@Component({
  selector: 'app-werk-en-inkomen',
  templateUrl: './werk-en-inkomen.component.html',
  styleUrls: ['./werk-en-inkomen.component.css']
})
export class WerkEnInkomenComponent implements OnInit, IWizardStepComponent {
  isEditable: boolean;
  isCompleted: boolean;
  complete(): void {
    throw new Error('Method not implemented.');
  }

  constructor() { }

  ngOnInit() {
  }

}
