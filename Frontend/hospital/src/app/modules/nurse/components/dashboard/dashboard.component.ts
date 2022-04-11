import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthenticationService } from 'src/app/services/Authentication.servic';

@UntilDestroy()
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  todaysAppointment = "todaysAppointment";
  activeRouting = "activeRouting"
  user:number;
  userName: string;
  showProfile: boolean = true;

  constructor(private observer: BreakpointObserver,
    private router: Router,
    private authenticationService: AuthenticationService) {
    this.user = authenticationService.getUserId();
    this.userName = authenticationService.getUserName();
  }

  ngOnInit(): void {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }
  updateProfile() {
    this.showProfile=!this.showProfile
  }

  logout() {
    this.authenticationService.clearSession();
    this.router.navigate(['/login']);
  }
}
