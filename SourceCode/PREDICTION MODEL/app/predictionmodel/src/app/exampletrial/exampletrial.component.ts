import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-exampletrial',
  templateUrl: './exampletrial.component.html',
  styleUrls: ['./exampletrial.component.css']
})
export class ExampletrialComponent implements OnInit {

  public showCriteria1: boolean = false;
  public showCriteria2: boolean = false;
  public showCriteria3: boolean = false;
  public showCriteria4: boolean = false;
  public showtotalcriteria: boolean = false;
  public showspinner;

  scoringdatabasedonID: any = [];
  allPatients: any = [];
  criteria1list: any = [];
  allPatientsTotal: any = [];
  totalcriterialist: any = [];
  list1: any = [];
  list2: any = [];

  criteria2list: any = [];
  criteria3list: any = [];
  criteria4list: any = [];

  recentTotal: any;
  lengthofdata: any;

  patients: any = [];
  selectedPatient: any = []
  selectedPatient1: any = []
  selectedPatient2: any = []
  selectedPatient4: any = []


  selectedPatientTotal: any = [];
  spacing = "  ";
  panelOpenState = false;

  constructor(private http: HttpClient, public router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') != '5f43e796fd8aab2664ff146a') {
      this.router.navigate(['/']);
    }


    //criteria 1
    
    this.criteria1list = [];
    this.selectedPatient1 = [];
    this.http.get('https://mnd-database.herokuapp.com/PatientRegister')
      .subscribe(result => {
        this.patients = result;
        this.selectedPatient1 = this.patients.filter(p => p.Age >= 18 && p.Age <= 75);
        this.selectedPatient1 = this.selectedPatient1.filter(p => p.Dateofdeath === "NaN-NaN-0NaN");


        for (var i in this.selectedPatient1) {
          let patient = {
            name: this.selectedPatient1[i].FirstName + this.spacing + this.selectedPatient1[i].LastName,
            id: this.selectedPatient1[i]._id,
          }
          this.criteria1list.push(patient);

        }
        //this.showspinner = false;

      })


      //criteria 2
      this.criteria2list = [];
      this.allPatients = [];
      this.patients = [];
      this.selectedPatient2 = [];
  
      this.http.get('https://mnd-database.herokuapp.com/PatientRegister')
        .subscribe(result => {
          this.patients = result;
          this.selectedPatient2 = this.patients.filter(p => p.Onsettodiagnosis <= 24);
          this.selectedPatient2 = this.selectedPatient2.filter(p => p.Dateofdeath === "NaN-NaN-0NaN");
  
  
          for (var i in this.selectedPatient2) {
            let patient = {
              name: this.selectedPatient2[i].FirstName + this.spacing + this.selectedPatient2[i].LastName,
              id: this.selectedPatient2[i]._id,
            }
            this.criteria2list.push(patient);
  
          }
        })

        //criteria 3
        this.criteria3list = [];
    this.allPatients = [];
    this.http.get('https://mnd-database.herokuapp.com/PatientRegister')
      .subscribe(result => {

        this.patients = result;
        for (var i in result) {
          let patient = {
            name: result[i].FirstName + this.spacing + result[i].LastName,
            id: result[i]._id,
            cohort: result[i].Cohort
          }
          this.allPatients.push(patient)
        }


        this.allPatients.forEach(patient => {
          this.http.get('https://mnd-database.herokuapp.com/ScoringRegister/' + patient.id)
            .subscribe(result => {
              this.scoringdatabasedonID = result;
              this.lengthofdata = this.scoringdatabasedonID.length;
              patient.recentTotal = result[this.lengthofdata - 1].Total;
              patient.alsfrs3 = result[this.lengthofdata - 1].ALSFRS_3;

              if (patient.recentTotal >= 26 && patient.alsfrs3 >= 3 &&
                result[this.lengthofdata - 1].ALSFRS_1 >= 2 && result[this.lengthofdata - 1].ALSFRS_2 >= 2 &&
                result[this.lengthofdata - 1].ALSFRS_4 >= 2 &&
                (result[this.lengthofdata - 1].ALSFRS_5a >= 2 || result[this.lengthofdata - 1].ALSFRS_5b >= 2) &&
                result[this.lengthofdata - 1].ALSFRS_6 >= 2 && result[this.lengthofdata - 1].ALSFRS_7 >= 2 &&
                result[this.lengthofdata - 1].ALSFRS_8 >= 2 && result[this.lengthofdata - 1].ALSFRS_9 >= 2 &&
                result[this.lengthofdata - 1].ALSFRS_10 >= 2 && result[this.lengthofdata - 1].ALSFRS_11 >= 2 &&
                result[this.lengthofdata - 1].ALSFRS_12 >= 2) {
                this.criteria3list.push(patient);
              }
            });

        });

      });

