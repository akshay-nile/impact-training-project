import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Appointment } from 'src/app/models/Appointment';

import { DatePipe } from '@angular/common';
import { CalendarOptions } from '@fullcalendar/angular';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AppointmentDialogComponent } from '../appointment-dialog/appointment-dialog.component';
import { AppointmentService } from 'src/app/services/appointment.service';
import { VisitDetailsComponent } from '../visit-details/visit-details.component';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  displayedColumns: string[] = ['title', 'employeeName', 'patientName', 'date', 'time', 'status', 'action'];
  dataSource: MatTableDataSource<Appointment>;
  date: string;
  todaysAppointment = "todaysAppointment";

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  user: any;
  calendarOptions: CalendarOptions;
  initialise: boolean;

  appointments = []
  calendarAppointments = [];

  allEmployeeNames = [];
  allPatientNames = [];

  constructor(
    private datePipe: DatePipe,
    private appointmentService: AppointmentService,
    private utilityService: UtilityService,
    private dialog: MatDialog
  ) {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  createCalender() {
    this.calendarOptions = {
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGrid,dayGridMonth,timeGridWeek'
      },
      height: 1100,
      initialView: 'timeGridWeek',
      hiddenDays: [0],
      allDaySlot: false,
      eventTimeFormat: {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      },
      eventSources: [{
          events: [],
          color: 'indigo',
          textColor: 'white',
          borderColor: 'black',
        }],
    }
  }

  ngOnInit(): void {
    this.getCalendarAppointments();
    this.getAllAppointments();
  }

  getCalendarAppointments() {
    this.appointmentService.getCalendarAppointments().subscribe((result) => {
      this.calendarAppointments = result !== null ? result : [];
      this.createCalender();
      this.calendarOptions.eventSources[0]['events'] = this.calendarAppointments;
      this.initialise = true;
    });
  }

  getAllAppointments() {
    this.appointmentService.getAllAppointmentDetails().subscribe(appts => {
      this.utilityService.getAllPhysicians().subscribe(employees => {
        this.allEmployeeNames = employees;
        this.utilityService.getAllPatientNames().subscribe(patients => {
          this.allPatientNames = patients;
          for (let a of appts) {
            a['employeeName'] = this.allEmployeeNames.find(e => e.employeeId == a.employeeId).name
            a['patientName'] = this.allPatientNames.find(p => p.patientId == a.patientId).name
          }
          this.dataSource = new MatTableDataSource(appts);
          if (this.dataSource != null) {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        });
      });
    })
  }

  viewDetails(appointment: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(VisitDetailsComponent, {
      width: '50%',
      data: { appointment: appointment, user: this.user, employeeNames: this.allEmployeeNames, patientNames: this.allPatientNames }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAllAppointments();
      this.getCalendarAppointments();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  bookAppointment() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(AppointmentDialogComponent, {
      width: '50%',
      data: { user: this.user, employeeNames: this.allEmployeeNames, patientNames: this.allPatientNames }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAllAppointments();
      this.getCalendarAppointments();
    });
  }

  getColor(status: string) {
    return {
      'text-warning': status === 'PENDING',
      'text-danger': status === 'CANCELLED',
      'text-success': status === 'ACCEPTED',
      'text-primary': status === 'ATTENDED',
      'text-secondary': status === 'EXPIRED' || status === 'NOT_ATTENDED'
    }
  }
}
