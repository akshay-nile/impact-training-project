import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ScheduleModule, DayService, WeekService, WorkWeekService, TimelineMonthService, MonthService, TimelineViewsService, MonthAgendaService, AgendaService } from '@syncfusion/ej2-angular-schedule';
import timeGridPlugin from '@fullcalendar/timegrid';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { AppointmentBookDialogComponent } from './components/appointment-book-dialog/appointment-book-dialog.component';
import { DoctorRoutingModule } from './doctor-routing.module';
import { NoteDialogComponent } from './components/note-dialog/note-dialog.component';
import { NotesComponent } from './components/notes/notes.component';
import { NoteViewComponent } from './components/note-view/note-view.component';
import { PrescriptionDetailsDialogComponent } from './components/prescription-details-dialog/prescription-details-dialog.component';
import { AppointmentDetailsDialogComponent } from './components/appointment-details-dialog/appointment-details-dialog.component';
import { PatientDetailsDialogComponent } from './components/patient-details-dialog/patient-details-dialog.component';
import { PatientVisitHistoryComponent } from './components/patient-visit-history/patient-visit-history.component';
import { AddProceduresComponent } from './components/prescription-details-dialog/add-procedures/add-procedures.component';
import { AddMedicationsComponent } from './components/prescription-details-dialog/add-medications/add-medications.component';
import { AddDiagnosisComponent } from './components/prescription-details-dialog/add-diagnosis/add-diagnosis.component';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/components/shared/shared.module';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin
]);
@NgModule({
  declarations: [
    DashboardComponent,
    NotesComponent,
    NoteDialogComponent,
    NoteViewComponent,
    AppointmentBookDialogComponent,
    AppointmentComponent,
    AppointmentDetailsDialogComponent,
    PatientDetailsDialogComponent,
    PatientVisitHistoryComponent,
    PrescriptionDetailsDialogComponent,
    AddProceduresComponent,
    AddMedicationsComponent,
    AddDiagnosisComponent
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FullCalendarModule,
    ScheduleModule,
    SharedModule
  ],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService, TimelineViewsService, TimelineMonthService],
})
export class DoctorModule { }
