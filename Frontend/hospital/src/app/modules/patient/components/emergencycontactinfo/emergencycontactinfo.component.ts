import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Emergency } from '../../models/emergency';
import { EmergencyService } from '../../services/emergency.service';

@Component({
  selector: 'app-emergencycontactinfo',
  templateUrl: './emergencycontactinfo.component.html',
  styleUrls: ['./emergencycontactinfo.component.css']
})
export class EmergencyContactInfoComponent implements OnInit {

  emergencyForm!: FormGroup;
  emer!: Emergency[];
  em!: any;
  foo: boolean = true;
  id!: number;

  constructor(private formBuilder: FormBuilder, private emergencyService: EmergencyService) { }


  ngOnInit(): void {
    this.emergencyForm = this.formBuilder.group({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      relationship: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required,
      Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$')]),
      address: new FormControl('', [Validators.required])
    })
  }

  get firstname() {
    return this.emergencyForm.get('firstname');
  }
  get lastname() {
    return this.emergencyForm.get('lastname');
  }
  get relationship() {
    return this.emergencyForm.get('relationship');
  }
  get email() {
    return this.emergencyForm.get('email');
  }
  get phone() {
    return this.emergencyForm.get('phone');
  }
  get address() {
    return this.emergencyForm.get('address');
  }

  clicksub() {
    if (this.id !== 1) {
      this.emergencyService.addEmergencyContactInfo(this.emergencyForm.value).subscribe(data => this.emer.push(data));
      alert("info Added!");
      this.emergencyForm.reset();
    }
    else {
      this.emergencyService.updateEmergencyContactInfo(this.emergencyForm.value, this.id).
        subscribe(data => this.em = data);
      this.emergencyForm.reset();

    }
  }
  cancel() {
    console.log(this.emergencyForm.value);
    this.emergencyForm.reset();

  }

  getEmergencyDetailsById() {
    this.id = 1;
    this.emergencyService.getEmergencyContactDetailsById(this.id).subscribe(data => this.em = data)
    console.log(this.em);
  }

  updateEmergencyDetails() {
    this.emergencyService.getEmergencyContactDetailsById(1).subscribe(res => this.em = res);
    this.emergencyForm.controls['firstname']?.setValue(this.em.firstname);
    this.emergencyForm.controls['lastname'].setValue(this.em.lastname);
    this.emergencyForm.controls['relationship'].setValue(this.em.relationship);
    this.emergencyForm.controls['email'].setValue(this.em.email);
    this.emergencyForm.controls['phone'].setValue(this.em.phonenumber);
    this.id = 1;
    this.foo = false;
  }
}


