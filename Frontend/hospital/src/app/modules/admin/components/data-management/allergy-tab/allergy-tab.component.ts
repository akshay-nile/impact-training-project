import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Allergy } from 'src/app/models/Allergy';
import { AllergyService } from 'src/app/services/allergy.service';
import { AllergyDialogComponent } from '../allergy-dialog/allergy-dialog.component';

@Component({
  selector: 'master-allergy-tab',
  templateUrl: './allergy-tab.component.html',
  styleUrls: ['./allergy-tab.component.css']
})
export class AllergyTabComponent implements OnInit {

  displayedColumns = ['id', 'type', 'name', 'action'];
  dataSource: MatTableDataSource<Allergy>;

  allAllergies = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private allergyService: AllergyService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.allergyService.getAllAllergies().subscribe(result => {
      this.allAllergies = result;
      this.loadDataSource();
    });
  }

  loadDataSource() {
    this.dataSource = new MatTableDataSource(this.allAllergies);
    if (this.dataSource != null) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  deleteAllergy(allergyId: number) {
    let i = this.allAllergies.findIndex(a => a.allergyId === allergyId);
    this.allAllergies.splice(i, 1);
    this.loadDataSource();
    this.allergyService.deleteAllergyById(allergyId).subscribe();
    this.snackbar.open("Allergy Successfully Deleted !", "", { duration: 3000 });
  }

  openAddNewAllergyDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(AllergyDialogComponent, {
      minWidth: '50vw', maxHeight: '50vh'
    });
    dialogRef.afterClosed().subscribe(addedAllergy => {
      if (addedAllergy) {
        this.allAllergies.push(addedAllergy);
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