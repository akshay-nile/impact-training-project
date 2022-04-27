import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'patient-nominee-view',
  templateUrl: './patient-nominee-view.component.html',
  styleUrls: ['./patient-nominee-view.component.css']
})
export class PatientNomineeViewComponent implements OnInit {

  @Input() user: any;

  form!: FormGroup;
  nominee: any;

  constructor() { }

  ngOnInit(): void {
    this.nominee = this.user.nominee;
    this.form = new FormGroup({
      title: new FormControl(!this.nominee ? '' : this.nominee.title),
      firstName: new FormControl(!this.nominee ? '' : this.nominee.firstName),
      lastName: new FormControl(!this.nominee ? '' : this.nominee.lastName),
      relation: new FormControl(!this.nominee ? '' : this.nominee.relation),
      email: new FormControl(!this.nominee ? '' : this.nominee.email),
      phone: new FormControl(!this.nominee ? '' : this.nominee.phone),
      address: new FormControl(!this.nominee ? '' : this.nominee.address.replaceAll('$$', '\n')),
      isAccessAllowed: new FormControl(!this.nominee ? '' : (this.nominee.isAccessAllowed ? "Yes" : "No"))
    });
    this.form.disable();
  }
}
