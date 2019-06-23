import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StappenComponent } from './stappen.component';

describe('StappenComponent', () => {
  let comp: StappenComponent;
  let fixture: ComponentFixture<StappenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StappenComponent,
      ],
      providers: [
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
