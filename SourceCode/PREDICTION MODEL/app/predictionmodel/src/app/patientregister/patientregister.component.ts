import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patientregister',
  templateUrl: './patientregister.component.html',
  styleUrls: ['./patientregister.component.css']
})
export class PatientregisterComponent implements OnInit {
  // Names=['First','Second','Third'];
  patients: any = [];

  scoringdatabasedonID: any = [];
  allPatients: any = [];
  Names = [];
  spacing = '  ';
  ids = [];
  patientid = '5f197acfcfcc693550e21f17';

  selectedcohort: any;
  recentBulbar: any;
  recentMotor: any;
  recentRespiratory: any;
  recentTotal: any;
  recentDateofentry: any;
  lengthofdata: any;
  selectedScoringData: any;
  // Name:String;
  constructor(private http: HttpClient, public router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') != '5f43e796fd8aab2664ff146a') {
      this.router.navigate(['/']);
    }

    this.http.get('https://mnd-database.herokuapp.com/PatientRegister')
      .subscribe(result => {
        this.allPatients = result;
        for (var i in result) {
          let patient = {
            name: result[i].FirstName + this.spacing + result[i].LastName,
            id: result[i]._id,
            cohort: result[i].Cohort
          }
          this.patients.push(patient)
        }



        this.patients.forEach(patient => {
          this.http.get('https://mnd-database.herokuapp.com/ScoringRegister/' + patient.id)
            .subscribe(result => {
              this.scoringdatabasedonID = result;
              this.lengthofdata = this.scoringdatabasedonID.length;
              patient.recentBulbar = result[this.lengthofdata - 1].Bulbar;
              patient.recentMotor = result[this.lengthofdata - 1].Motor;
              patient.recentRespiratory = result[this.lengthofdata - 1].Respiratory;
              patient.recentTotal = result[this.lengthofdata - 1].Total;
              patient.recentDateofentry = result[this.lengthofdata - 1].Dateofentry;
            });
        });



      })

  }

  public selection() {


  }

  getID(id: String) {
    const selectedPatient = this.allPatients.find(p => p._id == id);

    this.router.navigate(['/patientinfo'], { state: { selectedPatient: selectedPatient, } });
  }

}
