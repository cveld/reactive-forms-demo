import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule as ngFormsModule } from '@angular/forms';
import { DisablePasteComponent } from './components/disable-paste/disable-paste.component';
import { FormControlFieldsetComponent } from './components/form-control-fieldset/form-control-fieldset.component';
import { FormControlGroupComponent } from './components/form-control-group/form-control-group.component';
import { ServerErrorsComponent } from './components/server-errors/server-errors.component';
import { SubmitButtonComponent } from './components/submit-button/submit-button.component';
import { StepIndicatorComponent } from './components/step-indicator/step-indicator.component';
import { ValidationMessageComponent } from './components/validation-message/validation-message.component';
import { ValidationMessageForComponent } from './components/validation-message-for/validation-message-for.component';
import { ValidationMessageForFormComponent } from './components/validation-message-for-form/validation-message-for-form.component';
import { CharacterCounterComponent } from './components/character-counter/character-counter.component';
import { ValidationMessageService } from './shared/validation-message.service';

@NgModule({
    imports: [BrowserModule, ngFormsModule],
    declarations: [
        DisablePasteComponent,
        FormControlFieldsetComponent,
        FormControlGroupComponent,
        ServerErrorsComponent,
        SubmitButtonComponent,
        StepIndicatorComponent,
        ValidationMessageComponent,
        ValidationMessageForComponent,
        ValidationMessageForFormComponent,
        CharacterCounterComponent
    ],
    exports: [
        DisablePasteComponent,
        FormControlFieldsetComponent,
        FormControlGroupComponent,
        ServerErrorsComponent,
        SubmitButtonComponent,
        StepIndicatorComponent,
        ValidationMessageComponent,
        ValidationMessageForComponent,
        ValidationMessageForFormComponent,
        CharacterCounterComponent
    ],
  providers: [
    ValidationMessageService
    ]
})
export class FormsModule2 { }
