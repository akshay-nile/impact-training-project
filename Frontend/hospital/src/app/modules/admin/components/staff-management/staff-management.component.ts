import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/services/admin.service';
import { EmployeeEditDialogComponent } from './employee-edit-dialog/employee-edit-dialog.component';
import { EmployeeRegisterDialogComponent } from './employee-register-dialog/employee-register-dialog.component';

@Component({
  selector: 'staff-management',
  templateUrl: './staff-management.component.html',
  styleUrls: ['./staff-management.component.css']
})
export class StaffManagementComponent implements OnInit {

  user: any;
  allEmployees = [];
  displayedColumns = ['employeeId', 'name', 'email', 'role', 'status', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private adminService: AdminService,
  ) {
    this.user = JSON.parse(sessionStorage.getItem('user'));
  }

  ngOnInit(): void {
    this.adminService.getAllEmployees(this.user.employeeId).subscribe(res => {
      this.allEmployees = res;
      this.loadDataSource();
    });
  }

  loadDataSource() {
    let results = this.allEmployees.map(e => {
      return {
        employeeId: e.employeeId, status: e.status, role: e.role, email: e.email,
        name: e.title + '. ' + e.firstName + ' ' + e.lastName
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

  updateEmployeeStatus(employeeId: number, status: string) {
    let employee = this.allEmployees.find(e => e.employeeId === employeeId);
    let oldStatus = employee.status;
    employee.status = status;
    this.adminService.updateEmployee(employee, "status").subscribe(res => {
      if (res) {
        this.snackbar.open("Employee Status Successfully Updated !", "", { duration: 3000 });
      } else {
        employee.status = oldStatus;
        alert(res);
      }
      this.loadDataSource();
    });
  }

  openViewEmployeeDialog(employeeId: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(EmployeeEditDialogComponent, {
      minWidth: '60vw', minHeight: '90vh',
      data: { employee: this.allEmployees.find(e => e.employeeId === employeeId) }
    });
    dialogRef.afterClosed().subscribe(updatedEmployee => {
      if (!updatedEmployee) return;
      for (let i = 0; i < this.allEmployees.length; i++) {
        if (this.allEmployees[i].employeeId === updatedEmployee.employeeId) {
          this.allEmployees[i] = updatedEmployee;
          this.loadDataSource();
          break;
        }
      }
    });
  }

  openRegisterEmployeeDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(EmployeeRegisterDialogComponent, {
      minWidth: '60vw', minHeight: '90vh'
    });
    dialogRef.afterClosed().subscribe(newEmployee => {
      if (newEmployee) {
        this.allEmployees.push(newEmployee);
        this.loadDataSource();
      }
    });
  }

}
