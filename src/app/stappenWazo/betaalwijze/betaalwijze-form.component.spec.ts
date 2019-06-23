import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SituatieInkomstenEnum, JaNeeEnum, HeelKalenderjaarZEZEnum, SoortRekeningnummerEnum } from 'src/app/shared';
import { BetaalwijzeFormComponent } from './betaalwijze-form.component';

describe('BetaalwijzeFormComponent', () => {
  let component: BetaalwijzeFormComponent;
  let fixture: ComponentFixture<BetaalwijzeFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
        declarations: [ BetaalwijzeFormComponent ]
      }).overrideComponent(BetaalwijzeFormComponent, {
          remove: {templateUrl: './werk-en-inkomen-form.component.html'},
          add: {template: '<div></div>'}
        })
      .compileComponents();

    fixture = TestBed.createComponent(BetaalwijzeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('isVrijwillig', () => {
    it('should return false', () => {
        expect(component.isVrijwillig()).toBe(false);
    });

    it('should return true when indicatieVrijwilligeZW is ja', () => {
        component.form.controls.indicatieVrijwilligeZW.setValue(JaNeeEnum.ja);
        expect(component.isVrijwillig()).toBe(true);
    });
  });

  describe('isNederland', () => {
    it('should return false', () => {
        expect(component.isNederland()).toBe(false);
    });

    it('should return true when soortRekeningnummer is Nederland', () => {
        component.form.controls.soortRekeningnummer.setValue(SoortRekeningnummerEnum.Nederland);
        expect(component.isNederland()).toBe(true);
    });
  });

  describe('isBuitenland', () => {
    it('should return false', () => {
        expect(component.isBuitenland()).toBe(false);
    });

    it('should return true when soortRekeningnummer is Buitenland', () => {
        component.form.controls.soortRekeningnummer.setValue(SoortRekeningnummerEnum.Buitenland);
        expect(component.isBuitenland()).toBe(true);
    });
  });

  describe('isUitzendbureau', () => {
    it('should return false', () => {
        expect(component.isUitzendbureau()).toBe(false);
    });

    it('should return true when soortRekeningnummer is Uitzendbureau', () => {
        component.form.controls.soortRekeningnummer.setValue(SoortRekeningnummerEnum.Uitzendbureau);
        expect(component.isUitzendbureau()).toBe(true);
    });
  });
});
