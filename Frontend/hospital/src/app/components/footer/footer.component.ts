import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  hospitalName: string = "CT Hospital";
  location: string = "Mahalashmi Towers, Prabadevi, Mumbai";
  phoneNumber: string = "+91 8998367378";
  email: string = "info@ct.com";
  specialization: string[] = ["Cardiology", "ENT", "Orthopaedics", "Neurology" ,"Others"]
}
