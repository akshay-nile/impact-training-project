import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note-dialog',
  templateUrl: './note-dialog.component.html',
  styleUrls: ['./note-dialog.component.css']
})
export class NoteDialogComponent implements OnInit {

  registerForm!: FormGroup;
  submitted: boolean = false;
  date:string;

  designationValue: String = '';
  physicians: any[] = ['A', 'B', 'C'];

  constructor(private datePipe: DatePipe,public dialogRef: MatDialogRef<NoteDialogComponent>,
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

  sendNote() {
    console.log(this.registerForm.value)
  }

  close() {
    this.dialogRef.close();
  }
  viewPatientDetails() {

  }
  dropDownSelected() {
    console.log(this.registerForm.value.sendTo)
    if (this.registerForm.value.sendTo == 'A') {


      this.registerForm.controls['designation'].setValue('Physican');
    }
  }
  ngOnInit(): void {

  }


}
