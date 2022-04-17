import { Component, Input, OnInit } from '@angular/core';
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

  form!: FormGroup;
  languages: string[] = [];

  constructor(
    private utilityService: UtilityService
  ) { }

  get age() {
    return this.form.controls.age;
  }

  get gender() {
    return this.form.controls.gender;
  }

  get race() {
    return this.form.controls.race;
  }

  get ethnicity() {
    return this.form.controls.ethnicity;
  }

  get language() {
    return this.form.controls.language;
  }

  get address() {
    return this.form.controls.address;
  }

  ngOnInit(): void {
    this.utilityService.getLanguages().subscribe(res => this.languages = res);

    if (this.user.demographics == null) {
      this.user.demographics = {
        age: this.calcAge(), gender: this.guessGender(),
        race: '', ethnicity: '', address: '', language: ''
      };
    }

    this.form = new FormGroup({
      patientId: new FormControl('P000' + this.user.patientId, []),
      age: new FormControl(this.user.demographics.age, [Validators.required]),
      gender: new FormControl(this.user.demographics.gender, [Validators.required]),
      race: new FormControl(this.user.demographics.race, [Validators.required, noSpaceValidator]),
      ethnicity: new FormControl(this.user.demographics.ethnicity, [Validators.required, noSpaceValidator]),
      language: new FormControl(this.user.demographics.language, [Validators.required]),
      address: new FormControl(this.user.demographics.address, [Validators.required, noSpaceValidator])
    });
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

}
