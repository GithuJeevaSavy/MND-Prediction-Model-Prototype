import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
@Component({
  selector: 'app-detailsform',
  templateUrl: './detailsform.component.html',
  styleUrls: ['./detailsform.component.css']
})
// export interface PatientData{
//    name:string;
//    selectedgender:string;
//    dateofbirth:Date;
//    address:string;
//    street:string;
//    city:string;
//    postcode:string;
//    country:string;
//    phone:string;

//    selectedcohort:string;

//    selectedelescorial:string;
//    selectedsiteofonset:string;
//    dateofonset:Date;
//    selecteddementia:string;
//    selectedc9orf72:string;
//    dateofdiagnosis:Date;
//    dateofdeath:Date;
//    onsettodiagnosis:number;
//    onsettodeath:number;
//    diagnosistodeath:number;
//  }

export class DetailsformComponent implements OnInit {

  showsuccessalert = false;
  showfailurealert = false;

  public firstname: string;
  public lastname: string;

  public selectedgender: string;
  public dateofbirth: Date;
  public age: number;

  public address: string;
  public street: string;
  public city: string;
  public postcode: string;
  public country: string;
  public phone1: string;
  public phone2: string;

  public selectedcohort: string;
  public currentdate: Date;

  public selectedelescorial: string;
  public selectedsiteofonset: string;
  public dateofonset: Date;
  public selecteddementia: string;
  public selectedc9orf72: string;
  public dateofdiagnosis: Date;
  public dateofdeath: Date;
  public onsettodiagnosis: number;
  public onsettodeath: number;
  public diagnosistodeath: number;


  public show: boolean = false;
  public buttonName: any = 'Show Additional Details';

  public patientidlist: any;
  public patientidnumber: any;



  constructor(public router: Router, private http: HttpClient, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

    if (localStorage.getItem('token') != '5f43e796fd8aab2664ff146a') {
      this.router.navigate(['/']);
    }
    this.http.get('https://mnd-database.herokuapp.com/PatientRegister')
      .subscribe(result => {
        this.patientidlist = result;

        this.patientidnumber = this.patientidlist.length + 1;

      })

  }

  getRegisterType(): string {

    var cohort = this.selectedcohort;
    if (cohort == 'Leuven, Belgium' || cohort == 'Jena, Germany' || cohort == 'Sheffield, UK' ||
      cohort == 'Oxford, UK' || cohort == 'Lisbon, Portugal' || cohort == 'Hannover, Germany' ||
      cohort == 'Limoges, France' || cohort == 'Tours, France' || cohort == 'St Gallen, Switzerland')
      return 'Referral Based';
    else if (cohort == 'Dublin, Ireland' || cohort == 'London, UK' || cohort == 'Torino, Italy'
      || cohort == 'Utrecht, Netherlands')
      return 'Population Based';
  }
  toggle() {
    this.show = !this.show;


    // CHANGE THE NAME OF THE BUTTON.
    if (this.show)
      this.buttonName = "Hide Additional Details";
    else
      this.buttonName = "Show Additional Details";
  }

  public onClick(e: any): void {



    var input: any = {
      FirstName: this.firstname,
      LastName: this.lastname,
      GeneratedID: "PID_" + this.patientidnumber,
      Gender: this.selectedgender,
      Dateofbirth: this.getStringFormattedDate(this.dateofbirth),
      Age: this.age,
      Address: this.address,
      Street: this.street,
      City: this.city,
      Postalcode: this.postcode,
      Country: this.country,
      Phone1: this.phone1,
      Phone2: this.phone2,

      Cohort: this.selectedcohort,
      Date: this.getStringFormattedDate(this.currentdate),
      Elescorial: this.selectedelescorial,
      Siteofonset: this.selectedsiteofonset,
      Dateofonset: this.getStringFormattedDate(this.dateofonset),
      Registertype: this.getRegisterType(),
      Presenceofdementia: this.selecteddementia,
      C9orf72: this.selectedc9orf72,
      DateofDiagnosis: this.getStringFormattedDate(this.dateofdiagnosis),
      Dateofdeath: this.getStringFormattedDate(this.dateofdeath),
      Onsettodiagnosis: this.onsettodiagnosis,
      Onsettodeath: this.onsettodeath,
      Diagnosistodeath: this.diagnosistodeath,

    }



    this.http.post<any>('https://mnd-database.herokuapp.com/PatientRegister', input)
      .subscribe(data => {

        if (data.errorMessage) {
          this.showfailurealert = true;
          setTimeout(() => this.showfailurealert = false, 3500);

          this.router.navigate(['/detailsform']);

        }
        else {

          this.showsuccessalert = true;
          setTimeout(() => {
            this.showsuccessalert = false;
            this.router.navigate(['/alsfrs-scoring'], { state: { patientdata: data, } });

          }, 2000);
        }
      })


  }
  public populateonsettodiagnosis() {
    this.onsettodiagnosis = this.monthDiff(this.dateofonset, this.dateofdiagnosis);

  }
  public populatebothvalues() {
    this.onsettodeath = this.monthDiff(this.dateofonset, this.dateofdeath);
    this.diagnosistodeath = this.monthDiff(this.dateofdiagnosis, this.dateofdeath);

  }
  public monthDiff(d1, d2): number {
    let date1 = new Date(d1);
    let date2 = new Date(d2);
    let years = date2.getFullYear() - date1.getFullYear();
    let months = (years * 12) + (date2.getMonth() - date1.getMonth());
    return months;
  }

  public getAge() {
    this.age = moment().diff(this.dateofbirth, 'years');
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

