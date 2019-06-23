import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WerkEnInkomenFormComponent } from './werk-en-inkomen-form.component';
import { SituatieInkomstenEnum, JaNeeEnum, HeelKalenderjaarZEZEnum } from 'src/app/shared';

describe('WerkEnInkomenFormComponent', () => {
  let component: WerkEnInkomenFormComponent;
  let fixture: ComponentFixture<WerkEnInkomenFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
        declarations: [ WerkEnInkomenFormComponent ]
      }).overrideComponent(WerkEnInkomenFormComponent, {
          remove: {templateUrl: './werk-en-inkomen-form.component.html'},
          add: {template: '<div></div>'}
        })
      .compileComponents();

    fixture = TestBed.createComponent(WerkEnInkomenFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('showKVKNummer', () => {
    it('should return false', () => {
        expect(component.showKVKNummer()).toBe(false);
    });

    it('should return true when situatieInkomsten is EigenOnderneming', () => {
        component.form.controls.situatieInkomsten.setValue(SituatieInkomstenEnum.EigenOnderneming);
        expect(component.showKVKNummer()).toBe(true);
    });
  });

  describe('showIndicatieUrencriteriumZEZ', () => {
    it('should return false', () => {
        expect(component.showIndicatieUrencriteriumZEZ()).toBe(false);
    });

    it('should return true when situatieInkomsten is EigenOnderneming', () => {
        component.form.controls.situatieInkomsten.setValue(SituatieInkomstenEnum.EigenOnderneming);
        expect(component.showIndicatieUrencriteriumZEZ()).toBe(true);
    });

    it('should return true when situatieInkomsten is BedrijfEchtgenootPartner', () => {
        component.form.controls.situatieInkomsten.setValue(SituatieInkomstenEnum.BedrijfEchtgenootPartner);
        expect(component.showIndicatieUrencriteriumZEZ()).toBe(true);
    });

    it('should return true when situatieInkomsten is AlfaParticuliereHulp', () => {
        component.form.controls.situatieInkomsten.setValue(SituatieInkomstenEnum.AlfaParticuliereHulp);
        expect(component.showIndicatieUrencriteriumZEZ()).toBe(true);
    });
  });

  describe('showDatumStartWerk', () => {
    it('should return false', () => {
        expect(component.showDatumStartWerk()).toBe(false);
    });

    it('should return true when situatieInkomsten is AlfaParticuliereHulp && indicatieUrencriteriumZEZ is Nee', () => {
        component.form.controls.situatieInkomsten.setValue(SituatieInkomstenEnum.AlfaParticuliereHulp);
        component.form.controls.indicatieUrencriteriumZEZ.setValue(JaNeeEnum.nee);
        expect(component.showDatumStartWerk()).toBe(true);
    });

    it('should return true when situatieInkomsten is EigenOnderneming && indicatieUrencriteriumZEZ is Nee', () => {
        component.form.controls.situatieInkomsten.setValue(SituatieInkomstenEnum.EigenOnderneming);
        component.form.controls.indicatieUrencriteriumZEZ.setValue(JaNeeEnum.nee);
        expect(component.showDatumStartWerk()).toBe(true);
    });

    it('should return true when situatieInkomsten is BedrijfEchtgenootPartner && indicatieUrencriteriumZEZ is Nee', () => {
        component.form.controls.situatieInkomsten.setValue(SituatieInkomstenEnum.BedrijfEchtgenootPartner);
        component.form.controls.indicatieUrencriteriumZEZ.setValue(JaNeeEnum.nee);
        expect(component.showDatumStartWerk()).toBe(true);
    });
  });

  describe('showHeelKalenderjaarZEZ', () => {
    it('should return false', () => {
        expect(component.showHeelKalenderjaarZEZ()).toBe(false);
    });

    it('should return true when situatieInkomsten is AlfaParticuliereHulp && indicatieUrencriteriumZEZ is Nee', () => {
        component.form.controls.situatieInkomsten.setValue(SituatieInkomstenEnum.AlfaParticuliereHulp);
        component.form.controls.indicatieUrencriteriumZEZ.setValue(JaNeeEnum.nee);
        expect(component.showHeelKalenderjaarZEZ()).toBe(true);
    });

    it('should return true when situatieInkomsten is EigenOnderneming && indicatieUrencriteriumZEZ is Nee', () => {
        component.form.controls.situatieInkomsten.setValue(SituatieInkomstenEnum.EigenOnderneming);
        component.form.controls.indicatieUrencriteriumZEZ.setValue(JaNeeEnum.nee);
        expect(component.showHeelKalenderjaarZEZ()).toBe(true);
    });

    it('should return true when situatieInkomsten is BedrijfEchtgenootPartner && indicatieUrencriteriumZEZ is Nee', () => {
        component.form.controls.situatieInkomsten.setValue(SituatieInkomstenEnum.BedrijfEchtgenootPartner);
        component.form.controls.indicatieUrencriteriumZEZ.setValue(JaNeeEnum.nee);
        expect(component.showHeelKalenderjaarZEZ()).toBe(true);
    });
  });

  describe('showToelichtingHeelKalenderjaarZEZ', () => {
    it('should return false', () => {
        expect(component.showToelichtingHeelKalenderjaarZEZ()).toBe(false);
    });

    it('should return true when situatieInkomsten is AlfaParticuliereHulp && indicatieUrencriteriumZEZ is Nee && heelKalenderjaarZEZ is NeeToelichting', () => {
        component.form.controls.situatieInkomsten.setValue(SituatieInkomstenEnum.AlfaParticuliereHulp);
        component.form.controls.indicatieUrencriteriumZEZ.setValue(JaNeeEnum.nee);
        component.form.controls.heelKalenderjaarZEZ.setValue(HeelKalenderjaarZEZEnum.NeeToelichting);
        expect(component.showToelichtingHeelKalenderjaarZEZ()).toBe(true);
    });

    it('should return true when situatieInkomsten is EigenOnderneming && indicatieUrencriteriumZEZ is Nee && heelKalenderjaarZEZ is NeeToelichting', () => {
        component.form.controls.situatieInkomsten.setValue(SituatieInkomstenEnum.EigenOnderneming);
        component.form.controls.indicatieUrencriteriumZEZ.setValue(JaNeeEnum.nee);
        component.form.controls.heelKalenderjaarZEZ.setValue(HeelKalenderjaarZEZEnum.NeeToelichting);
        expect(component.showToelichtingHeelKalenderjaarZEZ()).toBe(true);
    });

    it('should return true when situatieInkomsten is BedrijfEchtgenootPartner && indicatieUrencriteriumZEZ is Nee && heelKalenderjaarZEZ is NeeToelichting', () => {
        component.form.controls.situatieInkomsten.setValue(SituatieInkomstenEnum.BedrijfEchtgenootPartner);
        component.form.controls.indicatieUrencriteriumZEZ.setValue(JaNeeEnum.nee);
        component.form.controls.heelKalenderjaarZEZ.setValue(HeelKalenderjaarZEZEnum.NeeToelichting);
        expect(component.showToelichtingHeelKalenderjaarZEZ()).toBe(true);
    });
  });

  describe('showIndicatieAangifteIB1', () => {
    it('should return false', () => {
        expect(component.showIndicatieAangifteIB1()).toBe(false);
    });

    it('should return true when situatieInkomsten is AlfaParticuliereHulp && indicatieUrencriteriumZEZ is Nee', () => {
        component.form.controls.situatieInkomsten.setValue(SituatieInkomstenEnum.AlfaParticuliereHulp);
        component.form.controls.indicatieUrencriteriumZEZ.setValue(JaNeeEnum.nee);
        expect(component.showIndicatieAangifteIB1()).toBe(true);
    });

    it('should return true when situatieInkomsten is EigenOnderneming && indicatieUrencriteriumZEZ is Nee', () => {
        component.form.controls.situatieInkomsten.setValue(SituatieInkomstenEnum.EigenOnderneming);
        component.form.controls.indicatieUrencriteriumZEZ.setValue(JaNeeEnum.nee);
        expect(component.showIndicatieAangifteIB1()).toBe(true);
    });

    it('should return true when situatieInkomsten is BedrijfEchtgenootPartner && indicatieUrencriteriumZEZ is Nee', () => {
        component.form.controls.situatieInkomsten.setValue(SituatieInkomstenEnum.BedrijfEchtgenootPartner);
        component.form.controls.indicatieUrencriteriumZEZ.setValue(JaNeeEnum.nee);
        expect(component.showIndicatieAangifteIB1()).toBe(true);
    });
  });

  describe('showBedragInkomstenIB1', () => {
    it('should return false', () => {
        expect(component.showBedragInkomstenIB1()).toBe(false);
    });

    it('should return true when situatieInkomsten is AlfaParticuliereHulp && indicatieUrencriteriumZEZ is Nee && indicatieAangifteIB1 is ja', () => {
        component.form.controls.situatieInkomsten.setValue(SituatieInkomstenEnum.AlfaParticuliereHulp);
        component.form.controls.indicatieUrencriteriumZEZ.setValue(JaNeeEnum.nee);
        component.form.controls.indicatieAangifteIB1.setValue(JaNeeEnum.ja);
        expect(component.showBedragInkomstenIB1()).toBe(true);
    });

    it('should return true when situatieInkomsten is EigenOnderneming && indicatieUrencriteriumZEZ is Nee && indicatieAangifteIB1 is ja', () => {
        component.form.controls.situatieInkomsten.setValue(SituatieInkomstenEnum.EigenOnderneming);
        component.form.controls.indicatieUrencriteriumZEZ.setValue(JaNeeEnum.nee);
        component.form.controls.indicatieAangifteIB1.setValue(JaNeeEnum.ja);
        expect(component.showBedragInkomstenIB1()).toBe(true);
    });

    it('should return true when situatieInkomsten is BedrijfEchtgenootPartner && indicatieUrencriteriumZEZ is Nee && indicatieAangifteIB1 is ja', () => {
        component.form.controls.situatieInkomsten.setValue(SituatieInkomstenEnum.BedrijfEchtgenootPartner);
        component.form.controls.indicatieUrencriteriumZEZ.setValue(JaNeeEnum.nee);
        component.form.controls.indicatieAangifteIB1.setValue(JaNeeEnum.ja);
        expect(component.showBedragInkomstenIB1()).toBe(true);
    });
  });

  describe('showIndicatieAangifteIB2', () => {
    it('should return false', () => {
        expect(component.showIndicatieAangifteIB2()).toBe(false);
    });

    it('should return true when situatieInkomsten is AlfaParticuliereHulp && indicatieUrencriteriumZEZ is Nee && indicatieAangifteIB1 is nee', () => {
        component.form.controls.situatieInkomsten.setValue(SituatieInkomstenEnum.AlfaParticuliereHulp);
        component.form.controls.indicatieUrencriteriumZEZ.setValue(JaNeeEnum.nee);
        component.form.controls.indicatieAangifteIB1.setValue(JaNeeEnum.nee);
        expect(component.showIndicatieAangifteIB2()).toBe(true);
    });

    it('should return true when situatieInkomsten is EigenOnderneming && indicatieUrencriteriumZEZ is Nee && indicatieAangifteIB1 is nee', () => {
        component.form.controls.situatieInkomsten.setValue(SituatieInkomstenEnum.EigenOnderneming);
        component.form.controls.indicatieUrencriteriumZEZ.setValue(JaNeeEnum.nee);
        component.form.controls.indicatieAangifteIB1.setValue(JaNeeEnum.nee);
        expect(component.showIndicatieAangifteIB2()).toBe(true);
    });

    it('should return true when situatieInkomsten is BedrijfEchtgenootPartner && indicatieUrencriteriumZEZ is Nee && indicatieAangifteIB1 is nee', () => {
        component.form.controls.situatieInkomsten.setValue(SituatieInkomstenEnum.BedrijfEchtgenootPartner);
        component.form.controls.indicatieUrencriteriumZEZ.setValue(JaNeeEnum.nee);
        component.form.controls.indicatieAangifteIB1.setValue(JaNeeEnum.nee);
        expect(component.showIndicatieAangifteIB2()).toBe(true);
    });
  });

  describe('showBedragInkomstenIB2', () => {
    it('should return false', () => {
        expect(component.showBedragInkomstenIB2()).toBe(false);
    });

    it('should return true when situatieInkomsten is AlfaParticuliereHulp && indicatieUrencriteriumZEZ is Nee && indicatieAangifteIB1 is Nee && indicatieAangifteIB2 is ja', () => {
        component.form.controls.situatieInkomsten.setValue(SituatieInkomstenEnum.AlfaParticuliereHulp);
        component.form.controls.indicatieUrencriteriumZEZ.setValue(JaNeeEnum.nee);
        component.form.controls.indicatieAangifteIB1.setValue(JaNeeEnum.nee);
        component.form.controls.indicatieAangifteIB2.setValue(JaNeeEnum.ja);
        expect(component.showBedragInkomstenIB2()).toBe(true);
    });

    it('should return true when situatieInkomsten is EigenOnderneming && indicatieUrencriteriumZEZ is Nee && indicatieAangifteIB1 is Nee  && indicatieAangifteIB2 is ja', () => {
        component.form.controls.situatieInkomsten.setValue(SituatieInkomstenEnum.EigenOnderneming);
        component.form.controls.indicatieUrencriteriumZEZ.setValue(JaNeeEnum.nee);
        component.form.controls.indicatieAangifteIB1.setValue(JaNeeEnum.nee);
        component.form.controls.indicatieAangifteIB2.setValue(JaNeeEnum.ja);
        expect(component.showBedragInkomstenIB2()).toBe(true);
    });

    it('should return true when situatieInkomsten is BedrijfEchtgenootPartner && indicatieUrencriteriumZEZ is Nee && indicatieAangifteIB1 is Nee  && indicatieAangifteIB2 is ja', () => {
        component.form.controls.situatieInkomsten.setValue(SituatieInkomstenEnum.BedrijfEchtgenootPartner);
        component.form.controls.indicatieUrencriteriumZEZ.setValue(JaNeeEnum.nee);
        component.form.controls.indicatieAangifteIB1.setValue(JaNeeEnum.nee);
        component.form.controls.indicatieAangifteIB2.setValue(JaNeeEnum.ja);
        expect(component.showBedragInkomstenIB2()).toBe(true);
    });
  });

  describe('showSchattingInkomsten', () => {
    it('should return false', () => {
        expect(component.showSchattingInkomsten()).toBe(false);
    });

    it('should return true when situatieInkomsten is AlfaParticuliereHulp && indicatieUrencriteriumZEZ is Nee && indicatieAangifteIB1 is Nee && indicatieAangifteIB2 is nee', () => {
        component.form.controls.situatieInkomsten.setValue(SituatieInkomstenEnum.AlfaParticuliereHulp);
        component.form.controls.indicatieUrencriteriumZEZ.setValue(JaNeeEnum.nee);
        component.form.controls.indicatieAangifteIB1.setValue(JaNeeEnum.nee);
        component.form.controls.indicatieAangifteIB2.setValue(JaNeeEnum.nee);
        expect(component.showSchattingInkomsten()).toBe(true);
    });

    it('should return true when situatieInkomsten is EigenOnderneming && indicatieUrencriteriumZEZ is Nee && indicatieAangifteIB1 is Nee && indicatieAangifteIB2 is nee', () => {
        component.form.controls.situatieInkomsten.setValue(SituatieInkomstenEnum.EigenOnderneming);
        component.form.controls.indicatieUrencriteriumZEZ.setValue(JaNeeEnum.nee);
        component.form.controls.indicatieAangifteIB1.setValue(JaNeeEnum.nee);
        component.form.controls.indicatieAangifteIB2.setValue(JaNeeEnum.nee);
        expect(component.showSchattingInkomsten()).toBe(true);
    });

    it('should return true when situatieInkomsten is BedrijfEchtgenootPartner && indicatieUrencriteriumZEZ is Nee && indicatieAangifteIB1 is Nee && indicatieAangifteIB2 is nee', () => {
        component.form.controls.situatieInkomsten.setValue(SituatieInkomstenEnum.BedrijfEchtgenootPartner);
        component.form.controls.indicatieUrencriteriumZEZ.setValue(JaNeeEnum.nee);
        component.form.controls.indicatieAangifteIB1.setValue(JaNeeEnum.nee);
        component.form.controls.indicatieAangifteIB2.setValue(JaNeeEnum.nee);
        expect(component.showSchattingInkomsten()).toBe(true);
    });
  });
});
