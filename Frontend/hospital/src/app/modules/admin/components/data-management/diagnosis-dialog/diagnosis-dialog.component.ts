import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DiagnosisService } from 'src/app/services/diagnosis.service';
import { noSpaceValidator } from 'src/app/validators/text-field.validator';

@Component({
  selector: 'app-diagnosis-dialog',
  templateUrl: './diagnosis-dialog.component.html',
  styleUrls: ['./diagnosis-dialog.component.css']
})
export class DiagnosisDialogComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private snackbar: MatSnackBar,
    private diagnosisService: DiagnosisService,
    private dialogRef: MatDialogRef<DiagnosisDialogComponent>,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required, noSpaceValidator]),
    });
  }

  addNewDiagnosis() {
    this.diagnosisService.addNewDiagnosis(this.form.value).subscribe(addedDiagnosis => {
      this.form.reset();
      this.snackbar.open("Diagnosis Added Successfully !", "", { duration: 3000 });
      this.dialogRef.close(addedDiagnosis);
    });
  }

  close() {
    this.dialogRef.close(null);
  }
}
