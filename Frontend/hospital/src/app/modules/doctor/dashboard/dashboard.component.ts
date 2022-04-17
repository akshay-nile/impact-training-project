import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { DatePipe } from '@angular/common';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CalendarOptions } from '@fullcalendar/angular';
import { EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator';
import { UtilityService } from '../services/utility.service';
import { Appointment } from '../models/Appointment';
import { VisitDetailsComponent } from '../visit-details/visit-details.component';
import { AppointmentDialogComponent } from '../appointment-dialog/appointment-dialog.component';

@UntilDestroy()
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  appointment = new Appointment();
  appointments: Appointment[] = [];
  patientId1: number;

  constructor(private utilituService: UtilityService, private observer: BreakpointObserver, private router: Router,
    private dialog: MatDialog) { }

  ngOnInit(): void {
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
      this.appointments = result;
    })
  }
  viewDetails(id: number, email: string) {
    // console.log("Before service call");
    // this.utilituService.getPatientByEmail(email).subscribe((result) => {
    //   console.log("HELLO1"+result);
      
    //   this.patientId1 = result;
    // })
    // console.log("AFTER service call");
    // console.log("HELLO"+this.patientId1);
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(VisitDetailsComponent, {
      width: '50%', data: { appointmentId: id, emailId: email }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);

      this.getAllAppointments();
    });
  }

  bookAppointment() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(AppointmentDialogComponent, {
      width: '50%'
    });
    dialogRef.afterClosed().subscribe(result => {
        this.appointment = result;
        this.getAllAppointments();
    });
  }

  logout() {
    this.router.navigate(['/login']);
    console.log("Logout Method");
  }

}
