import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilityService } from 'src/app/services/utility.service';
import { noSpaceValidator } from 'src/app/validators/text-field.validator';

@Component({
  selector: 'patient-demographic-details',
  templateUrl: './demographic-details.component.html',
  styleUrls: ['./demographic-details.component.css']
})
export class DemographicDetailsComponent implements OnInit {

  @Input() user: any;
  @Output('update') demographicsUpdatedEvent = new EventEmitter<any>();

  form!: FormGroup;
  demographics: any;
  
  addressForm!: FormGroup;
  address: any;
  
  languages: string[] = [];
  editMode = false;

  constructor(private utilityService: UtilityService) { }

  ngOnInit(): void {
    this.utilityService.getLanguages().subscribe(res => this.languages = res);

    if (this.user.demographics != null) {
      this.demographics = this.user.demographics;
      let addr = this.demographics.address.split('$$');
      this.address = {
        street: addr[0], landmark: addr[1], city: addr[2], state: addr[3], pincode: addr[4]
      }
    } else {
      this.demographics = {
        age: this.calcAge(), gender: this.guessGender(), race: '',
        ethnicity: '', language: null
      };
      this.address = {
        street: '', landmark: '', city: '', state: '', pincode: ''
      }
    }

    this.form = new FormGroup({
      patientId: new FormControl(this.user.patientId, []),
      age: new FormControl(this.demographics.age, [Validators.required]),
      gender: new FormControl(this.demographics.gender, [Validators.required]),
      race: new FormControl(this.demographics.race, [Validators.required, noSpaceValidator]),
      ethnicity: new FormControl(this.demographics.ethnicity, [Validators.required, noSpaceValidator]),
      language: new FormControl(this.demographics.language, [Validators.required])
    });

    this.addressForm = new FormGroup({
      street: new FormControl(this.address.street, [Validators.required, noSpaceValidator]),
      landmark: new FormControl(this.address.landmark, [Validators.required, noSpaceValidator]),
      city: new FormControl(this.address.city, [Validators.required, noSpaceValidator]),
      state: new FormControl(this.address.state, [Validators.required, noSpaceValidator]),
      pincode: new FormControl(this.address.pincode, [Validators.required, Validators.pattern(/^\d{6}$/)])
    });

    this.setEditMode(false);
  }

f(field: string) {
  return this.form.controls[field];
}

calcAge() {
  let miliSeconds = Date.now().valueOf() - new Date(this.user.birthdate).valueOf();
  return Math.floor(miliSeconds / 1000 / 60 / 60 / 24 / 365.25);
}

guessGender() {
  if (this.user.title === 'Mr') return 'MALE';
  else if ('Ms Mrs'.split(' ').includes(this.user.title)) return 'FEMALE';
  else return '';
}

emitDemographicsUpdateEvent() {
  let rawForm = this.form.getRawValue();
  for (let field of 'age gender race ethnicity language'.split(' ')) {
    this.demographics[field] = rawForm[field];
  }
  this.address = this.addressForm.getRawValue();
  this.demographics['address'] = Object.values(this.address).join('$$');
  this.demographicsUpdatedEvent.emit(this.demographics);
  this.setEditMode(false);
}

setEditMode(mode: boolean) {
  this.editMode = mode;
  for (let field of 'age gender race ethnicity language'.split(' ')) {
    this.form.controls[field].setValue(this.demographics[field]);
    mode ? this.form.controls[field].enable() : this.form.controls[field].disable();
  }
  for (let field of 'street landmark city state pincode'.split(' ')) {
    this.addressForm.controls[field].setValue(this.address[field]);
    mode ? this.addressForm.controls[field].enable() : this.addressForm.controls[field].disable();
  }
}

}