      //criteria 4
      this.criteria4list = [];
      this.selectedPatient4 = [];
  
      this.http.get('https://mnd-database.herokuapp.com/PatientRegister')
        .subscribe(result => {
          this.patients = result;
          this.selectedPatient4 = this.patients.filter(p => p.Elescorial == "Probable" || p.Elescorial == "Definite");
  
          this.selectedPatient4 = this.selectedPatient4.filter(p => p.Dateofdeath === "NaN-NaN-0NaN");
  
  
          for (var i in this.selectedPatient4) {
            let patient = {
              name: this.selectedPatient4[i].FirstName + this.spacing + this.selectedPatient4[i].LastName,
              id: this.selectedPatient4[i]._id,
            }
            this.criteria4list.push(patient);
  
          }
        })

        //totalcriteria

        this.totalcriterialist = [];
        this.allPatientsTotal = [];
        this.selectedPatientTotal = [];
        this.showspinner = true;
        this.http.get('https://mnd-database.herokuapp.com/PatientRegister')
          .subscribe(result => {
    
            this.patients = result;
    
            this.selectedPatientTotal = this.patients.filter(p => p.Age >= 18 && p.Age <= 75);
    
            this.selectedPatientTotal = this.selectedPatientTotal.filter(p => p.Elescorial == "Probable" || p.Elescorial == "Definite");
    
            this.selectedPatientTotal = this.selectedPatientTotal.filter(p => p.Onsettodiagnosis <= 24);
    
            this.selectedPatientTotal = this.selectedPatientTotal.filter(p => p.Dateofdeath === "NaN-NaN-0NaN");
    
    
            for (var i in this.selectedPatientTotal) {
              let patient = {
                name: this.selectedPatientTotal[i].FirstName + this.spacing + this.selectedPatientTotal[i].LastName,
                id: this.selectedPatientTotal[i]._id,
                cohort: this.selectedPatientTotal[i].Cohort
              }
              this.allPatientsTotal.push(patient)
            }
    
            this.allPatientsTotal.forEach(patient => {
              this.http.get('https://mnd-database.herokuapp.com/ScoringRegister/' + patient.id)
                .subscribe(result => {
                  this.scoringdatabasedonID = result;
                  this.lengthofdata = this.scoringdatabasedonID.length;
                  patient.recentTotal = result[this.lengthofdata - 1].Total;
                  patient.alsfrs3 = result[this.lengthofdata - 1].ALSFRS_3;
    
    
                  this.showspinner = false;
                  if (patient.recentTotal >= 26 && patient.alsfrs3 >= 3 &&
                    result[this.lengthofdata - 1].ALSFRS_1 >= 2 && result[this.lengthofdata - 1].ALSFRS_2 >= 2 &&
                    result[this.lengthofdata - 1].ALSFRS_4 >= 2 &&
                    (result[this.lengthofdata - 1].ALSFRS_5a >= 2 || result[this.lengthofdata - 1].ALSFRS_5b >= 2) &&
                    result[this.lengthofdata - 1].ALSFRS_6 >= 2 && result[this.lengthofdata - 1].ALSFRS_7 >= 2 &&
                    result[this.lengthofdata - 1].ALSFRS_8 >= 2 && result[this.lengthofdata - 1].ALSFRS_9 >= 2 &&
                    result[this.lengthofdata - 1].ALSFRS_10 >= 2 && result[this.lengthofdata - 1].ALSFRS_11 >= 2 &&
                    result[this.lengthofdata - 1].ALSFRS_12 >= 2) {
                    this.totalcriterialist.push(patient);
    
                  }
    
                });
    
            });
    
          });
  }
  criteria1() {

    //this.showspinner = true;

  }
  criteria2() {

   

  }

  criteria3() {

    

  }

  criteria4() {



  }

  getID(id: String) {
    const selectedPatient = this.patients.find(p => p._id == id);
    this.router.navigate(['/patientinfo'], { state: { selectedPatient: selectedPatient, } });

  }



  totalcriteria() {


  }


}
