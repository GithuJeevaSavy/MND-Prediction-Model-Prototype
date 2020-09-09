import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-graphview',
  templateUrl: './graphview.component.html',
  styleUrls: ['./graphview.component.css']
})
export class GraphviewComponent implements OnInit {
  patient: any = {};
  routerState: any;
  showspinner = true;
  scoringdata: any;
  lengthofdata: any;

  graphdata: any = [];
  title = 'ALSFRS SCORING';
  type = 'ColumnChart';

  comparisongraph = false;
  title2 = 'ALSFRS SCORING COMPARISON';
  type2 = 'LineChart';
  allData: any = []
  Data2: any = []
  LineData: any = []



  columnNames = ['Scores', 'Score', { role: 'style' }, { role: 'annotation' }];

  columnNames2 = ['Scores', 'Score', { role: 'style' }, { role: 'annotation' }];

  options = {
    is3D: true,

    legend: 'left'
  };

  width = 600;
  height = 500;

  constructor(private router: Router, private http: HttpClient,) {



    this.routerState = this.router.getCurrentNavigation().extras.state;
    if (this.routerState) {
      this.patient = this.routerState.selectedPatient;
    }
    this.http.get('https://mnd-database.herokuapp.com/ScoringRegister/' + this.patient._id)
      .subscribe(result => {
        this.showspinner = false;

        this.scoringdata = result;
        this.lengthofdata = this.scoringdata.length;

        if (this.lengthofdata > 1) {
          this.comparisongraph = true;
        }
        for (var i = this.lengthofdata - 1; i >= 0; i--) {

          let data = []
          // let data2 = []
          let dataarray = {
            bulbar: this.scoringdata[i].Bulbar,
            motor: this.scoringdata[i].Motor,
            respiratory: this.scoringdata[i].Respiratory,
            total: this.scoringdata[i].Total,
            dateofentry: this.scoringdata[i].Dateofentry
          }
          data.push(['Bulbar', dataarray.bulbar, 'color:#f01805', dataarray.bulbar]);
          data.push(['Motor', dataarray.motor, 'color:#f0d126', dataarray.motor]);
          data.push(['Respiratory', dataarray.respiratory, 'color:#18c947', dataarray.respiratory]);
          data.push(['Total', dataarray.total, 'color:#153fd6', dataarray.total]);
          this.Data2.push([dataarray.dateofentry, dataarray.total, 'color:red', dataarray.total]);
          let dataForGraph = {
            title: "ALSFRS Scores on    " + this.scoringdata[i].Dateofentry,
            chartData: data
          }

          this.allData.push(dataForGraph);


        }

        for (var i = this.Data2.length - 1; i >= 0; i--) {
          this.LineData.push(this.Data2[i]);
        }


      })

  }

  ngOnInit(): void {
    if (localStorage.getItem('token') != '5f43e796fd8aab2664ff146a') {
      this.router.navigate(['/']);
    }

  }
  public gobackfromgraphview() {
    this.router.navigate(['/patientinfo'], { state: { selectedPatient: this.patient, } });
  }
}
