import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

export class AdresgegevensForm extends FormGroup {
  /** references to the changes of the hasEducation control */
  public hasEducationChanges: Observable<boolean> = this.controls.hasEducation.valueChanges;

  constructor(hasEducation?: boolean) {
    super({
      hasEducation: new FormControl(hasEducation ? hasEducation : false, Validators.required)
    });
  }

  /** (Re-)initializes the form */
  public setNoEducation(): void {
    this.reset({
      hasEducation: false
    });
  }

  /** Gets the model of this form */
  public getModel(): boolean {
    return this.value.hasEducation;
  }
}
