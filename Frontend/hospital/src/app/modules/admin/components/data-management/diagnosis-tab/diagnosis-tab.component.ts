import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Diagnosis } from 'src/app/models/Diagnosis';
import { DiagnosisService } from 'src/app/services/diagnosis.service';
import { DiagnosisDialogComponent } from '../diagnosis-dialog/diagnosis-dialog.component';

@Component({
  selector: 'master-diagnosis-tab',
  templateUrl: './diagnosis-tab.component.html',
  styleUrls: ['./diagnosis-tab.component.css']
})
export class DiagnosisTabComponent implements OnInit {

  displayedColumns = ['id', 'name', 'action'];
  dataSource: MatTableDataSource<Diagnosis>;

  allDiagnosis = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private diagnosisService: DiagnosisService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.diagnosisService.getAllDiagnosis().subscribe(result => {
      this.allDiagnosis = result;
      this.loadDataSource();
    });
  }

  loadDataSource() {
    this.dataSource = new MatTableDataSource(this.allDiagnosis);
    if (this.dataSource != null) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  deleteDiagnosis(diagnosisId: number) {
    let i = this.allDiagnosis.findIndex(d => d.diagnosisId === diagnosisId);
    this.allDiagnosis.splice(i, 1);
    this.loadDataSource();
    this.diagnosisService.deleteDiagnosisById(diagnosisId).subscribe();
    this.snackbar.open("Diagnosis has been deleted successfully", "", { duration: 3000 });
  }

  openAddNewDiagnosisDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(DiagnosisDialogComponent, {
      minWidth: '50vw', maxHeight: '40vh'
    });
    dialogRef.afterClosed().subscribe(addedDiagnosis => {
      if (addedDiagnosis) {
        this.allDiagnosis.push(addedDiagnosis);
        this.loadDataSource();
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
