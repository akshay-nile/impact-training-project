import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Appointment } from 'src/app/models/Appointment';
import { Demographic } from 'src/app/models/Demographic';
import { Nominee } from 'src/app/models/Nominee';
import { Patient } from 'src/app/models/Patient';
import { Vitals } from 'src/app/models/Vitals';
import { AppointmentService } from 'src/app/services/appointment.service';
import { UtilityService } from 'src/app/services/utility.service';
import { VitalService } from 'src/app/services/vital.service';

@Component({
  selector: 'app-visit-details',
  templateUrl: './visit-details.component.html',
  styleUrls: ['./visit-details.component.css']
})
export class VisitDetailsComponent implements OnInit {
  vitalDetailsForm!: FormGroup;
  appointmentForm!: FormGroup;
  patientDetailsForm!: FormGroup;
  appointment = new Appointment();
  demographics = new Demographic();
  nominee = new Nominee();
  physicians: string[];
  time: string[] = ['9-11', '11-1', '2-4', '4-6'];
  patientEmails: string[];
  date: string;
  vitalId: number;
  result = new Vitals();
  aptId: number;
  email: string;
  patientId: number;
  user: any;
  timeSlots: string[];
  next3months: string;
  errorMessage: string;
  patient = new Patient();
  constructor(private snackbar: MatSnackBar,
    private datePipe: DatePipe,
    private utilityService: UtilityService,
    private vitalService: VitalService,
    private appointmentService: AppointmentService,
    private dialogRef: MatDialogRef<VisitDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder) {
    this.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    let currentdate = new Date();
    this.next3months = this.datePipe.transform(new Date(currentdate.setMonth(currentdate.getMonth() + 3)), 'yyyy-MM-dd');
    this.aptId = data.appointmentId;
    this.email = data.emailId;
    this.user = data.user;

    this.appointmentForm = formBuilder.group(
      {
        id: ['', [Validators.required]],
        aptDate: ['', [Validators.required]],
        meetingTitle: ['', [Validators.required]],
        description: ['', [Validators.required]],
        physician: ['', [Validators.required]],
        empId: ['', [Validators.required]],
        patientEmail: ['', [Validators.required]],
        editHistory: ['', [Validators.required]],
        time: ['', [Validators.required]]
      }
    )

    this.vitalDetailsForm = formBuilder.group(
      {
        vitalId: ['', [Validators.required]],
        height: ['', [Validators.required]],
        weight: ['', [Validators.required, Validators.pattern("^[0-9]*\.[0-9][0-9]$")]],
        bloodPressure: ['', [Validators.required]],
        bodyTemperature: ['', [Validators.required]],
        respirationRate: ['', [Validators.required]],
        patientId: ['', [Validators.required]]
      }
    )

    this.patientDetailsForm = formBuilder.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required]],
        dob: ['', [Validators.required]],
        phone: ['', [Validators.required]],
        age: ['', [Validators.required]],
        gender: ['', [Validators.required]],
        race: ['', [Validators.required]],
        ethnicity: ['', [Validators.required]],
        language: ['', [Validators.required]],
        address: ['', [Validators.required]],
        nomineeFirstName: ['', [Validators.required]],
        nomineeLastName: ['', [Validators.required]],
        nomineeEmail: ['', [Validators.required]],
        nomineePhone: ['', [Validators.required]],
        relation: ['', [Validators.required]],
        nomineeAddress: ['', [Validators.required]]
      }
    )
  }

  ngOnInit(): void {
    this.getPatientByEmail();
    this.getAllPatientEmail();
    this.getAllPhysicianNames();
    this.getAppointmentDetails();
  }
  getPatientByPatientId(id: number) {
    this.utilityService.getPatientByPatientId(id).subscribe((result) => {
      this.patient = result;
      this.demographics = result.demographics;
      this.nominee = result.nominee;
    })
  }
  getAllPatientEmail() {
    this.utilityService.getAllPatientEmail().subscribe((result) => {
      this.patientEmails = result;
    });
  }
  getPatientByEmail() {
    this.utilityService.getPatientByEmail(this.email).subscribe((result) => {
      this.patientId = result;
      this.getVitalByAptId();
      this.getPatientByPatientId(this.patientId);
    })
  }


  getAllPhysicianNames() {
    this.utilityService.getAllPhysicianNames().subscribe((result) => {
      this.physicians = result;
    });
  }

  getVitalByAptId() {
    this.vitalService.getVitalByPatientId(this.aptId).subscribe((result) => {
      if (result != null) {
        this.result = result;
      }
    });
  }
  getPhysicianEmployeeId() {
    this.utilityService.getEmpIdByEmail(this.appointmentForm.value.physician).subscribe(
      (result) => {
        this.appointment.empId = result;

      }
    );
  }

  getAppointmentDetails() {
    this.appointmentService.getAppointmentDetails(this.aptId).subscribe((result) => {
      if (result != null) {
        this.appointment = result;
      }
    });
  }
  getAvailableTimeSlots() {
    if (this.appointmentForm.value.aptDate == null || !this.appointmentForm.value.aptDate) {
      this.appointmentForm.value.aptDate = this.date;
    }
    this.appointmentService.
      getAvailableTimeSlots(this.appointmentForm.value.physician, this.appointmentForm.value.aptDate).subscribe(
        (result) => {
          this.timeSlots = result;
        });
  }
  editAppointment() {
    this.appointmentForm.value.editHistory = "Edited by Nurse with Employee Id " + this.user + " on " + this.date;
    this.appointmentForm.value.aptId = this.aptId;
    this.appointmentService.updateAppointmentDetails(this.appointmentForm.value).
      subscribe();
    this.dialogRef.close();
    this.snackbar.open("Appointment is successfully updated", "", { duration: 3000 });

  }
  deleteAppointment() {
    this.vitalDetailsForm.value.aptId = this.aptId;
    this.appointmentService.deleteAppointmentDetails(this.vitalDetailsForm.value.aptId).subscribe();
    this.dialogRef.close();
    this.snackbar.open("Appointment is canceled", "", { duration: 3000 });
  }


  editPatientDetails() {
    this.patient.demographics = this.demographics;
    this.patient.nominee = this.nominee;
    this.utilityService.updatePatientDetails(this.patient).subscribe((result) => {
      this.getAppointmentDetails();
    });
    this.dialogRef.close();
    this.snackbar.open("Patient details are successfully updated", "", { duration: 3000 });
  }
  close() {
    this.dialogRef.close();
  }

  saveVitalSigns() {
    this.vitalDetailsForm.value.patientId = this.result.patientId;
    this.vitalService.addVitals(this.vitalDetailsForm.value).subscribe((result) => {
    });
    this.dialogRef.close();
    this.snackbar.open("Vital Signs are saved", "", { duration: 3000 });
  }

  editVitalSigns() {
    this.vitalDetailsForm.value.vitalId = this.result.vitalId;
    this.vitalDetailsForm.value.patientId = this.patientId;
    this.vitalDetailsForm.value.aptId = this.aptId;
    this.vitalService.updateVitals(this.vitalDetailsForm.value).subscribe((result) => {
    });
    this.dialogRef.close();
    this.snackbar.open("Vital Signs are saved", "", { duration: 3000 });
  }

  deleteVitalDetails() {
    this.vitalService.deleteVitals(this.result.vitalId).subscribe((result) => {
    });
    this.dialogRef.close();
    this.snackbar.open("Vital Signs are deleted", "", { duration: 3000 });
  }
  validateHeight() {
    if (this.vitalDetailsForm.value.height > 250) {
      this.errorMessage = "Height cannot be more than 250 cm"
    }
  }
}
