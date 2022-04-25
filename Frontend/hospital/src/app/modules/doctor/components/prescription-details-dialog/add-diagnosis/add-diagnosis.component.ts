import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DiagnosisService } from 'src/app/services/diagnosis.service';
import { PrescriptionDetailsDialogComponent } from '../prescription-details-dialog.component';

@Component({
  selector: 'add-diagnosis',
  templateUrl: './add-diagnosis.component.html',
  styleUrls: ['./add-diagnosis.component.css']
})
export class AddDiagnosisComponent implements OnInit {

  @Input() appointmentId: number;
  @Output('update') updateEvent = new EventEmitter<void>();

  form!: FormGroup;

  diagnosisData = [];
  selectedDiagnosis = [];

  hasAnythingChanged = false;

  constructor(
    public dialogRef: MatDialogRef<PrescriptionDetailsDialogComponent>,
    private diagnosisService: DiagnosisService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({ diagnosis: [-1] });
  }

  ngOnInit(): void {
    this.diagnosisService.getAllDiagnosis().subscribe(res => this.diagnosisData = res);
    this.diagnosisService.getDiagnosisByAptId(this.appointmentId).subscribe(res => this.selectedDiagnosis = res);
  }

  addSelectedDiagnosis(diagnosisId: any) {
    let diagnosis = this.diagnosisData.find(d => d.diagnosisId === diagnosisId)
    if(!this.selectedDiagnosis.map(d => d.diagnosisId).includes(diagnosisId)) {
      this.selectedDiagnosis.push(diagnosis);
      this.form.controls.diagnosis.setValue(-1);
      this.hasAnythingChanged = true;
    } else alert("Diagnosis Already Added !");
  }

  removeDiagnosis(i: number) {
    this.selectedDiagnosis.splice(i, 1);
    this.hasAnythingChanged = true;
  }
 
  emitDiagnosisUpdateEvent() {
    let apptDiagnosis = {
      'appointmentId': this.appointmentId,
      'diagnosisIds': this.selectedDiagnosis.map(d => d.diagnosisId)
    };
    this.diagnosisService.addDiagnosisByAptId(apptDiagnosis).subscribe(res => {
      if(res) {
        this.updateEvent.emit();
        alert("Changes Succesfully Saved !");
        this.hasAnythingChanged = false;
      } else alert(res);
    });
  }

}
