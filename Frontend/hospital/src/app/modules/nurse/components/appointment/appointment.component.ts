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

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  displayedColumns: string[] = ['title', 'physician', 'patientEmail', 'date', 'action'];
  dataSource: MatTableDataSource<Appointment>;
  date: string;
  todaysAppointment = "todaysAppointment";

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  appointment = new Appointment();
  appointments: Appointment[] = []
  user: any;
  calendarAppointments = [];
  calendarOptions: CalendarOptions;
  initialise: boolean;

  constructor(private http: HttpClient,
    private datePipe: DatePipe,
    private appointmentService: AppointmentService,
    private router: Router,
    private dialog: MatDialog) {
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
      eventSources: [
        {
          events: [],
          color: 'indigo',
          textColor: 'white',
          borderColor: 'black',
        },
      ],

    }
  }
  getCalendarAppointment() {
    this.appointmentService.getCalendarAppointment().subscribe((result) => {
      this.calendarAppointments = result !== null ? result : [];
      this.createCalender();
      this.calendarOptions.eventSources[0]['events'] = this.calendarAppointments;
      this.initialise = true;
    });
  }

  ngOnInit(): void {
    this.getCalendarAppointment();
    this.getAllAppointments();
  }

  getAllAppointments() {
    this.appointmentService.getAllAppointmentDetails().subscribe((result) => {
      this.dataSource = new MatTableDataSource(result);
      if (this.dataSource != null) {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }
  viewDetails(id: number, email: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(VisitDetailsComponent, {
      width: '50%', data: { appointmentId: id, emailId: email, user: this.user.employeeId }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAllAppointments();
      this.getCalendarAppointment();
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
      width: '50%', data: { user: this.user.employeeId }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.appointment = result;
      this.getAllAppointments();
      this.getCalendarAppointment();
    });
  }
}
