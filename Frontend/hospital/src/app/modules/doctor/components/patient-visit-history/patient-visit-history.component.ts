import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/models/Appointment';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Employee } from 'src/app/models/Employee';
import { Patient } from 'src/app/models/Patient';
import { PatientVisitService } from 'src/app/services/Patient-visit.service';
import { Vitals } from 'src/app/models/Vitals';
import { VisitReport } from 'src/app/models/VisitReport';
import { Procedure } from 'src/app/models/Procedure';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-patient-visit-history',
  templateUrl: './patient-visit-history.component.html',
  styleUrls: ['./patient-visit-history.component.css']
})
export class PatientVisitHistoryComponent implements OnInit {

  displayedColumns: string[] = ['title', 'employeeName', 'patientName', 'date', 'time', 'action'];
  dataSource: MatTableDataSource<Appointment>;
  date: string;
  todaysAppointment = "todaysAppointment";

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  appointment = new Appointment();
  appointments: Appointment[] = [];
  patientId1: number;
  showReport: boolean;
  user: any;
  report = new VisitReport();
  patient = new Patient();
  physician = new Employee();
  vital = new Vitals();
  apt = new Appointment();
  procedures: Procedure[];
  allEmployeeNames = [];
  allPatientNames = [];

  constructor(
    private datePipe: DatePipe,
    private appointmentService: AppointmentService,
    private patientVisitService: PatientVisitService,
    private router: Router,
    private utilityService: UtilityService,
    private dialog: MatDialog
  ) {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    this.getAllAppointments();
  }

  getAllAppointments() {
    this.appointmentService.getAllPastAppointments().subscribe(appts => {
      this.getAllPatients(appts);

    })
  }

  getAllPatients(appts: any) {
    this.utilityService.getAllPatientNames().subscribe(
      patients => {
        this.allPatientNames = patients;
        this.getAllPhysicians(appts);
      }
    );
  }

  getAllPhysicians(appts: any) {
    this.utilityService.getAllPhysicians().subscribe(employees => {
      this.allEmployeeNames = employees;
      for (let a of appts) {
        a['employeeName'] = this.allEmployeeNames.find(e => e.employeeId == a.employeeId).name
        a['employeeEmail'] = this.allEmployeeNames.find(e => e.employeeId == a.employeeId).email;
        a['patientName'] = this.allPatientNames.find(p => p.patientId == a.patientId).name;
        a['patientEmail'] = this.allPatientNames.find(p => p.patientId == a.patientId).email;
      }
      this.dataSource = new MatTableDataSource(appts);
      if (this.dataSource != null) {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  viewDetails(appointment: any) {
    this.showReport = true;
    this.patientVisitService.getVisitReportDetails(appointment).subscribe((result) => {
      this.report = result;
      this.patient = this.report.patient;
      this.physician = this.report.physician;
      this.apt = this.report.appointment;
      this.vital = this.report.vitals;
      this.procedures = this.report.procedures;
    });
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
      doc.save("Report_" + Date.now() + ".pdf");
    });
    this.showReport = false;
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}
