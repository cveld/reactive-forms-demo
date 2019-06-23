import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { createStoreMock } from 'edv-ngrx';
import { UwGegevensComponent } from './uw-gegevens.component';
import { AdresgegevensComponent } from './adresgegevens/adresgegevens.component';
import { IAppState } from 'src/app/core/store/app-state.interface';
import { BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';

describe('UwGegevensComponent', () => {
  let component: UwGegevensComponent;
  let fixture: ComponentFixture<UwGegevensComponent>;

  const states = new BehaviorSubject<IAppState>({} as IAppState);
  const storeMock = createStoreMock<IAppState>({ states });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ UwGegevensComponent ],
      providers: [
        { provide: Store, useValue: storeMock }
       ]
    }).overrideComponent(UwGegevensComponent, {
      remove: {templateUrl: './uw-gegevens.component.html'},
      add: {template: '<div></div>'}
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UwGegevensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // TODO
  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
