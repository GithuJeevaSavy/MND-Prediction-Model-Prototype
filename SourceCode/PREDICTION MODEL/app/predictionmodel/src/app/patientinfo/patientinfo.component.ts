import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { toBase64String } from '@angular/compiler/src/output/source_map';

@Component({
  selector: 'app-patientinfo',
  templateUrl: './patientinfo.component.html',
  styleUrls: ['./patientinfo.component.css']
})
export class PatientinfoComponent implements OnInit {

  show = false;
  showalert = false;
  showalert2 = false;

  showsnip = false;
  showfvc = false;

  updateddateofdeath: Date;
  patient: any = {};
  scoringdata: any = {}
  recentscoringdata: any = [];

  routerState: any;
  lengthofdata: any;
  dementia: boolean;
  c9orf72: boolean;

  recentBulbar: any;
  recentMotor: any;
  recentRespiratory: any;
  recentTotal: any;
  recentDateofentry: any;
  showdateofdeath = true;

  constructor(private router: Router, private http: HttpClient,) {
    this.routerState = this.router.getCurrentNavigation().extras.state;
    if (this.routerState) {
      this.patient = this.routerState.selectedPatient; //? JSON.parse(this.routerState.selectedPatient) : '';


      if ((this.patient.Dateofdeath === "NaN-NaN-0NaN")) {
        this.showdateofdeath = false;
      }

      this.http.get('https://mnd-database.herokuapp.com/ScoringRegister/' + this.patient._id)
        .subscribe(result => {

          this.scoringdata = result;
          this.lengthofdata = this.scoringdata.length;
          this.recentBulbar = this.scoringdata[this.lengthofdata - 1].Bulbar;
          this.recentMotor = this.scoringdata[this.lengthofdata - 1].Motor;
          this.recentRespiratory = this.scoringdata[this.lengthofdata - 1].Respiratory;
          this.recentTotal = this.scoringdata[this.lengthofdata - 1].Total;
          this.recentDateofentry = this.scoringdata[this.lengthofdata - 1].Dateofentry;
          this.recentscoringdata = this.scoringdata[this.lengthofdata - 1];
        })

      if (this.patient.Presenceofdementia == "Yes")
        this.dementia = true;
      else
        this.dementia = false;
      if (this.patient.C9orf72 == "Yes")
        this.c9orf72 = true;
      else
        this.c9orf72 = false;

      if (this.patient.Cohort === 'Dublin, Ireland') {


        this.showsnip = true;
      }

      else {
        this.showfvc = true;
      }


    }

  }

  ngOnInit(): void {

    if (localStorage.getItem('token') != '5f43e796fd8aab2664ff146a') {
      this.router.navigate(['/']);
    }

  }
  toggle() {
    this.show = !this.show;
  }
  public updateDateofDeath() {

    if (this.getStringFormattedDate(this.updateddateofdeath) === "NaN-NaN-0NaN") {
      this.showalert2 = true;
      setTimeout(() => this.showalert2 = false, 2500);

    }
    else {
      var input: any = {
        Dateofdeath: this.getStringFormattedDate(this.updateddateofdeath)
      }
      this.http.patch<any>('https://mnd-database.herokuapp.com/PatientRegister/' + this.patient._id, input)
        .subscribe(data => {

          if (data.errorMessage) {

            this.showalert2 = true;
            setTimeout(() => this.showalert2 = false, 2500);

          }
          else {


            this.showalert = true;
            this.show = false;
            setTimeout(() => this.showalert = false, 2500);


          }
        })
    }

  }
  public graphicaldata() {
    this.router.navigate(['/graphview'], { state: { selectedPatient: this.patient, } });
  }
  public onClick(e: any): void {

    this.router.navigate(['/alsfrs-scoring'], { state: { patientdata: this.patient, } });

  }

  private getStringFormattedDate(inpDate): string {
    var today = new Date(inpDate);
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = String(today.getFullYear()).padStart(4, '0');;
    var formatedDate = dd + '-' + mm + '-' + yyyy;
    return formatedDate;
  }

}
