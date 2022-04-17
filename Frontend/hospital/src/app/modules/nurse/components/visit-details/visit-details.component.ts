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
  time: string[] = ['9-11', '11-1', '2-4', '4-6'];
  patientEmails: string[];
  date: string;
  vitalId: number;
  result = new Vitals();
  aptId: number;
  email: string;
  userId: any;
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
  constructor(private snackbar: MatSnackBar,
    private datePipe: DatePipe,
    private utilityService: UtilityService,
    private vitalService: VitalService,
    private apptService: AppointmentService,
    private dialogRef: MatDialogRef<VisitDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(LOCALE_ID) private locale: string,
    private formBuilder: FormBuilder) {
    this.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    let currentdate = new Date();
    this.next3months = this.datePipe.transform(new Date(currentdate.setMonth(currentdate.getMonth() + 3)), 'yyyy-MM-dd');
    this.aptId = data.appointmentId;
    this.email = data.emailId;
    this.userId = JSON.parse(sessionStorage.getItem('user')).employeeId;

    this.appointmentForm = formBuilder.group(
      {
        meetingTitle: new FormControl('', [Validators.required, noSpaceValidator]),
        description: new FormControl('', [Validators.required, noSpaceValidator]),
        aptDate: new FormControl(this.today, [Validators.required]),
        physician: new FormControl('', [Validators.required]),
        employeeId: new FormControl({ value: '', disabled: true }),
        patient: new FormControl('', [Validators.required]),
        patientId: new FormControl({ value: '', disabled: true }),
        window: new FormControl({ value: -1, disabled: true }, [Validators.required]),
        startsAt: new FormControl(-1, [Validators.required, indexValidator]),
        endsAt: new FormControl({ value: -1, disabled: true }, [Validators.required]),
        editHistory: new FormControl('', [Validators.required])
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

  get today() {
    return formatDate(new Date(), 'yyyy-MM-dd', this.locale);
  }

  ngOnInit(): void {
    this.getPatientByEmail();
    this.getAppointmentDetails();
  }

  getAppointmentDetails() {
    this.apptService.getAppointmentDetails(this.aptId).subscribe((result) => {
      if (result != null) {
        this.appointment = result;
        this.appointmentForm.controls.editHistory.setValue(this.appointment.editHistory);
        this.getAllPhysicianNames(this.appointment);
        this.getAllPatientNames();
        this.getAvailabilityWindows(this.appointment);
      }
    });
  }

  getAllPatientNames() {
    this.utilityService.getAllPatientNames().subscribe((result) => {
      this.patients = result;
    });
  }

  getAllPhysicianNames(appointment: any) {
    this.utilityService.getAllPhysicians().subscribe((result) => {
      this.physicians = result;
      this.employeeId = this.physicians.find(p => p.email == appointment.physician).employeeId;
    });
  }

  getPatientByEmail() {
    this.utilityService.getPatientByEmail(this.email).subscribe((result) => {
      this.patient = result;
      this.patientId = this.patient.patientId;
      this.demographics = result.demographics;
      this.nominee = result.nominee;
      this.getVitalByAptId();
    })
  }

  getVitalByAptId() {
    this.vitalService.getVitalByApptId(this.aptId).subscribe((result) => {
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


  getAvailabilityWindows(apt?: any) {
    let form = apt || this.appointmentForm.value;
    if (form.physician === '' || this.appointmentForm.value.patientEmail === '') {
      this.windows = [];
      this.appointmentForm.controls.window.disable();
      return;
    }
    const params = {
      aptDate: form.aptDate,
      physician: form.physician,
      patientEmail: form.patientEmail,
      skip: this.aptId
    };
    this.apptService.getAvailabilityWindows(params).subscribe(res => {
      this.windows = res;
      if (this.windows.length > 0) { this.appointmentForm.controls.window.enable(); }
      let times = this.appointment.time.split(' to ');
      
      let wi = this.windows.indexOf(this.windows.find(w => w.startTimes.includes(times[0].trim())));
      this.appointmentForm.controls.window.setValue(wi);
      
      let si = this.startTimes.indexOf(this.startTimes.find(s => s == times[0].trim()));
      this.appointmentForm.controls.startsAt.setValue(si);
      this.populateTimes();
      
      let ei = this.endTimes.indexOf(this.endTimes.find(e => e == times[1].trim()));
      this.appointmentForm.controls.endsAt.setValue(ei);
      this.appointmentForm.controls.endsAt.enable();
      console.log(wi, si, ei);
    });
  }

  showPhysicianId() {
    if (this.appointmentForm.value.physician == '') {
      this.employeeId = '';
    } else {
      this.employeeId = this.physicians.find(ph => ph.email === this.appointmentForm.value.physician).employeeId;
    }
  }

  showPatientId() {
    if (this.appointmentForm.value.patient == '') {
      this.patientId = '';
    } else {
      this.patientId = this.patients.find(p => p.email === this.appointmentForm.value.patient).patientId;
    }
  }

  populateTimes() {
    let i = this.appointmentForm.controls.window.value;
    if (i >= 0) {
      this.startTimes = this.windows[i].startTimes;
      this.endTimes = this.windows[i].endTimes;
    } else {
      this.startTimes = [];
      this.endTimes = [];
    }
  }

  updateEndTimes() {
    let windowIndex = this.appointmentForm.controls.window.value;
    let startIndex = this.appointmentForm.controls.startsAt.value;
    if (windowIndex >= 0 && startIndex >= 0) {
      this.appointmentForm.controls.endsAt.enable();
      this.endTimes = this.windows[windowIndex].endTimes.slice(startIndex);
      this.appointmentForm.controls.endsAt.setValue(0);
    } else {
      this.endTimes = [];
      this.appointmentForm.controls.endsAt.setValue(-1);
      this.appointmentForm.controls.endsAt.disable();
    }
  }

  editAppointment() {
    const form = this.appointmentForm.getRawValue();
    form.editHistory = "Edited by Nurse with EmployeeId = " + this.userId + " on " + this.appointmentForm.value.aptDate;
    let appointment = {};
    for (let control of 'meetingTitle description physician aptDate editHistory'.split(' ')) {
      appointment[control] = form[control];
    }
    appointment['empId'] = +this.employeeId.replace('E', '');
    appointment['patientName'] = this.patients.find(p => p.email === form.patient).name;
    appointment['patientEmail'] = form['patient'];
    appointment['time'] = this.startTimes[form['startsAt']] + ' to ' + this.endTimes[form['endsAt']];
    appointment['aptId'] = this.aptId;
    this.apptService.updateAppointmentDetails(appointment).subscribe((result) => {
      this.snackbar.open("Appointment Successfully Booked !", "", { duration: 3000 });
      this.dialogRef.close();
    });
    this.snackbar.open("Appointment is successfully updated", "", { duration: 3000 });
  }


  deleteAppointment() {
    this.vitalDetailsForm.value.aptId = this.aptId;
    this.apptService.deleteAppointmentDetails(this.vitalDetailsForm.value.aptId).subscribe();
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
