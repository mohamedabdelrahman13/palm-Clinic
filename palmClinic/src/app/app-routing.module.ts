import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ConsultantComponent } from './components/consultant/consultant.component';

const routes: Routes = [
  {path:'' , component:HomePageComponent},
  {path:'homePage' , component:HomePageComponent},
  {path:'diagnosis' , component:HomeComponent},
  {path:'Consultation' , component:ConsultantComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
