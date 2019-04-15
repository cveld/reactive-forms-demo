import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WazoComponent } from './wazo/wazo.component';
import { BevestigingComponent } from './bevestiging/bevestiging.component';

const routes: Routes = [
  {path: '', component: WazoComponent},
  {path: 'bevestiging', component: BevestigingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
