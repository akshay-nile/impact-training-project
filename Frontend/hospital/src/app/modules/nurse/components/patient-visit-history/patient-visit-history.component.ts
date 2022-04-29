import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/models/Appointment';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Employee } from 'src/app/models/Employee';
import { Patient } from 'src/app/models/Patient';
import { PatientVisitService } from 'src/app/services/Patient-visit.service';
import { Vitals } from 'src/app/models/Vitals';
import { VisitReport } from 'src/app/models/VisitReport';
import { Procedure } from 'src/app/models/Procedure';
import { UtilityService } from 'src/app/services/utility.service';
import { VitalService } from 'src/app/services/vital.service';

@Component({
  selector: 'app-patient-visit-history',
  templateUrl: './patient-visit-history.component.html',
  styleUrls: ['./patient-visit-history.component.css']
})
export class PatientVisitHistoryComponent implements OnInit {

  displayedColumns: string[] = ['title', 'employeeName', 'patientName', 'date', 'time', 'action'];
  dataSource: MatTableDataSource<any>;
  date: string;
  todaysAppointment = "todaysAppointment";

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  user: any;
  report = new VisitReport();
  showReport: boolean;

  allPastAppointments = [];
  allEmployeeNames = [];
  allPatientNames = [];

  constructor(
    private router: Router,
    private datePipe: DatePipe,
    private patientVisitService: PatientVisitService,
    private appointmentService: AppointmentService,
    private utilityService: UtilityService
  ) {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    this.appointmentService.getAllPastAppointments().subscribe(appts => {
      this.allPastAppointments = appts;
      this.utilityService.getAllPhysicians().subscribe(employees => {
        this.allEmployeeNames = employees;
        this.utilityService.getAllPatientNames().subscribe(patients => {
          this.allPatientNames = patients;
          this.loadDataSource();
        });
      });
    })
  }

  loadDataSource() {
    let results = this.allPastAppointments.map(a => {
      return {
        appointment: a, title: a.title, date: a.date, time: a.time,
        employeeName: this.allEmployeeNames.find(e => e.employeeId == a.employeeId)?.name,
        patientName: this.allPatientNames.find(p => p.patientId == a.patientId)?.name
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
    this.patientVisitService.getVisitReportDetails(appointment).subscribe((result) => {
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
    this.router.navigate(['/login']);
  }

}
