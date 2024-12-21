import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { LanguagesService } from '../../services/languages.service';
// import {MatSnackBar} from '@angular/material/snack-bar';
// import {MatButtonModule} from '@angular/material/button';
// import {MatInputModule} from '@angular/material/input';
// import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-consultant',
  templateUrl: './consultant.component.html',
  styleUrl: './consultant.component.css'
})
export class ConsultantComponent implements OnInit{
  ConsultationForm!:FormGroup;
  photos:File[] = [];
  userShowedPhotos:File[] = [];
  loading:boolean = false;
  Result:any | undefined; 
  successMessage:string = '';
  currentLanguage:boolean = false;
  constructor(private fb:FormBuilder 
    ,private http:HttpClient
    ,private taost:ToastrService
    , private language:LanguagesService){
    this.language.getCurrentLang.subscribe((status)=>{this.currentLanguage = status})
  }
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.ConsultationForm = this.fb.group({
      Email:['' , Validators.required],
      Title:['' , Validators.required],
      Name:['' , Validators.required],
      Phone:['' , Validators.required],
      messsage:['' , Validators.required],
      Suggestions:[''],
      photos:[''],
    }) 
   }
 
  onSubmit(){
    if(this.ConsultationForm.valid){
    const formData = new FormData();
    formData.append('Name', this.ConsultationForm.get('Name')?.value);
    formData.append('Title', this.ConsultationForm.get('Title')?.value);
    formData.append('Phone', this.ConsultationForm.get('Phone')?.value);
    formData.append('Email', this.ConsultationForm.get('Email')?.value);
    formData.append('messsage', this.ConsultationForm.get('messsage')?.value);
    formData.append('Suggestions', this.ConsultationForm.get('Suggestions')?.value);
    if (this.photos.length > 0) {
      this.photos.forEach((photo , index) => {
        formData.append('photos', photo);
      });
    }
    this.http.post("http://palmclinic.runasp.net/api/Diseases/Consultation" , formData).subscribe(
      {next:
        
    (response : any)=>{
      console.log(response)
      this.loading = true;
       setTimeout(()=>{
         this.loading = false;
        } , 5000)
      this.Result = response;
    }
      ,
    error : (err)=>{
      this.loading = true;
       setTimeout(()=>{
         this.loading = false;
        } , 500)
      this.taost.error("Server error , try again later" , '' , {
        timeOut:4000
      })
    }}
    )
    }
    else{
      console.log('error')
    }

    this.ConsultationForm.reset()
  }

  

  redefine(){
    this.Result = undefined;
  }
  
  onSelectimg(e:Event | any){
    const files = e.target.files;
    let reader = new FileReader();
    for (let i = 0; i < files.length; i++) {
      this.photos.push(files[i]);  
    }   
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (event:any)=>{
      this.userShowedPhotos.push(event.target.result)
    }
  }
  
}
