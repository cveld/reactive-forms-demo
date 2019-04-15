import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WerkEnInkomenComponent } from './werk-en-inkomen.component';

describe('WerkEnInkomenComponent', () => {
  let component: WerkEnInkomenComponent;
  let fixture: ComponentFixture<WerkEnInkomenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WerkEnInkomenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WerkEnInkomenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
