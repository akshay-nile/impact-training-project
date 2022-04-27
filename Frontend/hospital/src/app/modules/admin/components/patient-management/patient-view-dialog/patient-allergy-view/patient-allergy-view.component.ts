import { Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'patient-allergy-view',
  templateUrl: './patient-allergy-view.component.html',
  styleUrls: ['./patient-allergy-view.component.css']
})
export class PatientAllergyViewComponent implements OnInit {

  @Input() user: any;

  allergies = [];

  constructor() { }

  ngOnInit(): void {
    if(!this.user.allergies) return;
    
    this.allergies = this.user.allergies.map(allergy => {
      let words = allergy.split(',');
      return {
        allergyType: words[0],
        allergyName: words[1],
        isFatal: JSON.parse(words[2])
      };
    });
  }
}
