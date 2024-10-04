import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ConsultantComponent } from './components/consultant/consultant.component';
import { LoginComponent } from './components/login/login.component';
import { UsersConsultationsComponent } from './components/users-consultations/users-consultations.component';

const routes: Routes = [
  {path:'' , component:HomePageComponent},
  {path:'homePage' , component:HomePageComponent},
  {path:'login' , component:LoginComponent},
  {path:'diagnosis' , component:HomeComponent},
  {path:'Consultation' , component:ConsultantComponent},
  {path:'userConsultations' , component:UsersConsultationsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
