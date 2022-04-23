
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilityService } from 'src/app/services/utility.service';
import { VitalService } from 'src/app/services/vital.service';

@Component({
  selector: 'app-patient-details-dialog',
  templateUrl: './patient-details-dialog.component.html',
  styleUrls: ['./patient-details-dialog.component.css']
})
export class PatientDetailsDialogComponent {

  vitalDetailsForm!: FormGroup;
  patientDetailsForm: FormGroup = new FormGroup({});

  isVitalDetailsAvailable = false;
  allergies = [];

  constructor(
    private utilityService: UtilityService,
    private vitalService: VitalService,
    private dialogRef: MatDialogRef<PatientDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
    this.patientDetailsForm = this.formBuilder.group({
      title: [''],
      firstName: [''],
      lastName: [''],
      email: [''],
      phone: [''],
      birthdate: [''],
      age: [''],
      gender: [''],
      race: [''],
      ethnicity: [''],
      language: [''],
      address: ['']
    });

    this.vitalDetailsForm = this.formBuilder.group({
      height: [''],
      weight: [''],
      bloodPressure: [''],
      bodyTemperature: [''],
      respirationRate: ['']
    });

    this.utilityService.getPatientById(this.data.appointment.patientId).subscribe(res => {
      for (let field of 'title firstName lastName email phone birthdate'.split(' ')) {
        this.pf(field).setValue(res[field]);
      }
      for (let field of 'age gender race ethnicity language'.split(' ')) {
        this.pf(field).setValue(res.demographics[field]);
      }
      this.pf('address').setValue(res.demographics.address.replaceAll('$$', '\n'));
      this.patientDetailsForm.disable();
      
      this.allergies = res.allergies.map(allergy => {
        let words = allergy.split(',')
        return { allergyType: words[0], allergyName: words[1], isFatal: JSON.parse(words[2]) };
      });
    });

    this.vitalService.getVitalByApptId(this.data.appointment.appointmentId).subscribe(res => {
      if (res) {
        for (let field of 'height weight bloodPressure bodyTemperature respirationRate'.split(' ')) {
          this.vf(field).setValue(res[field]);
        }
      } else this.isVitalDetailsAvailable = true;
      this.vitalDetailsForm.disable();
    });

  }

  vf(field: string) {
    return this.vitalDetailsForm.controls[field];
  }

  pf(field: string) {
    return this.patientDetailsForm.controls[field];
  }

  close() {
    this.dialogRef.close();
  }

}
