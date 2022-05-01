import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';
import { PatientVisitService } from 'src/app/services/Patient-visit.service';
import { VisitReport } from 'src/app/models/VisitReport';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-patient-visit-history',
  templateUrl: './patient-visit-history.component.html',
  styleUrls: ['./patient-visit-history.component.css']
})
export class PatientVisitHistoryComponent implements OnInit {

  displayedColumns: string[] = ['title', 'patientName', 'date', 'time', 'action'];
  dataSource: MatTableDataSource<any>;
  date: string;
  todaysAppointment = "todaysAppointment";

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  user: any;
  
  showReport: boolean;
  report = new VisitReport();
  
  allPatientNames = [];
  allPastAppointments = []

  constructor(
    private datePipe: DatePipe,
    private appointmentService: AppointmentService,
    private patientVisitService: PatientVisitService,
    private router: Router,
    private utilityService: UtilityService
  ) {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    this.appointmentService.getPastAppointmentByUserId(this.user.employeeId).subscribe(appts => {
      this.allPastAppointments = appts;
      this.utilityService.getAllPatientNames().subscribe(patients => {
        this.allPatientNames = patients;
        this.loadDataSource();
      });
    });
  }

  loadDataSource() {
    let results = this.allPastAppointments.map(a => {
      return {
        appointment: a, title: a.title, date: a.date, time: a.time,
        patientName: this.allPatientNames.find(p => p.patientId === a.patientId)?.name
      };
    });
    this.dataSource = new MatTableDataSource(results);
    if (this.dataSource != null) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  viewDetails(appointment: any) {
    this.showReport = true;
    this.patientVisitService.getVisitReportDetails(appointment).subscribe(result => {
      this.report = result;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

}
