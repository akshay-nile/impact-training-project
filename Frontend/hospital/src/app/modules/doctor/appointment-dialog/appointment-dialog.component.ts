import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-appointment-dialog',
  templateUrl: './appointment-dialog.component.html',
  styleUrls: ['./appointment-dialog.component.css']
})
export class AppointmentDialogComponent implements OnInit {
  registerForm!: FormGroup;
  physicians!: string[];
  timeSlots: string[] = ['9-11', '11-1', '2-4', '4-6'];
  patientEmails!: string[];
  date: any;
  next3months:any;
  constructor(public utilityService: UtilityService, 
    public dialogRef: MatDialogRef<AppointmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private datePipe: DatePipe, private formBuilder: FormBuilder) {
    this.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    console.log(this.date);
    let currentdate = new Date();
     this.next3months = this.datePipe.transform(new Date(currentdate.setMonth(currentdate.getMonth()+3)), 'yyyy-MM-dd');
     console.log(this.next3months);
     
    this.registerForm = formBuilder.group(
      {
        aptDate: [this.date, [Validators.required]],
        meetingTitle: ['', [Validators.required]],
        description: ['', [Validators.required]],
        physician: ['', [Validators.required]],
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

  bookAppointment() {
    this.utilityService.addAppointmentDetails(this.registerForm.value).subscribe((result) => {
      this.dialogRef.close();
    });
  }

  close() {
    this.registerForm.reset();
    this.dialogRef.close();
  }
}