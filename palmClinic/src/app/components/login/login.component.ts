import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  LoginForm!:FormGroup;
  loggedin:boolean = false;
  result:any | undefined;
  token:string = '';
  loading:boolean = false;
  showException:boolean = false;
  // to be removed
  locals:boolean = false;
  constructor(private fb:FormBuilder 
    , private http:HttpClient
    , private login:LoginService
    ,private router:Router
    ,private toaster:ToastrService){
      this.login.isLoggedIN.subscribe(status =>{
        this.loggedin = status;
    });
    this.login.localStor.subscribe((status) => {
      this.locals = status;
    })
  }

  ngOnInit(): void {
    this.LoginForm = this.fb.group({
      userName:['' , Validators.required],
      password:['' , Validators.required],
    });
  }

  onSubmit(){
    // to be removed
    console.log(this.locals)
      const headers = new HttpHeaders({
        'Content-Type' : 'application/json'
      });
            if(this.LoginForm.get('userName')?.value == 'adminXKQ291' && this.LoginForm.get('password')?.value == 'P@ssw0rdZ89!'){
              this.loading = true;
                      setTimeout(()=>{
                      this.loading = false;
                      } , 1000)
              this.http.post('http://palmclinic.runasp.net/api/Admin/Login' , this.LoginForm.value , {headers}).subscribe(
                {next:(response) =>{
                       if(response){
                    this.result = response;
                    this.token = this.result.result.model;
                    this.login.localstor()
                    this.router.navigate(['/userConsultations'],{replaceUrl:true})
                    this.login.Login(this.token);   
                  }
                  else{
                    this.showException = true;
                  }
                }
                ,
                error:(error) =>{
                  console.error('there was an error!' , error);
                  this.toaster.error('error Sending request, try again later','' , {
                        timeOut:4000
                      });
                }
              
              });
                
                // this.LoginForm.reset()
            }  
              else{
                this.toaster.error('invalid username or password','' , {
                  timeOut:2000
                });
              }
              
    
    
  
  }
  relogin(){
    this.showException = false;
  }
   
}


