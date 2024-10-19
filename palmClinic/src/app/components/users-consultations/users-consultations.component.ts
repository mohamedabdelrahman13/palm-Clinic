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
    })
  }
  showPhotos(photoUrls:string[]){
      this.clickedPhotos = photoUrls
  }
  hidePhotos(){
      this.clickedPhotos = [];
  }

}
