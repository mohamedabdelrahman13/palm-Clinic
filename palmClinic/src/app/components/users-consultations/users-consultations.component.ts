import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserConsultationsService } from '../../services/user-consultations.service';

@Component({
  selector: 'app-users-consultations',
  templateUrl: './users-consultations.component.html',
  styleUrl: './users-consultations.component.css'
})
export class UsersConsultationsComponent {
  userConsultations:any|undefined;
  showPhoto:boolean = false;
  clickedPhotos:string[] = [];
  constructor(private http:HttpClient , private userC:UserConsultationsService){
    
  }

  showConsult(){
    this.userC.getUsersConsultations().subscribe((response) => {
      this.userConsultations = response;
      console.log(response)
    })


    
    // const Token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImFkbWluWEtRMjkxIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6ImFkbWluWEtRMjkxIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE3MzA1MjgzOTQsImlzcyI6InlvdXJJc3N1ZXIiLCJhdWQiOiJ5b3VyQXVkaWVuY2UifQ.rQtqVJ9DJIGIF_ba1Zxm44yUc4rKpGWVKJTk2vEvYlg'
    // const headers = new HttpHeaders({
    //   'Authorization' : `Bearer ${Token}`
    // })
  
  //  this.http.get('http://palmclinic.runasp.net/api/Admin/Consultation' , {headers}).subscribe((response) => {
  //   console.log(response);
  //  })
  }
  showPhotos(photoUrls:string[]){
      this.clickedPhotos = photoUrls
  }
  hidePhotos(){
      this.clickedPhotos = [];
  }

}
