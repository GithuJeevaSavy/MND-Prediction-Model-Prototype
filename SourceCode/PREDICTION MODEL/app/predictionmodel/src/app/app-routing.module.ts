import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import  {LoginpageComponent} from '../app/loginpage/loginpage.component';
import {HomeComponent} from '../app/home/home.component';
import { DetailsformComponent } from './detailsform/detailsform.component';
import {AlsfrsScoringComponent} from './alsfrs-scoring/alsfrs-scoring.component';
import { AppComponent } from './app.component';
import { ClinicaltrialsComponent } from './clinicaltrials/clinicaltrials.component';
import { PatientregisterComponent } from './patientregister/patientregister.component';
import { PatientinfoComponent } from './patientinfo/patientinfo.component';
import { GraphviewComponent } from './graphview/graphview.component';
import { ExampletrialComponent } from './exampletrial/exampletrial.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [  
  {
  path:'',
  component: LoginpageComponent,
},
{
  path:'pagenotfound',
  component:PagenotfoundComponent,
},

    {
      path:'',
      component:DashboardComponent,
      children:[
        {
          path:'home',
          component:HomeComponent,
        
        },
    {
        path:'detailsform',
        component:DetailsformComponent,
      
      },
      {
        path:'alsfrs-scoring',
        component:AlsfrsScoringComponent,
      
      },
      {
        path:'clinicaltrials',
        component:ClinicaltrialsComponent,
      },
      {
        path:'patientregister',
        component:PatientregisterComponent,
    
      },
      {
        path:'patientinfo',
        component:PatientinfoComponent,
      },
      {
        path:'graphview',
        component:GraphviewComponent,
      },
      {
        path:'exampletrial',
        component:ExampletrialComponent,
      },
      
      {
        path: '**', redirectTo: '/pagenotfound'
      }
    ]
  }
  


// {
//   path:'login',
//   component: LoginpageComponent,
// },

  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
