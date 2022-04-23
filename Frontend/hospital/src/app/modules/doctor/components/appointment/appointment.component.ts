import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Appointment } from 'src/app/models/Appointment';

import { DatePipe } from '@angular/common';
import { CalendarOptions } from '@fullcalendar/angular';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AppointmentBookDialogComponent} from '../appointment-book-dialog/appointment-book-dialog.component';
import { UtilityService } from 'src/app/services/utility.service';
import { AppointmentDetailsDialogComponent } from '../appointment-details-dialog/appointment-details-dialog.component';
import { PatientDetailsDialogComponent } from '../patient-details-dialog/patient-details-dialog.component';
import { PrescriptionDetailsDialogComponent } from '../prescription-details-dialog/prescription-details-dialog.component';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  displayedColumns: string[] = ['title', 'patientName', 'date', 'time', 'status', 'action'];
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

  allPatientNames = [];

  constructor(
    private datePipe: DatePipe,
    private appointmentService: AppointmentService,
    private utilityService: UtilityService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    this.getCalendarAppointments();
    this.getAppointmentsByEmployeeId();
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
    this.appointmentService.getCalendarAppointmentsById(this.user.employeeId).subscribe((result) => {
      this.calendarAppointments = result !== null ? result : [];
      this.createCalender();
      this.calendarOptions.eventSources[0]['events'] = this.calendarAppointments;
      this.initialise = true;
    });
  }

  getAppointmentsByEmployeeId() {
    this.appointmentService.getAppointmentsById(this.user.employeeId).subscribe(appts => {
      this.utilityService.getAllPatientNames().subscribe(patients => {
        this.allPatientNames = patients;
        for (let a of appts) {
          a['patientName'] = this.allPatientNames.find(p => p.patientId == a.patientId).name
        }
        this.dataSource = new MatTableDataSource(appts);
        if (this.dataSource != null) {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
    });
  }

  openAppointmentDetailsDialog(appointment) {
    let patientName = this.allPatientNames.find(p => p.patientId === appointment.patientId).name;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(AppointmentDetailsDialogComponent, {
      width: '50%', 
      data: { appointment: appointment, user: this.user, patientName: patientName }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAppointmentsByEmployeeId();
      this.getCalendarAppointments();
    });
  }

  openPatientDetailsDialog(appointment) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(PatientDetailsDialogComponent, {
      width: '50%', 
      data: { appointment: appointment }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAppointmentsByEmployeeId();
      this.getCalendarAppointments();
    });
  }

  openAddPrescriptionDialog(appointment) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(PrescriptionDetailsDialogComponent, {
      width: '50%', 
      data: { appointment: appointment, user: this.user }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAppointmentsByEmployeeId();
      this.getCalendarAppointments();
    });
  }

  openBookAppointmentDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(AppointmentBookDialogComponent, {
      width: '50%',
      data: { user: this.user, patientNames: this.allPatientNames }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAppointmentsByEmployeeId();
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
