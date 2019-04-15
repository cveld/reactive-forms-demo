import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdresgegevensComponent } from './adresgegevens.component';

describe('UwGegevensComponent', () => {
  let component: AdresgegevensComponent;
  let fixture: ComponentFixture<AdresgegevensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdresgegevensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdresgegevensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
