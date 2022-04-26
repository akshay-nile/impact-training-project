import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { EmployeeTabComponent } from './components/employee-tab/employee-tab.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from "@angular/material/dialog";
import { FullCalendarModule } from '@fullcalendar/angular';
import { ScheduleModule, DayService, WeekService, WorkWeekService, TimelineMonthService, MonthService, TimelineViewsService, MonthAgendaService, AgendaService } from '@syncfusion/ej2-angular-schedule';
import { MatFormFieldModule } from '@angular/material/form-field'; MatInputModule
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { PatientManagementComponent } from './components/patient-management/patient-management.component';
import { DataManagementComponent } from './components/data-management/data-management.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChangePasswordComponent } from './components/profile/change-password/change-password.component';


@NgModule({
  declarations: [
    DashboardComponent, 
    HeaderComponent, 
    EmployeeTabComponent,
    ProfileComponent,
    UserManagementComponent,
    PatientManagementComponent,
    DataManagementComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatBadgeModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatDialogModule,
    FullCalendarModule,
    ScheduleModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
