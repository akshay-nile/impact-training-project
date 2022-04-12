import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Appointment } from '../models/Appointment';
import { Diagnosis } from '../models/Diagnosis';
import { Medication } from '../models/Medication';
import { Procedure } from '../models/Procedure';
import { Vitals } from '../models/Vitals';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-visit-details',
  templateUrl: './visit-details.component.html',
  styleUrls: ['./visit-details.component.css']
})
export class VisitDetailsComponent implements OnInit {
  vitalDetailsForm!: FormGroup;
  appointmentForm!: FormGroup;
  // adding form 
  prescriptionForm!: FormGroup;
  medications:any[];
  medicationNames:string[];
  medicationDosages: string[];
  medicationDescriptions: string[];
  procedures:any[];
  procedureNames:string[];
  procedureDescriptions:string[];
  diagnosis: any[];
  diagnosisTitles :string[];
  prescriptions: any[];
  medicationObj = new Medication();
  diagnosisObj = new Diagnosis();
  procedureObj = new Procedure();

  appointment = new Appointment();
  showInformation: boolean;
  showVitalSigns: boolean;
  physicians: string[];
  time: string[] = ['9-11', '11-1', '2-4', '4-6'];
  patientEmails: string[];

  date: string;
  vitalId: number;
  result = new Vitals();
  aptId: number;
  email: string;
  patientId:number;
  constructor(private datePipe: DatePipe, public utilityService: UtilityService, public dialogRef: MatDialogRef<VisitDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder) {
    this.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.aptId = data.appointmentId;
    this.email = data.emailId;
    console.log(this.email);

    this.appointmentForm = formBuilder.group(
      {
        id: ['', [Validators.required]],
        date: [this.date, [Validators.required]],
        meetingTitle: ['', [Validators.required]],
        description: ['', [Validators.required]],
        physician: ['', [Validators.required]],
        patientEmail: ['', [Validators.required]],
        editHistory: ['', [Validators.required]],
        time: ['', [Validators.required]]
      }
    )

    this.vitalDetailsForm = formBuilder.group(
      {
        vitalId: ['', [Validators.required]],
        height: ['', [Validators.required]],
        weight: ['', [Validators.required]],
        bloodPressure: ['', [Validators.required]],
        bodyTemperature: ['', [Validators.required]],
        respirationRate: ['', [Validators.required]],
        patientId: ['', [Validators.required]]
      })

      this.prescriptionForm = formBuilder.group(
        {
          prescriptionId: ['', [Validators.required]],
          medicationName: ['', [Validators.required]],
          dosage: ['', [Validators.required]],
          medicationDescription: ['', [Validators.required]],
          medicationId: ['', [Validators.required]],
          title: ['', [Validators.required]],
          diagnosisId: ['', [Validators.required]],
          procedureName: ['', [Validators.required]],
          procedureDescription: ['', [Validators.required]],
          procedureId: ['', [Validators.required]],
        })
  }

  ngOnInit(): void {
    this.getPatientByEmail();
    this.getAllPatientEmail();
    this.getAllPhysicianNames();
    // this.getVitalByPatientId(); adding doctor module
    this.getAppointmentDetails();
    this.getMedicationDetails();
    this.getProcedureDetails();
    this.getDiagnosisDetails();
    this.getPrescriptionDetails();

  }

  getAllPatientEmail() {
    this.utilityService.getAllPatientEmail().subscribe((result) => {
      this.patientEmails = result;
    });
  }
  getPatientByEmail(){
    this.utilityService.getPatientByEmail(this.email).subscribe((result) => {
      console.log("HELLO1" + result);
  
      this.patientId = result;
      console.log(this.patientId);
      this.getVitalByAptId();
      
    })
  }
  

getAllPhysicianNames() {
  this.utilityService.getAllPhysicianNames().subscribe((result) => {
    this.physicians = result;
  });
}

getVitalByAptId() {
  console.log(this.aptId);
  this.utilityService.getVitalByPatientId(this.aptId).subscribe((result) => {
    console.log(result);
    
    if (result != null) {
      this.result = result;
    }
  });
}

getAppointmentDetails() {
  this.utilityService.getAppointmentDetails(this.aptId).subscribe((result) => {
    if (result != null) {
      this.appointment = result;
    }
  });
}
// adding doctor module
getMedicationDetails() {
  this.utilityService.getMedicationDetails().subscribe((result) => {
    if (result != null) {
      this.medications = result;
      this.medications.forEach(m=> {
        this.medicationNames.push(m.medicationName);
        this.medicationDosages.push(m.dosage);
        this.medicationDescriptions.push(m.medicationDescription);
      })
    }
  });
}

getProcedureDetails() {
  this.utilityService.getProcedureDetails().subscribe((result) => {
    if (result != null) {
      this.procedures = result;
      this.procedures.forEach(p=>{
        this.procedureNames.push(p.procedureName);
        this.procedureDescriptions.push(p.procedureDescription);
      })
    }
  });
}

getDiagnosisDetails() {
  this.utilityService.getDiagnosisDetails().subscribe((result) => {
    if (result != null) {
      this.diagnosis = result;
      this.diagnosis.forEach(d=>{this.diagnosisTitles.push(d.title);});
    }
  });
}

getPrescriptionDetails(){
  this.utilityService.getPrescriptionDetails().subscribe((result) => {
    if (result != null) {
      this.prescriptions = result;
    }
  });
}

// savePrescription() {
//   this.prescriptionForm.value.aptId = this.result.aptId;
//   this.utilityService.addVitals(this.vitalDetailsForm.value).subscribe((result) => {
//     console.log(result);
//   });
//   this.dialogRef.close();
// }

editAppointment() {
  this.appointmentForm.value.aptId = this.aptId;
  this.utilityService.updateAppointmentDetails(this.appointmentForm.value).
    subscribe();
  this.dialogRef.close();

}
deleteAppointment() {
  this.vitalDetailsForm.value.aptId = this.aptId;
  this.utilityService.deleteAppointmentDetails(this.vitalDetailsForm.value.aptId).subscribe();
  this.dialogRef.close();
}

deletePatientDetails(aptId: number) {

}
close() {
  this.dialogRef.close();
}
showPatientInformation() {
  this.showInformation = !this.showInformation;
}
hidePatientInformation() {
  this.showInformation = !this.showInformation;
}
addVitalSigns() {
  this.showVitalSigns = !this.showVitalSigns;
}

saveVitalSigns() {
  this.vitalDetailsForm.value.patientId = this.result.patientId;
  this.utilityService.addVitals(this.vitalDetailsForm.value).subscribe((result) => {
    console.log(result);
  });
  this.dialogRef.close();
}

editVitalSigns() {
  this.vitalDetailsForm.value.vitalId = this.result.vitalId;
  this.vitalDetailsForm.value.patientId = this.patientId;
  this.vitalDetailsForm.value.aptId = this.aptId;
  console.log("PATIENT ID" + this.vitalDetailsForm.value.aptId)
  this.utilityService.updateVitals(this.vitalDetailsForm.value).subscribe((result) => {
    console.log(result);
  });
  this.dialogRef.close();

}

deleteVitalDetails() {
  this.utilityService.deleteVitals(this.result.vitalId).subscribe((result) => {
    console.log(result);
  });
  this.dialogRef.close();
}
}
