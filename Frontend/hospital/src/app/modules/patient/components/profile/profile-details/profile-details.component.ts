import { formatDate } from '@angular/common';
import { Component, Inject, Input, LOCALE_ID, OnInit } from '@angular/core';
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

  get title() {
    return this.form.controls.title;
  }

  get first() {
    return this.form.controls.firstName;
  }

  get last() {
    return this.form.controls.lastName;
  }

  get email() {
    return this.form.controls.email;
  }

  get dob() {
    return this.form.controls.birthdate;
  }

  get phone() {
    return this.form.controls.phone;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      patientId: new FormControl('P000' + this.user.patientId, []),
      title: new FormControl(this.user.title, [Validators.required]),
      firstName: new FormControl(this.user.firstName, [Validators.required, noSpaceValidator]),
      lastName: new FormControl(this.user.lastName, [Validators.required, noSpaceValidator]),
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      phone: new FormControl(this.user.phone, [Validators.required, Validators.pattern(/^\+\d+\s?\d{10}$/)]),
      birthdate: new FormControl(this.user.birthdate, [Validators.required])
    });
    this.setEditMode(false);
  }

  onPhoneEntered() {
    if(this.user.phone == this.phone) {
      this.phoneExists = false;
    } else if (this.phone.valid) {
      this.utilityService.phoneExists(this.form.value.phone).subscribe(res => this.phoneExists = res);
    }
  }

  updatePatientDetails() {
    let params = this.form.getRawValue();
    for(let field of 'patientId password demographics nominee'.split(' ')) { 
      params[field] = this.user[field];
    }
    this.utilityService.updatePatientDetails(params).subscribe(res => {
      this.user = res;
      sessionStorage.setItem('user', this.user);
      this.setEditMode(false);
    })
  }

  setEditMode(mode: boolean) {
    this.editMode = mode;
    for(let field of 'title firstName lastName phone birthdate'.split(' ')) {
      // this.form.controls[field] = this.user[field];
      mode ? this.form.controls[field].enable() : this.form.controls[field].disable();
    }
  }
}
