import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NurseRoutingModule } from './nurse-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatBadgeModule } from '@angular/material/badge';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from "@angular/material/dialog";
import { NoteDialogComponent } from './components/note-dialog/note-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppointmentDialogComponent } from './components/appointment-dialog/appointment-dialog.component';
import { FullCalendarModule } from '@fullcalendar/angular'; 
import dayGridPlugin from '@fullcalendar/daygrid'; 
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import {ScheduleModule, DayService, WeekService, WorkWeekService,TimelineMonthService, MonthService,TimelineViewsService,MonthAgendaService, AgendaService } from '@syncfusion/ej2-angular-schedule';
import { VisitDetailsComponent } from './components/visit-details/visit-details.component';
import timeGridPlugin from '@fullcalendar/timegrid';
import { MatFormFieldModule } from '@angular/material/form-field';MatInputModule
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table'; 
import { NotesComponent } from './components/notes/notes.component';
import { NoteViewComponent } from './components/note-view/note-view.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { ProfileComponent } from './components/profile/profile.component';
FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin
]);
@NgModule({
  declarations: [DashboardComponent, NotesComponent, NoteDialogComponent, NoteViewComponent, AppointmentDialogComponent, VisitDetailsComponent, AppointmentComponent, ProfileComponent],
  imports: [
    CommonModule,
    NurseRoutingModule,
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
    MatSnackBarModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule
  ],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService, TimelineViewsService, TimelineMonthService],
})
export class NurseModule { }
