import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UwGegevensComponent } from './uw-gegevens.component';

describe('UwGegevensComponent', () => {
  let component: UwGegevensComponent;
  let fixture: ComponentFixture<UwGegevensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UwGegevensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UwGegevensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
