import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/models/Appointment';
import { AuthenticationService } from 'src/app/services/Authentication.servic';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-patient-visit-history',
  templateUrl: './patient-visit-history.component.html',
  styleUrls: ['./patient-visit-history.component.css']
})
export class PatientVisitHistoryComponent implements OnInit {

  displayedColumns: string[] = ['title', 'physician', 'patientEmail', 'date', 'action'];
  dataSource: MatTableDataSource<Appointment>;
  date: string;
  todaysAppointment = "todaysAppointment";

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  appointment = new Appointment();
  appointments: Appointment[] = [];
  patientId1: number;
  user: number;
  userName: string;
  showReport: boolean;

  constructor(private datePipe: DatePipe,
    private appointmentService: AppointmentService,
    private router: Router,
    private dialog: MatDialog,
    private authenticationService: AuthenticationService) {
    this.user = authenticationService.getUserId();
    this.userName = authenticationService.getUserName();
    this.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    this.getAllAppointments();
  }

  getAllAppointments() {
    this.appointmentService.getAllAppointmentDetails().subscribe((result) => {
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
    this.showReport = true;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  downloadReport() {
    var element = document.getElementById("report");
    html2canvas(element).then((canvas) => {
      var imgData = canvas.toDataURL("image/png");
      var doc = new jspdf();
      var imgHeight = canvas.height * 208 / canvas.width;
      doc.addImage(imgData, 0, 0, 208, 250);
      doc.save("Report.pdf");
    });
    this.showReport = false;
  }
  logout() {
    this.authenticationService.clearSession();
    this.router.navigate(['/login']);
  }

}
