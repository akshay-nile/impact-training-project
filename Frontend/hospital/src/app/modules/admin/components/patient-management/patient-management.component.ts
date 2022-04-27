import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/services/admin.service';
import { PatientViewDialogComponent } from './patient-view-dialog/patient-view-dialog.component';

@Component({
  selector: 'patient-management',
  templateUrl: './patient-management.component.html',
  styleUrls: ['./patient-management.component.css']
})
export class PatientManagementComponent implements OnInit {

  user: any;
  allPatients = [];
  displayedColumns = ['patientId', 'name', 'email', 'phone', 'status', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private adminService: AdminService,
  ) { }

  ngOnInit(): void {
    this.adminService.getAllPatients().subscribe(res => {
      this.allPatients = res;
      this.loadDataSource();
    });
  }

  loadDataSource() {
    let results = this.allPatients.map(p => {
      return {
        patientId: p.patientId, status: p.status, phone: p.phone, email: p.email,
        name: p.title + '. ' + p.firstName + ' ' + p.lastName
      };
    });
    this.dataSource = new MatTableDataSource(results);
    if (this.dataSource != null) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  getStatusColor(status: string) {
    return {
      'bg-active': status === 'ACTIVE',
      'bg-blocked': status === 'BLOCKED',
      'bg-inactive': status === 'INACTIVE',
    };
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  updatePatientStatus(patientId: number, status: string) {
    let patient = this.allPatients.find(p => p.patientId === patientId);
    let oldStatus = patient.status;
    patient.status = status;
    this.adminService.updatePatient(patient).subscribe(res => {
      if (res) {
        this.snackbar.open("Patient Status Successfully Updated !", "", { duration: 3000 });
      } else {
        patient.status = oldStatus;
        alert(res);
      }
      this.loadDataSource();
    });
  }

  openViewPatientDialog(patientId: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(PatientViewDialogComponent, {
      minWidth: '60vw', minHeight: '90vh',
      data: { patient: this.allPatients.find(p => p.patientId === patientId) }
    });
    dialogRef.afterClosed().subscribe(null);
  }

}
