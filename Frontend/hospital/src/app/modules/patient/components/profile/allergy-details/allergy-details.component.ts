import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AllergyService } from 'src/app/services/allergy.service';

@Component({
  selector: 'patient-allergy-details',
  templateUrl: './allergy-details.component.html',
  styleUrls: ['./allergy-details.component.css']
})
export class AllergyDetailsComponent implements OnInit {

  @Input() user: any;
  @Output('update') allergyUpdatedEvent = new EventEmitter<any[]>();

  form!: FormGroup;
  allergyTypes: string[];
  allergyTypesAndNames: any[];
  allergies: any[] = [];
  changesMade = false;

  constructor(private allergyService: AllergyService) { }

  ngOnInit(): void {
    this.allergyService.getAllergyNamesAndTypes().subscribe(res => {
      this.allergyTypesAndNames = res;
      this.allergyTypes = Object.keys(res);
    });

    if (this.user.allergies != null) {
      this.allergies = this.user.allergies.map((a: string) => {
        let words = a.split(',');
        return {allergyType: words[0], allergyName: words[1], isFatal: JSON.parse(words[2])};
      });
    } 

    this.form = new FormGroup({
      patientId: new FormControl(this.user.patientId, []),
      allergyType: new FormControl('', [Validators.required]),
      allergyName: new FormControl({ value: '', disabled: true }, [Validators.required]),
      isFatal: new FormControl(false, [])
    });

  }

  f(field: string) {
    return this.form.controls[field];
  }

  addAllergy() {
    let allergy = {
      allergyType: this.form.value.allergyType, 
      allergyName: this.form.value.allergyName, 
      isFatal: this.form.value.isFatal
    };
    if(this.allergies.find(a => (a.allergyType+a.allergyName) === (allergy.allergyType+allergy.allergyName)) == null) {
      this.allergies.push(allergy);
      this.changesMade = true;
    } else {
      alert('Allergy is already selected !');
    }
  }

  emitAllergiesUpdateEvent() {
    this.allergyUpdatedEvent.emit(this.allergies);
    this.changesMade = false;
  }

  enableOrDisableNames() {
    this.f('allergyName').setValue('');
    this.f('allergyType').value == '' ? this.f('allergyName').disable() : this.f('allergyName').enable();
  }

}
