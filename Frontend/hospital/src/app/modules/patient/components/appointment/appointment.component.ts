import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular';
import { Appointment } from 'src/app/models/Appointment';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AppointmentDetailsComponent } from '../appointment-details/appointment-details.component';
import { DataCollectionAppointmentComponent } from '../data-collection-appointment/data-collection-appointment.component';
import { AppointmentDialogComponent } from '../appointment-dialog/appointment-dialog.component';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  displayedColumns: string[] = ['title', 'employeeName', 'date', 'time', 'status', 'action'];
  dataSource: MatTableDataSource<Appointment>;
  today: string;
  todaysAppointment = "todaysAppointment";

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  appointment = new Appointment();
  appointments: Appointment[] = [];
  user: any;
  calendarAppointments = [];
  calendarOptions: CalendarOptions;
  initialise: boolean;
  allEmployeeNames = [];

  constructor(
    private datePipe: DatePipe,
    private appointmentService: AppointmentService,
    private utilityService: UtilityService,
    private router: Router,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    if (this.user.demographics == null || this.user.nominee == null) {
      setTimeout(() => {
        alert("Please complete your Profile !")
        this.router.navigate(['patient', 'dashboard', 'profile']);
      }, 500);
    }

    this.getCalendarAppointments();
    this.getAppointmentsByPatientId();
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

  getCalendarAppointments() {
    this.appointmentService.getCalendarAppointmentsById(this.user.patientId).subscribe(result => {
      this.calendarAppointments = result || [];
      this.createCalender();
      this.calendarOptions.eventSources[0]['events'] = this.calendarAppointments;
      this.initialise = true;
    });
  }

  getAppointmentsByPatientId() {
    this.appointmentService.getAppointmentsById(this.user.patientId).subscribe(appts => {
      this.utilityService.getAllPhysicians().subscribe(employees => {
        this.allEmployeeNames = employees;
        for (let a of appts) {
          a['employeeName'] = this.allEmployeeNames.find(e => e.employeeId == a.employeeId).name
        }
        this.dataSource = new MatTableDataSource(appts);
        if (this.dataSource != null) {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
    });
  }

  viewDetails(appointment: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(AppointmentDetailsComponent, {
      minWidth: '60vw', minHeight: '70vh',
      data: { appointment: appointment, user: this.user, employeeNames: this.allEmployeeNames }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAppointmentsByPatientId();
      this.getCalendarAppointments();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = (filterValue || '').trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  bookAppointment() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(AppointmentDialogComponent, {
      minWidth: '60vw', minHeight: '70vh',
      data: { user: this.user, employeeNames: this.allEmployeeNames }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.appointment = result;
      this.getAppointmentsByPatientId();
      this.getCalendarAppointments();
    });
  }

  bookDataCollectionAppointment() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(DataCollectionAppointmentComponent, {
      minWidth: '60vw', minHeight: '70vh', 
      data: { user: this.user, employeeNames: this.allEmployeeNames }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.appointment = result;
      this.getAppointmentsByPatientId();
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
