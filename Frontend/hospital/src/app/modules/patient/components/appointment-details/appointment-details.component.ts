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
import { indexValidator } from 'src/app/validators/select-field.validator';
import { noSpaceValidator } from 'src/app/validators/text-field.validator';

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.css']
})
export class AppointmentDetailsComponent implements OnInit {
  appointmentForm!: FormGroup;
  appointment = new Appointment();
  demographics = new Demographic();
  nominee = new Nominee();
  patientEmails: string[];
  date: string;
  vitalId: number;
  result = new Vitals();
  aptId: number;
  email: string;
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
  pId: number;
  constructor(private snackbar: MatSnackBar,
    private datePipe: DatePipe,
    private utilityService: UtilityService,
    private apptService: AppointmentService,
    private dialogRef: MatDialogRef<AppointmentDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(LOCALE_ID) private locale: string,
    private formBuilder: FormBuilder) {
    this.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    let currentdate = new Date();
    this.next3months = this.datePipe.transform(new Date(currentdate.setMonth(currentdate.getMonth() + 3)), 'yyyy-MM-dd');
    this.aptId = data.appointmentId;
    this.email = data.emailId;
    this.patient = JSON.parse(sessionStorage.getItem('user'));
    this.pId = this.patient.patientId;

    this.appointmentForm = formBuilder.group(
      {
        meetingTitle: new FormControl('', [Validators.required, noSpaceValidator]),
        description: new FormControl('', [Validators.required, noSpaceValidator]),
        aptDate: new FormControl(this.today, [Validators.required]),
        physician: new FormControl('', [Validators.required]),
        employeeId: new FormControl({ value: '', disabled: true }),
        patient: new FormControl({ value: '', disabled: true }, [Validators.required]),
        patientId: new FormControl({ value: '', disabled: true }),
        window: new FormControl({ value: -1, disabled: true }, [Validators.required]),
        startsAt: new FormControl(-1, [Validators.required, indexValidator]),
        endsAt: new FormControl({ value: -1, disabled: true }, [Validators.required]),
        editHistory: new FormControl('', [Validators.required])
      }
    )
  }

  ngOnInit(): void {
    this.getAppointmentDetails();
    this.getPatientByEmail();
  }

  getAppointmentDetails() {
    this.apptService.getAppointmentDetails(this.aptId).subscribe((result) => {
      if (result != null) {
        this.appointment = result;
        this.appointmentForm.controls.editHistory.setValue(this.appointment.editHistory);
        this.getAllPhysicians(this.appointment);
        this.getAllPatientNames();
        this.getAvailabilityWindows(this.appointment);
      }
    });
  }

  getAllPhysicians(appointment: any) {
    this.utilityService.getAllPhysicians().subscribe((result) => {
      this.physicians = result;
      this.employeeId = this.physicians.find(p => p.email == appointment.physician).employeeId;
    });
  }

  getAllPatientNames() {
    this.utilityService.getAllPatientNames().subscribe((result) => {
      this.patients = result;
    });
  }

  getPhysicianEmployeeId() {
    this.utilityService.getEmpIdByEmail(this.appointmentForm.value.physician).subscribe(
      (result) => {
        this.appointment.empId = result;

      }
    );
  }

  getPatientByEmail() {
    this.utilityService.getPatientByEmail(this.email).subscribe((result) => {
      this.patient = result;
      this.patientId = this.patient.patientId;
      this.demographics = result.demographics;
      this.nominee = result.nominee;
    })
  }


  get today() {
    return formatDate(new Date(), 'yyyy-MM-dd', this.locale);
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
      if (this.windows.length > 0) this.appointmentForm.controls.window.enable();
      let times = this.appointment.time.split(' to ');
      let wi = this.windows.indexOf(this.windows.find(w => w.startTimes.includes(times[0].trim())));
      this.appointmentForm.controls.window.setValue(wi);
      this.populateTimes();
      let si = this.startTimes.indexOf(this.startTimes.find(s => s == times[0].trim()));
      this.appointmentForm.controls.startsAt.setValue(si);
      let ei = this.endTimes.indexOf(this.endTimes.find(e => e == times[1].trim()));
      this.appointmentForm.controls.endsAt.setValue(ei);
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
    form.editHistory = "Edited by Patient with PatientId = " + this.patientId + " on " + this.appointmentForm.value.aptDate;
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
    this.apptService.deleteAppointmentDetails(this.aptId).subscribe();
    this.dialogRef.close();
    this.snackbar.open("Appointment is canceled", "", { duration: 3000 });
  }

  close() {
    this.dialogRef.close();
  }
}
