import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilityService } from 'src/app/services/utility.service';
import { noSpaceValidator } from 'src/app/validators/text-field.validator';

@Component({
  selector: 'patient-nominee-details',
  templateUrl: './nominee-details.component.html',
  styleUrls: ['./nominee-details.component.css']
})
export class NomineeDetailsComponent implements OnInit {

  @Input() user: any;
  @Output('update') nomineeUpdatedEvent = new EventEmitter<any>();

  form!: FormGroup;
  nominee: any;

  addressForm!: FormGroup;
  address: any;

  titles = "Mr Ms Mrs Dr".split(' ');
  relations: string[] = [];
  editMode = false;

  constructor(private utilityService: UtilityService) { }

  ngOnInit(): void {
    this.utilityService.getRelations().subscribe(res => this.relations = res);

    if (this.user.nominee != null) {
      this.nominee = this.user.nominee;
      let addr = this.nominee.address.split('$$');
      this.address = {
        street: addr[0], landmark: addr[1], city: addr[2], state: addr[3], pincode: addr[4]
      }
    } else {
      this.nominee = {
        title: null, firstName: '', lastName: '', email: '', 
        phone: '+91 ', relation: null, isAccessAllowed: true
      };
      this.address = {
        street: '', landmark: '', city: '', state: '', pincode: ''
      }
    }

    this.form = new FormGroup({
      patientId: new FormControl(this.user.patientId, []),
      title: new FormControl(this.nominee.title, [Validators.required]),
      firstName: new FormControl(this.nominee.firstName, [Validators.required, noSpaceValidator]),
      lastName: new FormControl(this.nominee.lastName, [Validators.required, noSpaceValidator]),
      relation: new FormControl(this.nominee.relation, [Validators.required]),
      email: new FormControl(this.nominee.email, [Validators.required, Validators.email]),
      phone: new FormControl(this.nominee.phone, [Validators.required, Validators.pattern(/^\+\d+\s?\d{10}$/)]),
      isAccessAllowed: new FormControl(this.nominee.isAccessAllowed, []),
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

  emitNomineeUpdateEvent() {
    let rawForm = this.form.getRawValue();
    for (let field of 'title firstName lastName phone email relation isAccessAllowed'.split(' ')) {
      this.nominee[field] = rawForm[field];
    }
    this.address = this.addressForm.getRawValue();
    this.nominee['address'] = Object.values(this.address).join('$$');
    this.nomineeUpdatedEvent.emit(this.nominee);
    this.setEditMode(false);
  }

  setEditMode(mode: boolean) {
    this.editMode = mode;
    for (let field of 'title firstName lastName phone email relation isAccessAllowed'.split(' ')) {
      this.form.controls[field].setValue(this.nominee[field]);
      mode ? this.form.controls[field].enable() : this.form.controls[field].disable();
    }
    for (let field of 'street landmark city state pincode'.split(' ')) {
      this.addressForm.controls[field].setValue(this.address[field]);
      mode ? this.addressForm.controls[field].enable() : this.addressForm.controls[field].disable();
    }
  }
}
