import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AppointmentDialogComponent } from '../../appointment-dialog/appointment-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Appointment } from 'src/app/models/Appointment';
import { VisitDetailsComponent } from '../../visit-details/visit-details.component';
import { UtilityService } from 'src/app/services/utility.service';
import { AuthenticationService } from 'src/app/services/Authentication.servic';
import { DatePipe, formatDate } from '@angular/common';
import { CalendarOptions } from '@fullcalendar/angular';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@UntilDestroy()
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['title', 'physician', 'patientEmail', 'date', 'action'];
  dataSource: MatTableDataSource<Appointment>;
  date: string;
  todaysAppointment = "todaysAppointment";

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  appointment = new Appointment();
  appointments: Appointment[] = [];
  patientId1: number;
  user: number;
  userName: string;
  calendarAppointments = [];
  calendarOptions: CalendarOptions;
  initialise: boolean;

  constructor(private http: HttpClient, private datePipe: DatePipe, private utilituService: UtilityService, private observer: BreakpointObserver, private router: Router,
    private dialog: MatDialog, private authenticationService: AuthenticationService) {
    this.user = authenticationService.getUserId();
    this.userName = authenticationService.getUserName();
    this.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    console.log(this.date);

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
      eventClick: this.handleDateClick.bind(this),
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

  handleDateClick(arg) {
    console.log(arg);
    alert('date click! ' + arg.dateStr)
  }

  getCalendarAppointment() {
    this.utilituService.getCalendarAppointment().subscribe((result) => {
      this.calendarAppointments = result !== null ? result : [];
      this.createCalender();
      this.calendarOptions.eventSources[0]['events'] = this.calendarAppointments;
      this.initialise = true;
    });
  }

  ngOnInit(): void {
    this.getCalendarAppointment();

    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
    this.getAllAppointments();
  }

  getAllAppointments() {
    this.utilituService.getAllAppointmentDetails().subscribe((result) => {
      console.log(result);
      this.dataSource = new MatTableDataSource(result);
      console.log(this.dataSource);
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
      width: '50%', data: { appointmentId: id, emailId: email, user: this.user }
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
      width: '50%', data: { user: this.user }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.appointment = result;
      this.getAllAppointments();
      this.getCalendarAppointment();
    });
  }

  logout() {
    this.authenticationService.clearSession();
    this.router.navigate(['/login']);
  }

}
