import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NurseRoutingModule } from './nurse-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NoteDialogComponent } from './components/note-dialog/note-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppointmentDialogComponent } from './components/appointment-dialog/appointment-dialog.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ScheduleModule, DayService, WeekService, WorkWeekService, TimelineMonthService, MonthService, TimelineViewsService, MonthAgendaService, AgendaService } from '@syncfusion/ej2-angular-schedule';
import { VisitDetailsComponent } from './components/visit-details/visit-details.component';
import timeGridPlugin from '@fullcalendar/timegrid';
import { NotesComponent } from './components/notes/notes.component';
import { NoteViewComponent } from './components/note-view/note-view.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { AppointmentDetailsComponent } from './components/visit-details/appointment-details/appointment-details.component';
import { PatientVisitHistoryComponent } from './components/patient-visit-history/patient-visit-history.component';
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
