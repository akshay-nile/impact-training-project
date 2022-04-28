import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProcedureService } from 'src/app/services/procedure.service';
import { noSpaceValidator } from 'src/app/validators/text-field.validator';

@Component({
  selector: 'app-procedure-dialog',
  templateUrl: './procedure-dialog.component.html',
  styleUrls: ['./procedure-dialog.component.css']
})
export class ProcedureDialogComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private snackbar: MatSnackBar,
    private procedureService: ProcedureService,
    private dialogRef: MatDialogRef<ProcedureDialogComponent>,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      procedureName: new FormControl('', [Validators.required, noSpaceValidator]),
      description: new FormControl('', [Validators.required, noSpaceValidator]),
    });
  }

  addNewProcedure() {
    this.procedureService.addNewProcedure(this.form.value).subscribe(addedProcedure => {
      this.form.reset();
      this.snackbar.open("Procedure Added Successfully !", "", { duration: 3000 });
      this.dialogRef.close(addedProcedure);
    });
  }

  close() {
    this.dialogRef.close(null);
  }
}