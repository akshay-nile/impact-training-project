import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppointmentService } from 'src/app/services/appointment.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-appointment-dialog',
  templateUrl: './appointment-dialog.component.html',
  styleUrls: ['./appointment-dialog.component.css']
})
export class AppointmentDialogComponent implements OnInit {
  appointmentForm!: FormGroup;
  physicians: string[];
  timeSlots: string[];
  patientEmails: string[];
  empId: number;
  date: string;
  next3months: string;
  user: any;
  constructor(private snackbar: MatSnackBar,
    private utilityService: UtilityService,
    private appointmentService:AppointmentService,
    private dialogRef: MatDialogRef<AppointmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private datePipe: DatePipe,
    private formBuilder: FormBuilder) {
    this.user = data.user;
    this.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    let currentdate = new Date();
    this.next3months = this.datePipe.transform(new Date(currentdate.setMonth(currentdate.getMonth() + 3)), 'yyyy-MM-dd');
    this.appointmentForm = formBuilder.group(
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
    if (this.appointmentForm.value.physician == '') return;
    this.utilityService.getEmpIdByEmail(this.appointmentForm.value.physician).subscribe(
      (result) => {
        this.empId = result;
      }
    );
  }

  bookAppointment() {
    this.appointmentForm.value.editHistory = "Edited by Nurse with Employee Id " + this.user + " on " + this.appointmentForm.value.aptDate;
    this.appointmentService.addAppointmentDetails(this.appointmentForm.value).subscribe((result) => {

      this.dialogRef.close();
    });
    this.snackbar.open("Appointment is successfully created", "", { duration: 3000 });
  }
  getAvailableTimeSlots() {
    if (this.appointmentForm.value.physician == '') return;
    if (this.appointmentForm.value.aptDate == null || !this.appointmentForm.value.aptDate) {
      this.appointmentForm.value.aptDate = this.date;
    }
    this.appointmentService.
      getAvailableTimeSlots(this.appointmentForm.value.physician, this.appointmentForm.value.aptDate).subscribe(
        (result) => {
          this.timeSlots = result;
        });
  }

  close() {
    this.appointmentForm.reset();
    this.dialogRef.close();
  }

}