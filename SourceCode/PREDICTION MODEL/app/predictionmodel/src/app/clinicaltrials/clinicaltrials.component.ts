import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clinicaltrials',
  templateUrl: './clinicaltrials.component.html',
  styleUrls: ['./clinicaltrials.component.css']
})
export class ClinicaltrialsComponent implements OnInit {

  public showMaleList: boolean = false;
  public showsorted: boolean = false;
  patients: any = [];
  malepatients: any = [];
  irishpatients: any = [];
  public selectedPatient: any = []
  public selectedPatient1: any = []

  spcaing = "  ";
  Names1 = [];
  ids1 = [];
  Names2 = [];
  ids2 = [];
  spacing = '  ';
  panelOpenState = false;

  constructor(private http: HttpClient, public router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') != '5f43e796fd8aab2664ff146a') {
      this.router.navigate(['/']);
    }
//Male list
this.malepatients = [];
this.selectedPatient = [];
this.http.get('https://mnd-database.herokuapp.com/PatientRegister')
  .subscribe(result => {
    this.patients = result;
    this.selectedPatient = this.patients.filter(p => p.Gender == "Male");

    for (var i in this.selectedPatient) {
      let patient = {
        name: this.selectedPatient[i].FirstName + this.spacing + this.selectedPatient[i].LastName,
        id: this.selectedPatient[i]._id,
      }
      this.malepatients.push(patient);

    }
  })

  // irish patients
  this.irishpatients = [];
  this.selectedPatient1 = [];

  this.http.get('https://mnd-database.herokuapp.com/PatientRegister')
    .subscribe(result => {
      this.patients = result;
      this.selectedPatient1 = this.patients.filter(p => p.Country === "Ireland");


      for (var i in this.selectedPatient1) {
        let patient = {
          name: this.selectedPatient1[i].FirstName + this.spacing + this.selectedPatient1[i].LastName,
          id: this.selectedPatient1[i]._id,
        }
        this.irishpatients.push(patient);
      }

    })


  }
  viewtrial() {
    this.router.navigate(['/exampletrial']);

  }
  malelist() {

  }
  irishpatient() {

  }

  getID(id: String) {
    const selectedPatient = this.patients.find(p => p._id == id);
    this.router.navigate(['/patientinfo'], { state: { selectedPatient: selectedPatient, } });

  }

}
