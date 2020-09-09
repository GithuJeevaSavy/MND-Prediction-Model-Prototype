import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  sideBarOpen = true;

  constructor(private router: Router) { }
  public onClick(e: any): void{
    this.sideBarOpen=!this.sideBarOpen;
  }

  
  ngOnInit(): void {
    if(localStorage.getItem('token')!='5f43e796fd8aab2664ff146a'){
      this.router.navigate(['/']);
    }
  }

}
