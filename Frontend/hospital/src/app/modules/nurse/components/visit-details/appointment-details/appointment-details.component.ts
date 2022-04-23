import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit, Input, Inject, LOCALE_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppointmentService } from 'src/app/services/appointment.service';
import { indexValidator } from 'src/app/validators/select-field.validator';
import { noSpaceValidator } from 'src/app/validators/text-field.validator';

@Component({
  selector: 'appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.css']
})
export class AppointmentDetailsComponent implements OnInit {

  @Input() data: any;
  appointmentForm!: FormGroup;
  nurseName: string;

  date: string;
  next3months: string;

  windows = [];
  startTimes = [];
  endTimes = [];

  mode = '';
  editable: boolean;

  constructor(
    private snackbar: MatSnackBar,
    private datePipe: DatePipe,
    private apptService: AppointmentService,
    private dialogRef: MatDialogRef<AppointmentDetailsComponent>,
    @Inject(LOCALE_ID) private locale: string,
    private formBuilder: FormBuilder
  ) {
    this.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    let currentdate = new Date();
    this.next3months = this.datePipe.transform(new Date(currentdate.setMonth(currentdate.getMonth() + 3)), 'yyyy-MM-dd');
  }

  get today() {
    return formatDate(new Date(), 'yyyy-MM-dd', this.locale);
  }

  ngOnInit(): void {
    this.nurseName = this.data.user.title + '. ' + this.data.user.firstName + ' ' + this.data.user.lastName;
    this.editable = this.data.appointment.status !== 'PENDING';

    this.appointmentForm = this.formBuilder.group({
      meetingTitle: [{ value: this.data.appointment.title, disabled: this.editable }, [Validators.required, noSpaceValidator]],
      description: [{ value: this.data.appointment.description, disabled: this.editable }, [Validators.required, noSpaceValidator]],
      aptDate: [{ value: this.data.appointment.date, disabled: this.editable }, [Validators.required]],
      physician: [{ value: this.data.appointment.employeeId, disabled: this.editable }, [Validators.required]],
      employeeId: [{ value: this.data.appointment.employeeId, disabled: true }],
      patient: [{ value: this.data.appointment.patientId, disabled: true }],
      patientId: [{ value: this.data.appointment.patientId, disabled: true }],
      window: [{ value: -1, disabled: true }, [Validators.required, indexValidator]],
      startsAt: [{ value: -1, disabled: this.editable }, [Validators.required, indexValidator]],
      endsAt: [{ value: -1, disabled: true }, [Validators.required, indexValidator]],
      editHistory: [this.data.appointment.editHistory || 'Not Applicable']
    });

    if(!this.editable){
      this.getAvailabilityWindows(this.data.appointment);
    } else {
      let times = this.data.appointment.time.split(' to ');
      this.startTimes = [times[0]];
      this.f('startsAt').setValue(0);
      this.endTimes = [times[1]];
      this.f('endsAt').setValue(0);
    }
  }

  f(field: string) {
    return this.appointmentForm.controls[field];
  }

  showPhysicianId() {
    this.appointmentForm.controls['employeeId'].setValue(this.appointmentForm.value.physician);
  }

  getAvailabilityWindows(appointment?: any) {
    const params = {};
    if (appointment) {
      params['date'] = appointment.date;
      params['employeeId'] = appointment.employeeId;
      params['patientId'] = appointment.patientId;
      params['skip'] = appointment.appointmentId;
    } else {
      let form = this.appointmentForm.getRawValue();
      params['date'] = form.aptDate;
      params['employeeId'] = form.employeeId;
      params['patientId'] = form.patientId;
      params['skip'] = this.data.appointment.appointmentId;
    }
    if (params['employeeId'] === '' || params['patientId'] === '') {
      this.windows = []
      this.appointmentForm.controls.window.setValue(-1);
      this.appointmentForm.controls.window.disable();
      return;
    } 
    this.apptService.getAvailabilityWindows(params).subscribe(res => {
      this.windows = res;
      if (this.windows.length > 0 && !this.editable) this.appointmentForm.controls.window.enable();
      let times = this.data.appointment.time.split(' to ');
      let wi = this.windows.indexOf(this.windows.find(w => w.startTimes.includes(times[0].trim())));
      this.appointmentForm.controls.window.setValue(wi);
      this.populateTimes();
      let si = this.startTimes.indexOf(this.startTimes.find(s => s == times[0].trim()));
      this.appointmentForm.controls.startsAt.setValue(si);
      let ei = this.endTimes.indexOf(this.endTimes.find(e => e == times[1].trim()));
      this.appointmentForm.controls.endsAt.setValue(ei);
    });
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
      appointmentId: this.data.appointment.appointmentId,
      time: this.startTimes[form['startsAt']] + ' to ' + this.endTimes[form['endsAt']]
    };
    for (let field of 'title=meetingTitle patientId=patientId description=description employeeId=physician date=aptDate editedBy=patientId'.split(' ')) {
      let fields = field.split('=');
      appointment[fields[0]] = form[fields[1]];
    }
    return appointment;
  }

  acceptAppointment() {
    let appointment = this.data.appointment;
    appointment['editHistory'] = "Accepted by " + this.nurseName + " (Nurse) on " + this.appointmentForm.getRawValue().aptDate;
    appointment['status'] = 'ACCEPTED';
    this.apptService.updateAppointment(appointment).subscribe(result => {
      this.snackbar.open("Appointment Successfully Accepted !", "", { duration: 3000 });
      this.dialogRef.close();
    });
  }

  editAppointment(reason: string) {
    this.mode = '';
    if (reason == '') return;
    let appointment = this.getAppointmentReady();
    appointment['editHistory'] = "Edited by " + this.nurseName + " (Nurse) on " + this.appointmentForm.getRawValue().aptDate + " for reason '" + reason + "'";
    appointment['status'] = 'ACCEPTED';
    this.apptService.updateAppointment(appointment).subscribe(result => {
      this.snackbar.open("Appointment Successfully Updated !", "", { duration: 3000 });
      this.dialogRef.close();
    });
  }

  cancelAppointment(reason: string) {
    this.mode = '';
    if (reason == '') return;
    let appointment = this.data.appointment;
    appointment['editHistory'] = "Cancelled by " + this.nurseName + " (Nurse) on " + this.appointmentForm.getRawValue().aptDate + " for reason '" + reason + "'";
    appointment['status'] = 'CANCELLED';
    this.apptService.updateAppointment(appointment).subscribe(result => {
      this.snackbar.open("Appointment Successfully Cancelled !", "", { duration: 3000 });
      this.dialogRef.close();
    });
  }

  close() {
    this.dialogRef.close();
  }

}
