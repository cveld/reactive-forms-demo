import { IWizardStepComponent } from '.';
import { Type } from '@angular/core';

/* tslint:disable */
//import { Groep } from './groep';
export interface Stap {
  cmSIDStap?: string;
//  groepen?: Array<Groep>;
  indActieveStap?: boolean;
  naamStap?: string;
  volgnrStap?: number;
  componentType: Type<IWizardStepComponent>;
}
