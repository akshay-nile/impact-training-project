import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-appointment-dialog',
  templateUrl: './appointment-dialog.component.html',
  styleUrls: ['./appointment-dialog.component.css']
})
export class AppointmentDialogComponent implements OnInit {
  registerForm!: FormGroup;
  physicians: string[];
  timeSlots: string[];
  patientEmails: string[];
  empId: number;
  date: string;
  next3months: string;
  user: any;
  constructor(private snackbar: MatSnackBar, public utilityService: UtilityService, public dialogRef: MatDialogRef<AppointmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private datePipe: DatePipe, private formBuilder: FormBuilder) {
    this.user = data.user;
    this.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    let currentdate = new Date();
    this.next3months = this.datePipe.transform(new Date(currentdate.setMonth(currentdate.getMonth() + 3)), 'yyyy-MM-dd');
    this.registerForm = formBuilder.group(
      {
        aptDate: [this.date, [Validators.required]],
        meetingTitle: ['', [Validators.required]],
        description: ['', [Validators.required]],
        physician: ['', [Validators.required]],
        empId: ['', [Validators.required]],
        patientEmail: ['', [Validators.required]],
        time: ['', [Validators.required]]

      }
    )
  }

  ngOnInit(): void {
    this.getAllPatientEmail();
    this.getAllPhysicianNames();
  }

  getAllPatientEmail() {
    this.utilityService.getAllPatientEmail().subscribe((result) => {
      this.patientEmails = result;
    });
  }

  getAllPhysicianNames() {
    this.utilityService.getAllPhysicianNames().subscribe((result) => {
      this.physicians = result;
    });
  }

  getPhysicianEmployeeId() {
    if(this.registerForm.value.physician == '') return;
    this.utilityService.getEmpIdByEmail(this.registerForm.value.physician).subscribe(
      (result) => {
        console.log(result);
        this.empId = result;

      }
    );
  }

  bookAppointment() {
    console.log(this.registerForm.value);

    this.registerForm.value.editHistory = "Edited by Nurse with Employee Id " + this.user + " on " + this.registerForm.value.aptDate;
    this.utilityService.addAppointmentDetails(this.registerForm.value).subscribe((result) => {

      this.dialogRef.close();
    });
    this.snackbar.open("Appointment is successfully created", "", { duration: 3000 });
  }
  getAvailableTimeSlots() {
    if(this.registerForm.value.physician == '') return;
    if (this.registerForm.value.aptDate == null || !this.registerForm.value.aptDate) {
      this.registerForm.value.aptDate = this.date;
    }
    this.utilityService.
      getAvailableTimeSlots(this.registerForm.value.physician, this.registerForm.value.aptDate).subscribe(
        (result) => {
          this.timeSlots = result;
        });
  }
  close() {
    this.registerForm.reset();
    this.dialogRef.close();
  }

}