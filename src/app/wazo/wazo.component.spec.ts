import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WazoComponent } from './wazo.component';

describe('WazoComponent', () => {
  let component: WazoComponent;
  let fixture: ComponentFixture<WazoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WazoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WazoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
