import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  loading:boolean = false;
  Result:any | undefined; 
  successMessage:string = '';
  constructor(private fb:FormBuilder ,private http:HttpClient){
    
  }
  ngOnInit(): void {
      // this.snack.open('your form has been submitted successfully!' , 'close' , {
      //   duration:3000,
      // })
    
      
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
      this.loading = true;
       setTimeout(()=>{
         this.loading = false;
        } , 5000)
    if(this.ConsultationForm.valid){
    const formData = new FormData();
    formData.append('Name', this.ConsultationForm.get('Name')?.value);
    formData.append('Title', this.ConsultationForm.get('Title')?.value);
    formData.append('Phone', this.ConsultationForm.get('Phone')?.value);
    formData.append('Email', this.ConsultationForm.get('Email')?.value);
    formData.append('messsage', this.ConsultationForm.get('messsage')?.value);
    formData.append('Suggestions', this.ConsultationForm.get('Suggestions')?.value);
    formData.append('photos', this.ConsultationForm.get('photos')?.value);
    // if (this.photos.length > 0) {
    //   this.photos.forEach((photo) => {
    //     formData.append('photos[]', photo);
    //   });
    // }
    // formData.forEach((value, key) => {
    //   console.log(key, value);
    // });
    this.http.post("http://palmclinic.runasp.net/api/Diseases/Consultation" , formData).subscribe((response : any)=>{
      this.Result = response;
      console.log(response);
      console.log(this.photos);
    })
    console.log(formData)
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
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (event:any)=>{
      this.photos.push(event.target.result)
    }
  }
}
