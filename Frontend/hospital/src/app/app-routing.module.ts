import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PatientForgetPasswordComponent } from './patient-forget-password/patient-forget-password.component';
import { PatientLoginComponent } from './patient-login/patient-login.component';
import { PatientRegisterComponent } from './patient-register/patient-register.component';

const routes: Routes = [
  {path:'patient/login', component: PatientLoginComponent},
  {path:'patient/register', component: PatientRegisterComponent},
  {path:'patient/forget-password', component: PatientForgetPasswordComponent},
  {path:'**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
