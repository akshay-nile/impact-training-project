import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MedicationService } from 'src/app/services/medication.service';
import { PrescriptionDetailsDialogComponent } from '../prescription-details-dialog.component';

@Component({
  selector: 'add-medications',
  templateUrl: './add-medications.component.html',
  styleUrls: ['./add-medications.component.css']
})
export class AddMedicationsComponent implements OnInit {

  @Input() appointmentId: number;
  @Output('update') updateEvent = new EventEmitter<void>();

  form!: FormGroup;

  medicationsData = [];
  selectedMedications = [];

  selectedMedication: any = null;
  medicationDosages: string[] = [];
  hasAnythingChanged = false;

  constructor(
    private snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<PrescriptionDetailsDialogComponent>,
    private medicationService: MedicationService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      medicationName: [''],
      dosage: [''],
      description: [{ value: '', disabled: true }]
    });
  }

  ngOnInit(): void {
    this.medicationService.getAllMedications().subscribe(res => this.medicationsData = res);
    this.medicationService.getMedicationByAptId(this.appointmentId).subscribe(res => this.selectedMedications = res);
  }

  loadDosagesForName(name: string) {
    if (name === '') {
      this.medicationDosages = [];
      this.form.controls.dosage.setValue('');
      this.form.controls.dosage.disable();
    } else {
      this.form.controls.dosage.enable();
      this.medicationDosages = this.medicationsData.filter(m => m.medicationName === name).map(m => m.dosage);
      if (this.medicationDosages.length === 1) {
        this.form.controls.dosage.setValue(this.medicationDosages[0]);
        this.showDescription(name, this.medicationDosages[0]);
      }
    }
  }

  showDescription(name: string, dosage: string) {
    if (name === '' || dosage === '') {
      this.form.reset();
      this.selectedMedication = null;
    } else {
      this.selectedMedication = this.medicationsData.find(m => m.medicationName === name && m.dosage === dosage);
      this.form.controls.description.setValue(this.selectedMedication?.description);
    }
  }

  addSelectedMedication() {
    if (!this.selectedMedications.map(m => m.medicationId).includes(this.selectedMedication.medicationId)) {
      this.selectedMedications.push(this.selectedMedication);
      this.hasAnythingChanged = true;
      this.selectedMedication = null;
      this.medicationDosages = [];
      this.form.reset();
    } else alert("Medication Already Added !");
  }

  removeMedication(i: number) {
    this.selectedMedications.splice(i, 1);
    this.hasAnythingChanged = true;
  }

  emitMedicationUpdateEvent() {
    let apptMedications = {
      'appointmentId': this.appointmentId,
      'medicationIds': this.selectedMedications.map(m => m.medicationId)
    };
    this.medicationService.addMedicationByAptId(apptMedications).subscribe(res => {
      if (res) {
        this.updateEvent.emit();
        this.snackbar.open("Changes Succesfully Saved !", "", {duration: 3000});
        this.hasAnythingChanged = false;
      } else alert(res);
    });
  }

}
