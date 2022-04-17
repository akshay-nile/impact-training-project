import { Component, Input, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'patient-nominee-details',
  templateUrl: './nominee-details.component.html',
  styleUrls: ['./nominee-details.component.css']
})
export class NomineeDetailsComponent implements OnInit {

  @Input() user: any;

  relations:string[] = [];

  constructor(
    private utilityService: UtilityService
  ) { }


  ngOnInit(): void {
    this.utilityService.getRelations().subscribe(res => this.relations = res);

  }

}
