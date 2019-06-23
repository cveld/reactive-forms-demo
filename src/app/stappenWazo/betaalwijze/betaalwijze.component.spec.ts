import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetaalwijzeComponent } from './betaalwijze.component';

describe('BetaalwijzeComponent', () => {
  let component: BetaalwijzeComponent;
  let fixture: ComponentFixture<BetaalwijzeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetaalwijzeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetaalwijzeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // TODO
  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
