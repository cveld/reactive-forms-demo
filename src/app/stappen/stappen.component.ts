import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { Stap } from '../shared/models';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'stappen',
  templateUrl: './stappen.component.html',
  styleUrls: ['./stappen.component.scss']
})
export class StappenComponent implements OnInit, OnChanges {
  @Input() stappen: Stap[];
  @Input() actieveStap: number;

  constructor() {
    // Subscribe op changestap van de stappen service om de actieve stap te updaten.
  }

  ngOnInit(): void {
    console.log(this.stappen);
    console.log(this.actieveStap);
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  changeStap(stap: Stap) {
  }

}
