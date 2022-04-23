import { DatePipe, formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppointmentService } from 'src/app/services/appointment.service';
import { indexValidator } from 'src/app/validators/select-field.validator';
import { noSpaceValidator } from 'src/app/validators/text-field.validator';

@Component({
  selector: 'app-appointment-dialog',
  templateUrl: './appointment-dialog.component.html',
  styleUrls: ['./appointment-dialog.component.css']
})
export class AppointmentDialogComponent implements OnInit {
  appointmentForm!: FormGroup;
  patientName: string;

  date: string;
  next3months: string;

  windows = [];
  startTimes = [];
  endTimes = [];

  constructor(private snackbar: MatSnackBar,
    private datePipe: DatePipe,
    private apptService: AppointmentService,
    private dialogRef: MatDialogRef<AppointmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(LOCALE_ID) private locale: string,
    private formBuilder: FormBuilder
  ) {
    this.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    let currentdate = new Date();
    this.next3months = this.datePipe.transform(new Date(currentdate.setMonth(currentdate.getMonth() + 3)), 'yyyy-MM-dd');

    this.patientName = this.data.user.title + '. ' + this.data.user.firstName + ' ' + this.data.user.lastName;

    this.appointmentForm = this.formBuilder.group({
      meetingTitle: ['', [Validators.required, noSpaceValidator]],
      description: ['', [Validators.required, noSpaceValidator]],
      aptDate: [this.date, [Validators.required]],
      physician: ['', [Validators.required]],
      employeeId: [{ value: '', disabled: true }],
      patient: [{ value: data.user.patientId, disabled: true }],
      patientId: [{ value: data.user.patientId, disabled: true }],
      window: [{ value: -1, disabled: true }, [Validators.required, indexValidator]],
      startsAt: [-1, [Validators.required, indexValidator]],
      endsAt: [{ value: -1, disabled: true }, [Validators.required, indexValidator]],
      editHistory: ['Not Applicable']
    });
  }

  get today() {
    return formatDate(new Date(), 'yyyy-MM-dd', this.locale);
  }

  ngOnInit(): void {
    this.getAvailabilityWindows();
  }

  f(field: string) {
    return this.appointmentForm.controls[field];
  }

  getAvailabilityWindows() {
    let form = this.appointmentForm.getRawValue();
    const params = {
      date: form.aptDate,
      employeeId: form.physician,
      patientId: this.data.user.patientId
    };
    if (params.employeeId === '') {
      this.windows = []
      this.appointmentForm.controls.window.setValue(-1);
      this.appointmentForm.controls.window.disable();
    } else {
      this.apptService.getAvailabilityWindows(params).subscribe(res => {
        this.appointmentForm.controls.window.enable();
        this.windows = res;
      });
    }
    this.populateTimes();
  }

  showPhysicianId() {
    this.appointmentForm.controls['employeeId'].setValue(this.appointmentForm.value.physician);
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

  private getAppointmentReady(): any {
    const form = this.appointmentForm.getRawValue();
    let appointment = {
      time: this.startTimes[form['startsAt']] + ' to ' + this.endTimes[form['endsAt']]
    };
    for (let field of 'title=meetingTitle patientId=patientId description=description employeeId=physician date=aptDate editedBy=patientId'.split(' ')) {
      let fields = field.split('=');
      appointment[fields[0]] = form[fields[1]];
    }
    return appointment;
  }

  bookAppointment() {
    let appointment = this.getAppointmentReady();
    appointment['editHistory'] = "Requested by " + this.patientName + " (Patient) on " + this.appointmentForm.getRawValue().aptDate;
    appointment['status'] = 'PENDING';
    this.apptService.addAppointment(appointment).subscribe(result => {
      this.snackbar.open("Appointment Successfully Requested !", "", { duration: 3000 });
      this.dialogRef.close();
    });
  }

  close() {
    this.dialogRef.close();
  }
}
