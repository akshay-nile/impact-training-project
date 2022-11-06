import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppointmentDialogComponent } from './components/appointment-dialog/appointment-dialog.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NoteDialogComponent } from './components/note-dialog/note-dialog.component';
import { NurseRoutingModule } from './nurse-routing.module';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { AgendaService, DayService, MonthAgendaService, MonthService, ScheduleModule, TimelineMonthService, TimelineViewsService, WeekService, WorkWeekService } from '@syncfusion/ej2-angular-schedule';

import { SharedModule } from 'src/app/components/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { NoteViewComponent } from './components/note-view/note-view.component';
import { NotesComponent } from './components/notes/notes.component';
import { PatientVisitHistoryComponent } from './components/patient-visit-history/patient-visit-history.component';
import { AppointmentDetailsComponent } from './components/visit-details/appointment-details/appointment-details.component';
import { VisitDetailsComponent } from './components/visit-details/visit-details.component';

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
    AppointmentDialogComponent,
    VisitDetailsComponent,
    AppointmentComponent,
    AppointmentDetailsComponent,
    PatientVisitHistoryComponent
  ],
  imports: [
    CommonModule,
    NurseRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FullCalendarModule,
    ScheduleModule,
    SharedModule
  ],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService, TimelineViewsService, TimelineMonthService],
})
export class NurseModule { }
