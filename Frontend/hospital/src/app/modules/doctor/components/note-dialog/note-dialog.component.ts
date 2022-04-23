import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NoteService } from 'src/app/services/notes.service';
import { UtilityService } from 'src/app/services/utility.service';
import { noSpaceValidator } from 'src/app/validators/text-field.validator';

@Component({
  selector: 'app-note-dialog',
  templateUrl: './note-dialog.component.html',
  styleUrls: ['./note-dialog.component.css']
})
export class NoteDialogComponent implements OnInit {

  noteForm!: FormGroup;
  submitted: boolean = false;
  date: string;

  constructor(
    private snackbar: MatSnackBar,
    private datePipe: DatePipe,
    private dialogRef: MatDialogRef<NoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router, private formBuilder: FormBuilder
  ) {
    this.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    let replyTo = this.data.employees.length == 1 ? this.data.employees[0].email : '';
    this.noteForm = this.formBuilder.group({
      urgencyLevel: ['Non-Urgent', []],
      date: [this.date, [Validators.required]],
      message: ['', [Validators.required, noSpaceValidator]],
      sendTo: [{ value: replyTo, disabled: replyTo !== '' }, [Validators.required]],
      employeeId: [this.data.user.employeeId, []],
      status: ['ACTIVE', []]
    })
  }

  get urgencyLevel() { return this.noteForm.controls.urgencyLevel; }
  get message() { return this.noteForm.controls.message; }
  get sendTo() { return this.noteForm.controls.sendTo; }

  sendNote() {
    this.snackbar.open("Note is successfully sent", "", { duration: 3000 });
  }

  close() {
    this.dialogRef.close();
  }

  ngOnInit(): void {

  }
}
