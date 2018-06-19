import { Component, OnInit, Input } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {

  constructor(public auth : AuthService) {}

  ngOnInit() {
  }

}
