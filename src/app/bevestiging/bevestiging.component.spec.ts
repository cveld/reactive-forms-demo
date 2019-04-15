import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BevestigingComponent } from './bevestiging.component';

describe('BevestigingComponent', () => {
  let component: BevestigingComponent;
  let fixture: ComponentFixture<BevestigingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BevestigingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BevestigingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
