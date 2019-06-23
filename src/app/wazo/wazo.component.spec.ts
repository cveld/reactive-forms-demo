import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WazoComponent } from './wazo.component';
import { BehaviorSubject } from 'rxjs';
import { IAppState } from '../core/store/app-state.interface';
import { createStoreMock } from 'edv-ngrx';
import { Store } from '@ngrx/store';

describe('WazoComponent', () => {
  let component: WazoComponent;
  let fixture: ComponentFixture<WazoComponent>;

  const states = new BehaviorSubject<IAppState>({} as IAppState);
  const storeMock = createStoreMock<IAppState>({ states });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WazoComponent ],
      providers: [
        { provide: Store, useValue: storeMock }
      ]
    }).overrideComponent(WazoComponent, {
      remove: {templateUrl: './wazo.component.html'},
      add: {template: '<div></div>'}
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
