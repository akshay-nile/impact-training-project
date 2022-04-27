import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'patient-view',
  templateUrl: './patient-view-dialog.component.html',
  styleUrls: ['./patient-view-dialog.component.css']
})
export class PatientViewDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<PatientViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  close() { 
    this.dialogRef.close(); 
  }

}
