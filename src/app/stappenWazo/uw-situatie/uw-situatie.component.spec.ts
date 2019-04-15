import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UwSituatieComponent } from './uw-situatie.component';

describe('UwSituatieComponent', () => {
  let component: UwSituatieComponent;
  let fixture: ComponentFixture<UwSituatieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UwSituatieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UwSituatieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
