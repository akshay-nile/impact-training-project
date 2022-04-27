import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'patient-demographic-view',
  templateUrl: './patient-demographic-view.component.html',
  styleUrls: ['./patient-demographic-view.component.css']
})
export class PatientDemographicViewComponent implements OnInit {

  @Input() user: any;

  form!: FormGroup;
  d: any;

  constructor() { }

  ngOnInit(): void {
    this.d = this.user.demographics;

    this.form = new FormGroup({
      age: new FormControl(!this.d ? '' : this.d.age),
      gender: new FormControl(!this.d ? '' : this.d.gender),
      race: new FormControl(!this.d ? '' : this.d.race),
      ethnicity: new FormControl(!this.d ? '' : this.d.ethnicity),
      language: new FormControl(!this.d ? '' : this.d.language),
      address: new FormControl(!this.d ? '' : this.d.address.replaceAll('$$','\n'))
    });
  }

}
