import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AllergyService } from 'src/app/services/allergy.service';
import { noSpaceValidator } from 'src/app/validators/text-field.validator';

@Component({
  selector: 'app-allergy-dialog',
  templateUrl: './allergy-dialog.component.html',
  styleUrls: ['./allergy-dialog.component.css']
})
export class AllergyDialogComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private snackbar: MatSnackBar,
    private allergyService: AllergyService,
    private dialogRef: MatDialogRef<AllergyDialogComponent>,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      allergyType: new FormControl('', [Validators.required, noSpaceValidator]),
      allergyName: new FormControl('', [Validators.required, noSpaceValidator]),
    });
  }

  addNewAllergy() {
    this.allergyService.addNewAllergy(this.form.value).subscribe(addedAllergy => {
      this.form.reset();
      this.snackbar.open("Allergy Added Successfully !", "", { duration: 3000 });
      this.dialogRef.close(addedAllergy);
    });
  }

  close() {
    this.dialogRef.close(null);
  }
}
