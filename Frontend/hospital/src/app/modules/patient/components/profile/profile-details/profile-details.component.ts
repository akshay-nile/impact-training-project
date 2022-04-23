import { formatDate } from '@angular/common';
import { Component, EventEmitter, Inject, Input, LOCALE_ID, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilityService } from 'src/app/services/utility.service';
import { noSpaceValidator } from 'src/app/validators/text-field.validator';

@Component({
  selector: 'patient-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {

  @Input() user: any;
  @Output('update') userUpdatedEvent = new EventEmitter<any>(); 

  form!: FormGroup;
  titles = "Mr Ms Mrs Dr".split(' ');
  phoneExists = false;
  editMode = false;

  constructor(
    private utilityService: UtilityService,
    @Inject(LOCALE_ID) private locale: string
  ) { }

  get today() {
    let miliSeconds = Math.ceil(18 * 365.25 * 24 * 60 * 60 * 1000);
    let date = new Date(Date.now().valueOf() - miliSeconds);
    return formatDate(date, 'yyyy-MM-dd', this.locale);
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      patientId: new FormControl(this.user.patientId, []),
      title: new FormControl(this.user.title, [Validators.required]),
      firstName: new FormControl(this.user.firstName, [Validators.required, noSpaceValidator]),
      lastName: new FormControl(this.user.lastName, [Validators.required, noSpaceValidator]),
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      phone: new FormControl(this.user.phone, [Validators.required, Validators.pattern(/^\+\d+\s?\d{10}$/)]),
      birthdate: new FormControl(this.user.birthdate, [Validators.required])
    });

    this.setEditMode(false);
  }

  f(field: string) {
    return this.form.controls[field];
  }

  onPhoneEntered() {
    if(this.user.phone == this.form.value.phone) {
      this.phoneExists = false;
    } else if (this.form.controls.phone.valid) {
      this.utilityService.phoneExists(this.form.value.phone).subscribe(res => this.phoneExists = res);
    }
  }

  emitUserUpdateEvent() {
    let user = this.form.getRawValue();
    this.userUpdatedEvent.emit(user);
    this.setEditMode(false);
  }

  setEditMode(mode: boolean) {
    this.editMode = mode;
    for(let field of 'title firstName lastName phone birthdate'.split(' ')) { 
      mode ? this.form.controls[field].enable() : this.form.controls[field].disable();
    }
  }
}
