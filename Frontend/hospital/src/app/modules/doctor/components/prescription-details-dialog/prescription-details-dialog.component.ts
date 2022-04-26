import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-visit-details',
  templateUrl: './prescription-details-dialog.component.html',
  styleUrls: ['./prescription-details-dialog.component.css']
})
export class PrescriptionDetailsDialogComponent {

  constructor(
    private snackbar: MatSnackBar,
    private appointmentService: AppointmentService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  setAppointmentDataCollectionStatus() {
    if (this.data.appointment.dataCollectionStatus) return;
    let appointment = this.data.appointment;
    appointment['dataCollectionStatus'] = true;
    this.appointmentService.updateAppointment(appointment).subscribe(res => {
      if (res) this.data.appointment = res;
      else alert("Failed to update appointment data collection status !");
    });
  }

}  
