import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MedicationService } from 'src/app/services/medication.service';
import { noSpaceValidator } from 'src/app/validators/text-field.validator';

@Component({
  selector: 'app-medication-dialog',
  templateUrl: './medication-dialog.component.html',
  styleUrls: ['./medication-dialog.component.css']
})
export class MedicationDialogComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private snackbar: MatSnackBar,
    private medicationService: MedicationService,
    private dialogRef: MatDialogRef<MedicationDialogComponent>,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      medicationName: new FormControl('', [Validators.required, noSpaceValidator]),
      dosage: new FormControl('', [Validators.required, noSpaceValidator]),
      description: new FormControl('', [Validators.required, noSpaceValidator]),
    });
  }

  addNewMedication() {
    this.medicationService.addNewMedication(this.form.value).subscribe(addedMed => {
      this.form.reset();
      this.dialogRef.close(addedMed);
      this.snackbar.open("Medication Added Successfully !", "", { duration: 3000 });
    });
  }

  close() {
    this.dialogRef.close(null);
  }
}

