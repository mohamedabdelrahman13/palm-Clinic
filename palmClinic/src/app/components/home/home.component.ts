import { Block } from '@angular/compiler';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, viewChild } from '@angular/core';
import { SymptomsService } from '../../services/symptoms.service';
import { organs } from '../../models/organs.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit , AfterViewInit{
  @ViewChild('relatedS') relatedS!: ElementRef<HTMLElement>;
  // @ViewChild('select') select!: ElementRef<HTMLElement>;
  // @ViewChild('remove') remove!: ElementRef<HTMLElement>;
  Clicked:boolean = false;
  activeIndex:number | undefined =0;
  activeSympt:number | undefined = 0;
  symptomClicked:boolean = false;
  isAtLeaves:boolean = false;
  symptomsList:organs[] = [];
  sympts:any[] | undefined = []
  relatedSympts:any[] | undefined = [];
  relatedSympt:number = 0
  organ:organs | undefined;
  isSelected:boolean = false;
  Result:any|undefined;
  activeRelatedS:number = 0;
  selectedsympts:String[] = [];
  isModelNull:boolean = false;
  isModelHasValue:boolean = false;
  scrolled:boolean = false;
  loading:boolean = false;
  selected:boolean = false;
  removed:boolean = false;

  @ViewChild('arrow') arrow!:ElementRef<HTMLElement>
  @ViewChild('progressLine') progressLine!:ElementRef<HTMLElement>
  @ViewChild('body') body!:ElementRef<HTMLElement>
  constructor(private symptom:SymptomsService
     , private toastr:ToastrService
      ,private http : HttpClient
      ,private detector:ChangeDetectorRef
      ,private router:Router){   
    this.symptomsList = this.symptom.getOrganSymptoms();
    this.organ = this.symptom.getOrganSymptomsByID(1);
    this.sympts = this.organ?.sympts;
    // this.activeIndex = 0;
    console.log(this.activeIndex);
   
  }
  ngAfterViewInit(): void {
    // scrollY = 0;
    this.progression();
  }
  
  ngOnInit(): void {
      window.scrollTo(0, 0);
    this.symptom.isClicked.subscribe((status)=>{
      this.Clicked = status;
    })
    this.symptom.selectedSymptoms.subscribe((symptom)=>{
      this.selectedsympts = symptom;
    })
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollPosition = window.scrollY;
    this.scrolled = scrollPosition > 50;
  }
  goUpward(){
    scroll(0,0);
  }
  
  setActive(index:number){
    this.activeIndex = index;
    this.progression();
    // console.log(this.activeIndex)
 
  }

  progression(){
    switch(this.activeIndex){
      case 0: this.progressLine.nativeElement.classList.add('w1');
          this.progressLine.nativeElement.classList.remove('w2' , 'w3' , 'w4' , 'w5');
      break;
      case 1: this.progressLine.nativeElement.classList.add('w2')
      this.progressLine.nativeElement.classList.remove('w3' , 'w4' , 'w5');
      break;
      case 2: this.progressLine.nativeElement.classList.add('w3')
      this.progressLine.nativeElement.classList.remove( 'w4' , 'w5');
      break;
      case 3: this.progressLine.nativeElement.classList.add('w4')
      this.progressLine.nativeElement.classList.remove('w5');
      break;
      case 4: this.progressLine.nativeElement.classList.add('w5')
      break;
    }
   }
  getOrgan(id:number | undefined){
   this.organ = this.symptom.getOrganSymptomsByID(id);
   this.sympts = this.organ?.sympts;
   this.relatedSympts = this.organ?.relatedSympts;
  //  console.log(this.sympts);
  }
  
  previous(id:number | undefined){
    if(id?id > 1:undefined){
      this.getOrgan(id?id-1:undefined)
      console.log(this.organ?.id);
      this.activeIndex = this.organ?.id ? this.organ.id-1 : undefined;
      this.progression();
      // this.organ = this.symptom.getOrganSymptomsByID(id?id-1:undefined);
      // this.sympts = this.organ?.sympts;
      // this.relatedSympts = this.organ?.relatedSympts;
   }
   else if(id?id === 2:undefined || this.activeIndex === 1){
     this.isAtLeaves = true;
   }
   else{
    this.organ = this.symptom.getOrganSymptomsByID(1);
    this.activeIndex = 0;
   }
  }
  next(id:number | undefined){
    if(id?id < 5:undefined){
      this.getOrgan(id?id+1:undefined);
      this.activeIndex = this.organ?.id ? this.organ.id-1 : undefined;
      this.progression();
      // this.organ = this.symptom.getOrganSymptomsByID(id?id+1:undefined);
      // this.sympts = this.organ?.sympts;
      // this.relatedSympts = this.organ?.relatedSympts;
    }
  }
  showRelatedS(i:number){
       let rsympArr = this.organ?.relatedSympts;
       if(rsympArr){
       for(let k = 0 ; k < rsympArr.length ; k++){
         if(k == i){
           this.relatedSympt = k;
           this.activeRelatedS = k;
          }
       }
      }
  }

  selectSympt(index:number){
      let clickedSympt:string ='';
      if(this.sympts){
        for(let i = 0 ; i< this.sympts.length ; i++){
          if (i == index){
            clickedSympt = this.sympts? this.sympts[i] : undefined;
          }
        }
      }
    this.symptom.addToSelectedSymptoms(clickedSympt);
    // this.toastr.success('symptom selected!' , '' ,{closeButton : true
    //   , timeOut:2000})
    this.selected = true;
    this.removed =false;
    setTimeout(()=>{
      this.selected = false;
    } , 1000)
    console.log(this.selected)
    console.log(this.selectedsympts);
    }
  selectRsympt(index:number){
      let clickedRsympt:string ='';
      if(this.relatedSympts){
        for(let i = 0 ; i<this.relatedSympts.length ; i++){
          if (i == index){
            clickedRsympt = this.relatedSympts ? this.relatedSympts[i] : undefined;
          }
        }
      }
    this.symptom.addToSelectedSymptoms(clickedRsympt);
    this.selected = true;
    this.removed =false;
    setTimeout(()=>{
      this.selected = false;
    } , 1000)
    console.log(this.selectedsympts);
    }
    
    isSymptomSelected(sympt:String){
      return this.selectedsympts.includes(sympt);
     }

    removeSympt(index:number){
      let removedSympt:string ='';
      if(this.sympts){
        for(let i = 0 ; i<this.sympts.length ; i++){
          if (i == index){
            removedSympt = this.sympts? this.sympts[i] : undefined;
          }
        }
      }

    this.symptom.removeSelectedSymptoms(removedSympt);
    this.removed=true;
    setTimeout(()=>{
      this.removed = false;
    } , 1000)
    console.log(removedSympt);
    console.log(this.selectedsympts);
    }
    removeRsympt(index:number){
      let removedRsympt:string ='';
      if(this.relatedSympts){
        for(let i = 0 ; i<this.relatedSympts.length ; i++){
          if (i == index){
            removedRsympt = this.relatedSympts? this.relatedSympts[i] : undefined;
          }
        }
      }
    this.symptom.removeSelectedSymptoms(removedRsympt);
    this.removed = true;
    setTimeout(()=>{
      this.removed = false;
    } , 1000)
    console.log(removedRsympt);
    console.log(this.selectedsympts);
    }
    isRsymptomSelected(Rsympt:String){
      return this.selectedsympts.includes(Rsympt);
     }

     showResult(){
      window.scroll(50 , 50)
      this.body.nativeElement.classList.add('blur-body');
       this.loading = true;
       setTimeout(()=>{
         this.loading = false;
        } , 2000)
        this.symptom.getResults().subscribe((response)=>{
          this.Result = response;
          console.log(this.Result);
          if(this.Result.model == null){
            this.isModelNull = true; 
         }
         else{     
          this.isModelHasValue = true;
          console.log(this.Result.model.e_Name);
         }
        });
      //   this.http.post('http://palmclinic.runasp.net/api/Diseases/find-by-symptoms', this.selectedsympts).subscribe((response) => {this.Result = response;
      //   console.log(this.Result);
        

      // })
     }

     redefine(){
       this.isModelNull=false;
       this.symptom.clearSymptoms();

       
      }
      return(){
        this.body.nativeElement.classList.remove('blur-body');
        this.symptom.clearSymptoms();
        console.log(this.selectedsympts)
        this.isModelHasValue=false;
        this.Result = undefined; 
  }
      logR(){
        console.log(this.Result);
      }
      goToConsultation(){
        this.router.navigateByUrl('/Consultation')
      }
  }
  
  
  // hideRelatedS(){
  //       const element = this.arrow.nativeElement as HTMLElement;
  //       element.classList.remove('rotate')
  //       this.symptom.notClicked()      
  // }



 




