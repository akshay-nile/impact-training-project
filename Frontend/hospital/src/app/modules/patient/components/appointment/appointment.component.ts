import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular';
import { Appointment } from 'src/app/models/Appointment';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AppointmentDetailsComponent } from '../appointment-details/appointment-details.component';
import { DataCollectionAppointmentComponent } from '../data-collection-appointment/data-collection-appointment.component';
import { AppointmentDialogComponent } from '../appointment-dialog/appointment-dialog.component';

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
  appointments: Appointment[] = [];
  user: any;
  patientId: number;
  calendarAppointments = [];
  calendarOptions: CalendarOptions;
  initialise: boolean;

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe,
    private appointmentService: AppointmentService,
    private router: Router,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.patientId = this.user.patientId;
    this.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    if (this.user.demographics == null || this.user.nominee == null) {
      setTimeout(() => {
        alert("Please complete your profile first !")
        this.router.navigate(['patient', 'dashboard', 'profile']);
      }, 500);
    }

    this.getCalendarAppointment();
    this.getAllAppointments();
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
    this.appointmentService.getCalendarAppointmentByPatientEmail(this.user.email).subscribe((result) => {
      this.calendarAppointments = result !== null ? result : [];
      this.createCalender();
      this.calendarOptions.eventSources[0]['events'] = this.calendarAppointments;
      this.initialise = true;
    });
  }


  getAllAppointments() {
    this.appointmentService.getUpcomingAppointmentByPatientEmail(this.user.email).subscribe((result) => {
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
    const dialogRef = this.dialog.open(AppointmentDetailsComponent, {
      width: '50%', data: { appointmentId: id, emailId: email, user: this.patientId }
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
      width: '50%', data: { user: this.patientId }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.appointment = result;
      this.getAllAppointments();
      this.getCalendarAppointment();
    });
  }

  bookDataCollectionAppointment() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(DataCollectionAppointmentComponent, {
      width: '50%', data: { user: this.patientId }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.appointment = result;
      this.getAllAppointments();
      this.getCalendarAppointment();
    });
  }
}
