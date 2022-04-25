import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProcedureService } from 'src/app/services/procedure.service';
import { PrescriptionDetailsDialogComponent } from '../prescription-details-dialog.component';

@Component({
  selector: 'add-procedures',
  templateUrl: './add-procedures.component.html',
  styleUrls: ['./add-procedures.component.css']
})
export class AddProceduresComponent implements OnInit {

  @Input() appointmentId: number;
  @Output('update') updateEvent = new EventEmitter<void>();

  form!: FormGroup;

  proceduresData = [];
  selectedProcedures = [];

  hasAnythingChanged = false;

  constructor(
    public dialogRef: MatDialogRef<PrescriptionDetailsDialogComponent>,
    private procedureService: ProcedureService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({ 
      procedureName: [-1], 
      description: [{value: '', disabled: true}] 
    });
  }

  ngOnInit(): void {
    this.procedureService.getAllProcedures(0, 100).subscribe(res => this.proceduresData = res);
    this.procedureService.getProcedureByAptId(this.appointmentId).subscribe(res => this.selectedProcedures = res);
  }

  showDescription(procedureId: number) {
    if(procedureId == -1) this.form.controls.description.setValue('');
    else {
      let procedure = this.proceduresData.find(p => p.procedureId === procedureId);
      this.form.controls.description.setValue(procedure?.description);
    } 
  }

  addSelectedProcedure(procedureId: any) {
    let procedure = this.proceduresData.find(p => p.procedureId === procedureId)
    if (!this.selectedProcedures.map(p => p.procedureId).includes(procedureId)) {
      this.selectedProcedures.push(procedure);
      this.hasAnythingChanged = true;
      this.form.reset();
    } else alert("Procedure Already Added !");
  }

  removeProcedure(i: number) {
    this.selectedProcedures.splice(i, 1);
    this.hasAnythingChanged = true;
  }

  emitProcedureUpdateEvent() {
    let apptProcedures = {
      'appointmentId': this.appointmentId,
      'procedureIds': this.selectedProcedures.map(p => p.procedureId)
    };
    this.procedureService.addProcedureByAptId(apptProcedures).subscribe(res => {
      if (res) {
        this.updateEvent.emit();
        alert("Changes Succesfully Saved !");
        this.hasAnythingChanged = false;
      } else alert(res);
    });
  }

}
