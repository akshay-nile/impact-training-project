import { DatePipe, formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
import { indexValidator } from 'src/app/validators/select-field.validator';
import { noSpaceValidator } from 'src/app/validators/text-field.validator';

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
  patientEmails: string[];
  date: string;
  vitalId: number;
  result = new Vitals();
  aptId: number;
  email: string;
  user: any;
  timeSlots: string[];
  next3months: string;
  errorMessage: string;
  patient = new Patient();
  physicians = [];
  patients = [];
  windows = [];
  startTimes = [];
  endTimes = [];
  employeeId = '';
  patientId: any;

  cancelMode = false;
  nurseName: string;

  constructor(
    private snackbar: MatSnackBar,
    private datePipe: DatePipe,
    private utilityService: UtilityService,
    private vitalService: VitalService,
    private apptService: AppointmentService,
    private dialogRef: MatDialogRef<VisitDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(LOCALE_ID) private locale: string,
    private formBuilder: FormBuilder
  ) {
    this.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    let currentdate = new Date();
    this.next3months = this.datePipe.transform(new Date(currentdate.setMonth(currentdate.getMonth() + 3)), 'yyyy-MM-dd');
    this.aptId = data.appointmentId;
    this.email = data.emailId;

    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.nurseName = this.user.title + '. ' + this.user.firstName + ' ' + this.user.lastName;

    this.vitalDetailsForm = this.formBuilder.group(
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

    this.patientDetailsForm = this.formBuilder.group(
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
        // address: ['', [Validators.required]],
        nomineeFirstName: ['', [Validators.required]],
        nomineeLastName: ['', [Validators.required]],
        nomineeEmail: ['', [Validators.required]],
        nomineePhone: ['', [Validators.required]],
        relation: ['', [Validators.required]],
        // nomineeAddress: ['', [Validators.required]]
      }
    )
  }

  get today() {
    return formatDate(new Date(), 'yyyy-MM-dd', this.locale);
  }

  ngOnInit(): void {
    this.getPatientByEmail();
  }

  f(field: string) {
    return this.appointmentForm.controls[field];
  }

  getPatientByEmail() {
    this.utilityService.getPatientById(this.data.appointment.patientId).subscribe((result) => {
      this.patient = result;
      this.patientId = this.patient.patientId;
      this.demographics = result.demographics;
      this.nominee = result.nominee;
      this.getVitalByAptId();
    })
  }

  getVitalByAptId() {
    this.vitalService.getVitalByApptId(this.data.appointment.appointmentId).subscribe((result) => {
      if (result != null) {
        this.result = result;
      }
    });
  }

  // -------------------------------------------------------------------------

  editPatientDetails() {
    this.patient.demographics = this.demographics;
    this.patient.nominee = this.nominee;
    this.utilityService.updatePatientDetails(this.patient).subscribe((result) => {
      // this.getAppointments();
      this.snackbar.open("Patient Details Successfully Updated !", "", { duration: 3000 });
      this.dialogRef.close();
    });
  }

  close() {
    this.dialogRef.close();
  }

  editVitalSigns() {
    this.vitalDetailsForm.value.vitalId = this.result.vitalId;
    this.vitalDetailsForm.value.patientId = this.data.appointment.patientId;
    this.vitalDetailsForm.value.aptId = this.data.appointment.appointmentId;
    console.log(this.vitalDetailsForm.value);
    this.vitalService.updateVitals(this.vitalDetailsForm.value).subscribe((result) => {
      this.data.appointment.status = "ATTENDED";
      this.apptService.updateAppointment(this.data.appointment).subscribe(res => {
        this.data.appointment = res;
      });
      this.snackbar.open("Vital Signs Successfully Saved !", "", { duration: 3000 });
      this.dialogRef.close();
    });
  }

  deleteVitalDetails() {
    this.vitalService.deleteVitals(this.result.vitalId).subscribe((result) => {
      this.snackbar.open("Vital Signs Deleted", "", { duration: 3000 });
      this.dialogRef.close();
    });
  }


  validateHeight() {
    if (this.vitalDetailsForm.value.height > 250) {
      this.errorMessage = "Height cannot be more than 250 cm"
    }
  }
}
