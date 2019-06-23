import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UwSituatieComponent } from './uw-situatie.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { IAppState } from 'src/app/core/store/app-state.interface';
import { createStoreMock } from 'edv-ngrx';
import { Store } from '@ngrx/store';

describe('UwSituatieComponent', () => {
  let component: UwSituatieComponent;
  let fixture: ComponentFixture<UwSituatieComponent>;

  const states = new BehaviorSubject<IAppState>({} as IAppState);
  const storeMock = createStoreMock<IAppState>({ states });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      providers: [
        { provide: Store, useValue: storeMock }
      ],
      declarations: [ UwSituatieComponent ]
    }).overrideComponent(UwSituatieComponent, {
      remove: {templateUrl: './uw-situatie.component.html'},
      add: {template: '<div></div>'}
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UwSituatieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // TODO
  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
