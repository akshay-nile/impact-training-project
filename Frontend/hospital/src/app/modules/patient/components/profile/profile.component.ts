import { Component } from '@angular/core';
import { UtilityService } from 'src/app/services/utility.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user: any;

  constructor(private utilityService: UtilityService) {
    this.user = JSON.parse(sessionStorage.getItem('user'));
  }

  updateNomineeDetails(nominee: any) {
    if (this.user.nominee) {
      nominee['nomineeId'] = this.user.nominee['nomineeId'];
    }
    this.user.nominee = nominee;
    this.updateUserProfile();
  }

  updateAllergyDetails(allergies: any[]) {
    this.user['allergies'] = allergies.map(a => `${a.allergyType},${a.allergyName},${a.isFatal}`);
    this.updateUserProfile();
  }

  updateDemographicDetails(demographics: any) {
    if (this.user.demographics) {
      demographics['demographicsId'] = this.user.demographics['demographicsId'];
    }
    this.user.demographics = demographics;
    this.updateUserProfile();
  }

  updatePatientDetails(user: any) {
    if (user) {
      for (let field of 'patientId demographics nominee allergy password'.split(' ')) {
        user[field] = this.user[field];
      }
    }
    this.user = user;
    this.updateUserProfile();
  }

  updateUserProfile() {
    this.utilityService.updatePatientDetails(this.user).subscribe(res => {
      this.user = res;
      sessionStorage.setItem('user', JSON.stringify(this.user));
      alert('Information Successfully Updated !');
    })
  }

}
