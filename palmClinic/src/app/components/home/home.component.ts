import { Block } from '@angular/compiler';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnDestroy, OnInit, QueryList, ViewChild, viewChild } from '@angular/core';
import { SymptomsService } from '../../services/symptoms.service';
import { organs } from '../../models/organs.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Route, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguagesService } from '../../services/languages.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit , AfterViewInit , OnDestroy{
  @ViewChild('relatedS') relatedS!: ElementRef<HTMLElement>;
  Clicked:boolean = false;
  activeIndex:number =0;
  activeSympt:number | undefined = 0;
  symptomClicked:boolean = false;
  isAtLeaves:boolean = false;
  symptomsList:organs[] = [];
  resResp:any|undefined;
  sympts:any[] | undefined = [];
  arSympts:any[] | undefined = [];
  relatedSympts:any[] | undefined = [];
  arRelatedSympts:any[] | undefined = [];
  relatedSympt:number = 0;
  organ!: organs;
  isSelected:boolean = false;
  Result:any|undefined;
  activeRelatedS:number = 0;
  selectedsympts:any[] = [];
  isModelNull:boolean = false;
  isModelHasValue:boolean = false;
  scrolled:boolean = false;
  loading:boolean = false;
  selected:boolean = false;
  removed:boolean = false;
  english:boolean = true;
  arabic:boolean = false;
  currentLanguage:boolean = false;
  selectedSymptomsDescriptions:string[] = [];
  selectedSymptomsDescriptionsAr: string[] = [];
  infectedParts:string[]=[];
  infectedPartsAr:string[]=[];
  dataError:boolean = false;

  @ViewChild('arrow') arrow!:ElementRef<HTMLElement>
  @ViewChild('progressLine') progressLine!:ElementRef<HTMLElement>
  @ViewChild('body') body!:ElementRef<HTMLElement>
  constructor(private symptom:SymptomsService
     , private toastr:ToastrService
      ,private http : HttpClient
      ,private detector:ChangeDetectorRef
      ,private router:Router
      ,private translate:TranslateService
      ,private lang:LanguagesService){
        this.symptom.getAllData().subscribe({next:(response)=>{
          this.resResp = response;
          this.symptomsList = this.resResp.model;
          this.organ = this.symptom.getOrganSymptoms(0);
          this.sympts = this.organ?.symptomDTOs;
          this.arSympts = this.organ?.symptomDTOs;
          this.activeIndex = 0;
       },
      
      error:(error) => {this.dataError = true
      this.toastr.error('error retrieving data from server' , '' , {timeOut:9000})
      console.log(error)}}); 
    translate.setDefaultLang('en');  
    this.lang.getCurrentLang.subscribe((status)=>{
      this.currentLanguage = status;
    })

   
   
  }
  ngOnDestroy(): void {
    this.symptom.clearSymptoms();
    this.selectedSymptomsDescriptions = [];
    this.selectedSymptomsDescriptionsAr = [];
  }
  translateLang(lang:string){
    this.translate.use(lang)
  }
  ngAfterViewInit(): void {
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

   //get the organ clicked
  getOrgan(index:number){
   this.organ = this.symptom.getOrganSymptoms(index);
   this.sympts = this.organ?.symptomDTOs;
   this.arSympts = this.organ?.symptomDTOs;
}
    // next btn logic
    next(index:number){
      if(index < 5){
        this.getOrgan(index+1);
        this.activeIndex = this.activeIndex+1;
        this.progression();
      }
    }
    // previous btn logic
    previous(index:number){
      if(index>0){
        this.getOrgan(index-1)
        this.activeIndex = this.activeIndex-1 ;
        this.progression();
    }
  }

  //add selected symptom
  selectSympt(index:number){
      let clickedSympt:string ='';
        if(this.sympts){
          for(let i = 0 ; i< this.sympts.length ; i++){
            if (i == index){
              clickedSympt = this.sympts? this.sympts[index].symptomCode: undefined;
              this.selectedSymptomsDescriptions.push(this.sympts[index].symptomDescription);
              this.selectedSymptomsDescriptionsAr.push(this.sympts[index].symptomDescriptionAr);
            }
          }
        }
        
    this.symptom.addToSelectedSymptoms(this.organ?.partCode , clickedSympt);
    this.selected = true;
    this.removed =false;
    setTimeout(()=>{
      this.selected = false;
    } , 1000)
    }
    
    // check if the symptom is in the symptomslist or not
    isSymptomSelected(PC:string | undefined , sympt:string | undefined): boolean {
      for(let i = 0 ; i<=this.selectedsympts.length ; i++){
         if(this.selectedsympts[i]?.partCode == PC){
          for(let k = 0 ; k<= this.selectedsympts[i].symptomCode.length ; k++){
            if(this.selectedsympts[i].symptomCode[k] == sympt){
              return true
            }
          }
         }
      }
      return false
     }


    //remove selected symptoms from the symptoms list
    removeSympt(index:number){
      let removedSympt:string ='';
        if(this.sympts){
          for(let i = 0 ; i<this.sympts.length ; i++){
            if (i == index){
              removedSympt = this.sympts? this.sympts[index].symptomCode : undefined;
              //remove symptom from the array
              this.selectedSymptomsDescriptions = this.selectedSymptomsDescriptions.filter((ele)=>ele !== this.sympts?.[index].symptomDescription)
              this.selectedSymptomsDescriptionsAr= this.selectedSymptomsDescriptionsAr.filter((ele)=>ele !== this.sympts?.[index].symptomDescriptionAr)
            }
          }
        }
    this.symptom.removeSelectedSymptoms(this.organ?.partCode , removedSympt);
    this.removed=true;
    this.selected = false;
    setTimeout(()=>{
      this.removed = false;
    } , 1000)
    }

     //shows Diagnosis Results (show diagnosis btn)

    showResult(){
      window.scroll(50 , 50)
      this.body.nativeElement.classList.add('blur-body');
       this.loading = true;
       setTimeout(()=>{
         this.loading = false;
        } , 2000)
        this.symptom.getResults().subscribe((response)=>{
          this.Result = response;
          if(this.Result.model == null){
            this.isModelNull = true; 
         }
         else{     
          this.isModelHasValue = true;
         }
        });
     }

     redefine(){
       this.isModelNull=false;
       this.symptom.clearSymptoms();
       this.selectedSymptomsDescriptions = [];
       this.selectedSymptomsDescriptionsAr = [];
      }
      return(){
        this.body.nativeElement.classList.remove('blur-body');
        this.symptom.clearSymptoms();
        this.selectedSymptomsDescriptions = [];
        this.selectedSymptomsDescriptionsAr = [];
        this.isModelHasValue=false;
        this.Result = undefined; 
  }
      goToConsultation(){
        this.symptom.clearSymptoms();
        this.selectedSymptomsDescriptions = [];
        this.selectedSymptomsDescriptionsAr = [];
        this.router.navigateByUrl('/Consultation')
      }

      switchLangAr(){
        this.lang.arabic()
      }
      switchLangEn(){
        this.lang.english()
     
      }


      exportAsPDF(){
        const pdfElement = document.getElementById('pdfContent')
        html2canvas(pdfElement!).then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF();
          const imgWidth = 208;
          const imgHeight = (canvas.height * imgWidth-100) / canvas.width;
          pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
          pdf.save('Diagnosis Results.pdf');
        });
      }
   }

  



 




