import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ForgotPasswordService } from './services/forgot-password.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './services/login.service';
import { MainBodyComponent } from './components/main-body/main-body.component';
import { RegisterPatientComponent } from './components/register-patient/register-patient.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UtilityService } from './services/utility.service';
import {  DatePipe } from '@angular/common';
import { NoteService } from './services/notes.service';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ChangePasswordComponent } from './components/change-password/change-password.component'; 
import { AppointmentService } from './services/appointment.service';
import { VitalService } from './services/vital.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    RegisterPatientComponent,
    MainBodyComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FullCalendarModule,
    FormsModule
  ],
  providers: [DatePipe,ForgotPasswordService, LoginService,UtilityService,NoteService,AppointmentService,VitalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
