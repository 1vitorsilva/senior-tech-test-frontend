import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HospedesComponent } from './pages/hospedes/hospedes.component';
import { CheckinComponent } from './pages/checkin/checkin.component';
import { HospedeFormComponent } from './pages/hospedes/hospede-form/hospede-form.component';

const routes: Routes = [
  { path: 'hospedes', component: HospedesComponent },
  { path: 'new-hospede', component: HospedeFormComponent },
  { path: 'checkin', component: CheckinComponent },
  { path: '**', redirectTo: 'hospedes', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
