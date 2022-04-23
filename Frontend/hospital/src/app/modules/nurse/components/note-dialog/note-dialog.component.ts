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

  noteForm!: FormGroup;
  submitted: boolean = false;
  date: string;

  designationValue: String = '';
  physicians: any[];

  constructor(private snackbar: MatSnackBar,
    private utilityService: UtilityService,
    private datePipe: DatePipe,
    private dialogRef: MatDialogRef<NoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router, private formBuilder: FormBuilder) {
    this.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.noteForm = formBuilder.group({
      urgencyLevel: new FormControl('NON_URGENT'),
      date: [this.date, [Validators.required]],
      message: ['', [Validators.required]],
      sendTo: ['', [Validators.required]],
      employeeId: [this.data.user.employeeId]
    });
  }

  ngOnInit(): void {
  }
  
  sendNote() {
    this.snackbar.open("Note Successfully Sent !", "", { duration: 3000 });
  }

  close() {
    this.dialogRef.close();
  }
  
  dropDownSelected() {
    if (this.noteForm.value.sendTo == 'akshay.nile@citiustech.com') {
      this.noteForm.controls.designation.setValue('Consultant Ophtho');
    }
  }
  
}
