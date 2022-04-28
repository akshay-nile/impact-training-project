import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Medication } from 'src/app/models/Medication';
import { MedicationService } from 'src/app/services/medication.service';
import { MedicationDialogComponent } from '../medication-dialog/medication-dialog.component';

@Component({
  selector: 'master-medication-tab',
  templateUrl: './medication-tab.component.html',
  styleUrls: ['./medication-tab.component.css']
})
export class MedicationTabComponent implements OnInit {

  displayedColumns = ['id', 'name', 'dosage', 'description', 'action'];
  dataSource: MatTableDataSource<Medication>;

  allMedications = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private medicationService: MedicationService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.medicationService.getAllMedications().subscribe(result => {
      this.allMedications = result;
      this.loadDataSource();
    });
  }

  loadDataSource() {
    this.dataSource = new MatTableDataSource(this.allMedications);
    if (this.dataSource != null) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  deleteMedication(medicationId: number) {
    let i = this.allMedications.findIndex(m => m.medicationId === medicationId);
    this.allMedications.splice(i, 1);
    this.loadDataSource();
    this.medicationService.deleteMedicationById(medicationId).subscribe();
    this.snackbar.open("Medication Successfully Deleted !", "", { duration: 3000 });
  }

  openAddNewMedicationDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(MedicationDialogComponent, {
      minWidth: '50vw', maxHeight: '50vh'
    });
    dialogRef.afterClosed().subscribe(addedMedication => {
      if (addedMedication) {
        this.allMedications.push(addedMedication);
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
