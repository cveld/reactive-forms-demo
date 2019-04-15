import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import localenl from '@angular/common/locales/nl';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WazoComponent } from './wazo/wazo.component';
import { StappenComponent } from './stappen/stappen.component';
import { UwGegevensComponent } from './stappenWazo/uw-gegevens/uw-gegevens.component';
import { StoreModule } from '@ngrx/store';
import { AppStateReducerToken, AppStateReducerProvider } from './core/store/app-state.reducer';
import { WizardStepHostDirective } from './step-host/step-host';
import { UwSituatieComponent } from './stappenWazo/uw-situatie/uw-situatie.component';
// import { FormsModule as UwvFormsModule } from 'uwv-edv-general/src/lib/forms/forms.module';
// import { FormsModule as UwvFormsModule } from 'uwv-edv-general';
import { FormsModule2 as UwvFormsModule } from './lib/forms/forms.module';
import { UwGegevensFormComponent } from './stappenWazo/uw-gegevens/uw-gegevens-form.component';
import { AdresgegevensComponent } from './stappenWazo/uw-gegevens/adresgegevens/adresgegevens.component';
import { AdresgegevensFormComponent } from './stappenWazo/uw-gegevens/adresgegevens/adresgegevens-form.component';
import { DatePickerModule } from './lib/date-picker/date-picker.module';
import { BevestigingComponent } from './bevestiging/bevestiging.component';
import { registerLocaleData } from '@angular/common';
import { WerkEnInkomenComponent } from './stappenWazo/werk-en-inkomen/werk-en-inkomen.component';

@NgModule({
  declarations: [
    AdresgegevensComponent,
    AdresgegevensFormComponent,
    AppComponent,
    WazoComponent,
    StappenComponent,
    UwSituatieComponent,
    UwGegevensComponent,
    UwGegevensFormComponent,
    WizardStepHostDirective,
    BevestigingComponent,
    WerkEnInkomenComponent
  ],
  imports: [
    UwvFormsModule,
    FormsModule,
    DatePickerModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(AppStateReducerToken),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    })
  ],
  providers: [AppStateReducerProvider, { provide: LOCALE_ID, useValue: 'nl-NL' }],
  entryComponents: [
    UwSituatieComponent,
    UwGegevensComponent,
    WerkEnInkomenComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

registerLocaleData(localenl);

