import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Procedure } from 'src/app/models/Procedure';
import { ProcedureService } from 'src/app/services/procedure.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProcedureDialogComponent } from '../procedure-dialog/procedure-dialog.component';

@Component({
  selector: 'master-procedure-tab',
  templateUrl: './procedure-tab.component.html',
  styleUrls: ['./procedure-tab.component.css']
})
export class ProcedureTabComponent implements OnInit {

  displayedColumns = ['id', 'name', 'description', 'action'];
  dataSource: MatTableDataSource<Procedure>;

  allProcedures = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private procedureService: ProcedureService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.procedureService.getAllProcedures().subscribe(result => {
      this.allProcedures = result;
      this.loadDataSource();
    });
  }

  loadDataSource() {
    this.dataSource = new MatTableDataSource(this.allProcedures);
    if (this.dataSource != null) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  deleteProcedure(procedureId: number) {
    let i = this.allProcedures.findIndex(p => p.procedureId === procedureId);
    this.allProcedures.splice(i, 1);
    this.loadDataSource();
    this.procedureService.deleteProcedureById(procedureId).subscribe();
    this.snackbar.open("Procedure Successfully Deleted !", "", { duration: 3000 });
  }

  openAddNewProcedureDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(ProcedureDialogComponent, {
      minWidth: '50vw', maxHeight: '50vh'
    });
    dialogRef.afterClosed().subscribe(addedProcedure => {
      if (addedProcedure) {
        this.allProcedures.push(addedProcedure);
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
