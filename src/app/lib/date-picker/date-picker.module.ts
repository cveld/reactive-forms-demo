import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { DatePicker } from './component/date-picker.component';
import { FocusDirective } from './directives/date-picker.focus.directive';
import { LocaleService } from './services/date-picker.locale.service';
import { UtilService } from './services/date-picker.util.service';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [DatePicker, FocusDirective],
  exports: [DatePicker, FocusDirective],
  providers: [LocaleService, UtilService]
})
export class DatePickerModule {
}
