import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StappenComponent } from './stappen.component';
import { StappenService } from '../../shared/services/stappen.service';

describe('StappenComponent', () => {
  let comp: StappenComponent;
  let fixture: ComponentFixture<StappenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StappenComponent,
      ],
      providers: [
        StappenService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StappenComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('default', () => {
    it('should create', () => {
      expect(comp).toBeTruthy();
    });
  });
});
