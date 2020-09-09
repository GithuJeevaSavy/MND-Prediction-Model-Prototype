import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {

  constructor(public router: Router, private http: HttpClient,) { }
  @Input() details = {
    username: '',
    password: '',
  }
  showfailurealert = false;
  showsuccessalert = false;
  loginData: any = [];

  ngOnInit(): void {
    localStorage.clear();

  }

  public onClick(e: any): void {
    this.http.get('https://mnd-database.herokuapp.com/LoginRegister')
      .subscribe(result => {
        this.loginData = result;
        if (this.details.username == this.loginData[0].UserName && this.details.password == this.loginData[0].Password) {
          this.showsuccessalert = true;
          localStorage.setItem('token', this.loginData[0]._id);
          //alert(localStorage.getItem('token'));
          setTimeout(() => {
            this.showsuccessalert = false;
            this.router.navigate(['/home']);

          }, 1000);
        }
        else {
          this.showfailurealert = true;
          setTimeout(() => this.showfailurealert = false, 3500);


        }
      })


  }

}
