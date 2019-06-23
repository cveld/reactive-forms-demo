import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdresgegevensComponent } from './adresgegevens.component';

describe('AdresgegevensComponent', () => {
  let component: AdresgegevensComponent;
  let fixture: ComponentFixture<AdresgegevensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdresgegevensComponent ]
    }).overrideComponent(AdresgegevensComponent, {
      remove: {templateUrl: './adresgegevens.component.html'},
      add: {template: '<div></div>'}
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdresgegevensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // TODO
  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
