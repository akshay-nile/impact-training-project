import { DatePipe, formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppointmentService } from 'src/app/services/appointment.service';
import { UtilityService } from 'src/app/services/utility.service';
import { indexValidator } from 'src/app/validators/select-field.validator';
import { noSpaceValidator } from 'src/app/validators/text-field.validator';


@Component({
  selector: 'app-data-collection-appointment',
  templateUrl: './data-collection-appointment.component.html',
  styleUrls: ['./data-collection-appointment.component.css']
})
export class DataCollectionAppointmentComponent implements OnInit {

  form!: FormGroup;
  physicians = [];
  patients = [];
  windows = [];
  startTimes = [];
  endTimes = [];
  employeeId = '';
  patientId = '';
  next3months: string;
  patient: any;
  isMeetingTitleSelected = true;
  meetingTitle = [];
  constructor(
    private snackbar: MatSnackBar,
    private utilityService: UtilityService,
    private dialogRef: MatDialogRef<DataCollectionAppointmentComponent>,
    private datePipe: DatePipe,
    private apptService: AppointmentService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(LOCALE_ID) private locale: string,
  ) {
    this.patient = JSON.parse(sessionStorage.getItem('user'));
    this.patientId = this.patient.patientId;
    let currentdate = new Date();
    this.next3months = this.datePipe.transform(new Date(currentdate.setMonth(currentdate.getMonth() + 3)), 'yyyy-MM-dd');
  }

  get today() {
    return formatDate(new Date(), 'yyyy-MM-dd', this.locale);
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      meetingTitle: new FormControl('', [Validators.required, noSpaceValidator]),
      description: new FormControl('', [Validators.required, noSpaceValidator]),
      aptDate: new FormControl(this.today, [Validators.required]),
      physician: new FormControl('', [Validators.required]),
      employeeId: new FormControl({ value: '', disabled: true }),
      patient: new FormControl({ value: this.patient.email, disabled: true }, [Validators.required]),
      patientId: new FormControl({ value: this.patientId, disabled: true }),
      window: new FormControl({ value: -1, disabled: true }, [Validators.required]),
      startsAt: new FormControl(-1, [Validators.required, indexValidator]),
      endsAt: new FormControl({ value: -1, disabled: true }, [Validators.required])
    });
    this.getAllPatientNames();
    this.getAllPhysicians();
    this.getMeetingTitle(this.patient.email);
  }

  getAllPatientNames() {
    this.utilityService.getAllPatientNames().subscribe((result) => {
      this.patients = result;
    });
  }

  getAllPhysicians() {
    this.utilityService.getAllPhysicians().subscribe((result) => {
      this.physicians = result;
    });
  }

  getMeetingTitle(email:string) {
    this.apptService.getMeetingTitle(email).subscribe((result) => {
      this.meetingTitle = result;
    });
  }
  meetingTitleSelected() {
    this.isMeetingTitleSelected = !this.meetingTitleSelected;
  }

  showPhysicianId() {
    if (this.form.value.physician == '') {
      this.employeeId = '';
    } else {
      this.employeeId = this.physicians.find(ph => ph.email === this.form.value.physician).employeeId;
    }
  }

  bookAppointment() {
    const form = this.form.getRawValue();
    form.editHistory = "Edited by Patient with Id = " + this.patientId + " on " + this.form.value.aptDate;
    let appointment = {};
    for (let control of 'meetingTitle description physician aptDate editHistory'.split(' ')) {
      appointment[control] = form[control];
    }
    appointment['empId'] = +this.employeeId.replace('E', '');
    appointment['patientName'] = this.patients.find(p => p.email === form.patient).name;
    appointment['patientEmail'] = form['patient'];
    appointment['time'] = this.startTimes[form['startsAt']] + ' to ' + this.endTimes[form['endsAt']];
    appointment['isDataCollectionAppt'] = true;
    this.apptService.addAppointmentDetails(appointment).subscribe((result) => {
      this.snackbar.open("Appointment Successfully Booked !", "", { duration: 3000 });
      this.dialogRef.close();
    });
  }

  getAvailabilityWindows() {
    let form = this.form.value;
    if (form.physician === '' || form.patient === '') {
      this.windows = [];
      this.form.controls.window.disable();
      return;
    }
    const params = {
      aptDate: form.aptDate,
      physician: form.physician,
      patientEmail: form.patient
    };
    this.apptService.getAvailabilityWindows(params).subscribe(res => {
      this.windows = res;
      if (this.windows.length > 0) this.form.controls.window.enable();
      this.form.value.window = -1;
    });
  }

  populateTimes() {
    let i = this.form.controls.window.value;
    if (i >= 0) {
      this.startTimes = this.windows[i].startTimes;
      this.endTimes = this.windows[i].endTimes;
    } else {
      this.startTimes = [];
      this.endTimes = [];
    }
  }

  updateEndTimes() {
    let windowIndex = this.form.controls.window.value;
    let startIndex = this.form.controls.startsAt.value;
    if (windowIndex >= 0 && startIndex >= 0) {
      this.form.controls.endsAt.enable();
      this.endTimes = this.windows[windowIndex].endTimes.slice(startIndex);
      this.form.controls.endsAt.setValue(0);
    } else {
      this.endTimes = [];
      this.form.controls.endsAt.setValue(-1);
      this.form.controls.endsAt.disable();
    }
  }

  close() {
    this.form.reset();
    this.dialogRef.close();
  }

}
