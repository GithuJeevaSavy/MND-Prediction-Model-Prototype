import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alsfrs-scoring',
  templateUrl: './alsfrs-scoring.component.html',
  styleUrls: ['./alsfrs-scoring.component.css'],

})
export class AlsfrsScoringComponent {

  showsuccessalert = false;
  showfailurealert = false;
  public labelname = '';
  showsnip = false;
  showfvc = false;
  routerState: any;
  patient: any = {};

  questioner: string;
  designation: string;
  questionerlocation: string;
  relation: string;
  answerer: string;
  alsfrs1 = '';
  alsfrs2 = '';
  alsfrs3 = '';
  alsfrs4 = '';
  alsfrs5 = '';
  alsfrs5a = '';
  alsfrs5b = '';
  alsfrs6 = '';
  alsfrs7 = '';
  alsfrs8 = '';
  alsfrs9 = '';
  alsfrs10 = '';
  alsfrs11 = '';
  alsfrs12 = '';
  dateofentry = '';
  bulbarscore = 0;
  motorscore = 0;
  respiratoryscore = 0;
  FVC;
  SNIP_O;
  SNIP_NO;
  totalscore = 0;
  comments = '';


  constructor(private http: HttpClient, private _snackBar: MatSnackBar, public router: Router,) {
    this.routerState = this.router.getCurrentNavigation().extras.state;
    if (this.routerState) {
      this.patient = this.routerState.patientdata; //? JSON.parse(this.routerState.selectedPatient) : '';

      let i = 'Dublin, Ireland';
      if (this.patient.Cohort === 'Dublin, Ireland') {


        this.labelname = 'SNIP';
        this.showsnip = true;
      }

      else {
        this.labelname = 'FVC';
        this.showfvc = true;
      }

    }

  }
  ngOnInit(): void {
    if (localStorage.getItem('token') != '5f43e796fd8aab2664ff146a') {
      this.router.navigate(['/']);
    }
  }


  public calculateBulbarScore(): number {


    if (isNaN(parseInt(this.alsfrs1)) || isNaN(parseInt(this.alsfrs2)) || isNaN(parseInt(this.alsfrs3)))
      return 0;
    this.bulbarscore = parseInt(this.alsfrs1) + parseInt(this.alsfrs2) + parseInt(this.alsfrs3);
    return this.bulbarscore;
  }
  public calculateMotorScore(): number {

    if (isNaN(parseInt(this.alsfrs5a)))
      this.alsfrs5 = this.alsfrs5b;
    else
      this.alsfrs5 = this.alsfrs5a;

    if (isNaN(parseInt(this.alsfrs4)) || isNaN(parseInt(this.alsfrs5))
      || isNaN(parseInt(this.alsfrs6)) || isNaN(parseInt(this.alsfrs7)) ||
      isNaN(parseInt(this.alsfrs8)) || isNaN(parseInt(this.alsfrs9)))
      return 0;
    this.motorscore = parseInt(this.alsfrs4) + parseInt(this.alsfrs5) +
      parseInt(this.alsfrs6) + parseInt(this.alsfrs7) + parseInt(this.alsfrs8) + parseInt(this.alsfrs9);
    return this.motorscore;
  }

  public calculateRespiratoryScore(): number {


    if (isNaN(parseInt(this.alsfrs10)) || isNaN(parseInt(this.alsfrs11)) || isNaN(parseInt(this.alsfrs12)))
      return 0;

    this.respiratoryscore = parseInt(this.alsfrs10) + parseInt(this.alsfrs11) + parseInt(this.alsfrs12);
    return this.respiratoryscore;
  }

  public totalScore(): number {
    this.totalscore = this.bulbarscore + this.motorscore + this.respiratoryscore;
    return this.totalscore;
  }
  public onClick(e: any): void {

    var input: any = {
      PatientFirstName: this.patient.FirstName,
      PatientLastName: this.patient.LastName,
      Questioner: this.questioner,
      Designation: this.designation,
      QuestionerLocation: this.questionerlocation,
      Answerer: this.answerer,
      Relation: this.relation,
      Patientid: this.patient._id,
      Dateofentry: this.getStringFormattedDate(this.dateofentry),
      ALSFRS_1: this.alsfrs1,
      ALSFRS_2: this.alsfrs2,
      ALSFRS_3: this.alsfrs3,
      ALSFRS_4: this.alsfrs4,
      ALSFRS_5a: this.alsfrs5a,
      ALSFRS_5b: this.alsfrs5b,
      ALSFRS_6: this.alsfrs6,
      ALSFRS_7: this.alsfrs7,
      ALSFRS_8: this.alsfrs8,
      ALSFRS_9: this.alsfrs9,
      ALSFRS_10: this.alsfrs10,
      ALSFRS_11: this.alsfrs11,
      ALSFRS_12: this.alsfrs12,
      Bulbar: this.bulbarscore,
      Motor: this.motorscore,
      Respiratory: this.respiratoryscore,
      Total: this.totalScore(),
      FVC: this.FVC,
      SNIP_O: this.SNIP_O,
      SNIP_NO: this.SNIP_NO,
      Comments: this.comments,

    }
    this.http.post<any>('https://mnd-database.herokuapp.com/ScoringRegister', input)
      .subscribe(data => {

        if (data.errorMessage) {
          this.showfailurealert = true;
          setTimeout(() => this.showfailurealert = false, 3500);

          this.router.navigate(['/alsfrs-scoring']);

        }
        else {

          this.showsuccessalert = true;
          setTimeout(() => {
            this.showsuccessalert = false;
            this.router.navigate(['/home']);
          }, 2000);

        }


      })


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

