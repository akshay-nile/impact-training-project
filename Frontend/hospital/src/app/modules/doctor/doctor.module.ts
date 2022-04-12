import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import { NoteDialogComponent } from './note-dialog/note-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppointmentDialogComponent } from './appointment-dialog/appointment-dialog.component';
import { FullCalendarModule } from '@fullcalendar/angular'; 
import dayGridPlugin from '@fullcalendar/daygrid'; 
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import {ScheduleModule, DayService, WeekService, WorkWeekService,TimelineMonthService, MonthService,TimelineViewsService,MonthAgendaService, AgendaService } from '@syncfusion/ej2-angular-schedule';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DoctorRoutingModule } from './doctor-routing.module';
import { NotesComponent } from './notes/notes.component';
import { NoteViewComponent } from './note-view/note-view.component';
import { VisitDetailsComponent } from './visit-details/visit-details.component';
import { RouterModule, Routes } from '@angular/router';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);
@NgModule({
  declarations: [DashboardComponent, NotesComponent, NoteDialogComponent, 
    NoteViewComponent, AppointmentDialogComponent, VisitDetailsComponent],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    MatBadgeModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatDialogModule,
    ReactiveFormsModule,
    FullCalendarModule,
    ScheduleModule,
    MatDividerModule
  ],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, 
    MonthAgendaService, TimelineViewsService, TimelineMonthService],
})
export class DoctorModule { }
