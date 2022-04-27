import { Component,Input, OnInit} from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'patient-profile-view',
  templateUrl: './patient-profile-view.component.html',
  styleUrls: ['./patient-profile-view.component.css']
})
export class PatientProfileViewComponent implements OnInit {

  @Input() user: any; 

  form!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      patientId: new FormControl(this.user.patientId),
      status: new FormControl(this.user.status),
      title: new FormControl(this.user.title),
      firstName: new FormControl(this.user.firstName),
      lastName: new FormControl(this.user.lastName),
      email: new FormControl(this.user.email),
      phone: new FormControl(this.user.phone),
      birthdate: new FormControl(this.user.birthdate)
    });
    this.form.disable();
  }
}
