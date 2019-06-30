import { Component, OnInit, ViewChild } from '@angular/core';
import { AdresgegevensFormComponent } from './adresgegevens-form.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'adresgegevens',
  templateUrl: './adresgegevens.component.html'
})
export class AdresgegevensComponent implements OnInit {
  isEditable: boolean;
  isCompleted: boolean;
  @ViewChild(AdresgegevensFormComponent)
  AdresgegevensFormComponent: AdresgegevensFormComponent;

  complete(): void {
    throw new Error('Method not implemented.');
  }


  constructor() { }

  ngOnInit() {
  }

}
