import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title = 'predictionmodel';

  constructor(public router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') != '5f43e796fd8aab2664ff146a') {
      this.router.navigate(['/']);
    }
  }

  signout() {
    localStorage.clear();
    this.router.navigate(['/']);

  }
}
