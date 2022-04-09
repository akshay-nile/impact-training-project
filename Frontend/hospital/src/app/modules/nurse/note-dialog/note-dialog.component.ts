import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-note-dialog',
  templateUrl: './note-dialog.component.html',
  styleUrls: ['./note-dialog.component.css']
})
export class NoteDialogComponent implements OnInit {

  registerForm!: FormGroup;
  submitted: boolean = false;
  date: string;

  designationValue: String = '';
  physicians: any[] ;

  constructor(private snackbar: MatSnackBar,public utilityService: UtilityService,private datePipe: DatePipe, public dialogRef: MatDialogRef<NoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router, private formBuilder: FormBuilder) {
    this.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.registerForm = formBuilder.group(
      {
        urgencyLevel: new FormControl('Urgent'),
        date: [this.date, [Validators.required]],
        designation: ['', [Validators.required]],
        message: ['', [Validators.required]],
        sendTo: ['', [Validators.required]],
      }
    )
  }
  getAllPhysicianNames() {
    this.utilityService.getAllPhysicianNames().subscribe((result) => {
      this.physicians = result;
    });
  }
  sendNote() {
    console.log(this.registerForm.value);
    this.snackbar.open("Note is successfully sent", "", { duration: 3000 });
  }

  close() {
    this.dialogRef.close();
  }
  viewPatientDetails() {
  }
  dropDownSelected() {
    if (this.registerForm.value.sendTo == 'akshay.nile@citiustech.com') {
      this.registerForm.controls.designation.setValue('Consultant Ophtho');
    }
  }
  ngOnInit(): void {
    this.getAllPhysicianNames()
  }
}
