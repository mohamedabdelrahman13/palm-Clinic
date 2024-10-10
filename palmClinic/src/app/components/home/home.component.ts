import { Block } from '@angular/compiler';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, viewChild } from '@angular/core';
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
  resResp:any|undefined;
  sympts:any[] | undefined = [];
  arSympts:any[] | undefined = [];
  relatedSympts:any[] | undefined = [];
  arRelatedSympts:any[] | undefined = [];
  relatedSympt:number = 0;
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
  english:boolean = true;
  arabic:boolean = false;
  currentLanguage:boolean = false;

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
        this.symptom.getAllSymptoms().subscribe((response)=>{
          this.resResp = response;
          this.symptomsList = this.resResp.model;
          this.organ = this.symptom.getOrganSymptomsByID(1);
          this.sympts = this.organ?.sympts;
          this.arSympts = this.organ?.ar_sympts;
          this.activeIndex = 0;
       });  
    console.log(this.organ)
    translate.setDefaultLang('en');
    console.log(this.symptomsList)
    console.log(this.activeIndex);
    this.lang.getCurrentLang.subscribe((status)=>{
      this.currentLanguage = status;
    })
   
  }
  translateLang(lang:string){
    this.translate.use(lang)
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

   //get the organ clicked
  getOrgan(id:number | undefined){
   this.organ = this.symptom.getOrganSymptomsByID(id);
   this.sympts = this.organ?.sympts;
   this.arSympts = this.organ?.ar_sympts;
   this.relatedSympts = this.organ?.relatedSympts;
   this.arRelatedSympts = this.organ?.ar_relatedSympts;
   console.log(this.symptomsList)
  //  console.log(this.sympts);
}
    //next btn logic
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
    //previous btn logic
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

  // shows leaves related symptoms
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
  //add selected symptom to symptoms list (check btn)
  selectSympt(index:number){
      let clickedSympt:string ='';
      if(!this.currentLanguage){
        if(this.sympts){
          for(let i = 0 ; i< this.sympts.length ; i++){
            if (i == index){
              clickedSympt = this.sympts? this.sympts[i] : undefined;
            }
          }
        }
      }
         if(this.currentLanguage){
           if(this.arSympts){
            for(let i = 0 ; i< this.arSympts.length ; i++){
              if (i == index){
                clickedSympt = this.arSympts? this.arSympts[i] : undefined;
              }
            }
          }
         }
    this.symptom.addToSelectedSymptoms(clickedSympt);
    this.selected = true;
    this.removed =false;
    setTimeout(()=>{
      this.selected = false;
    } , 1000)
    console.log(this.selected)
    console.log(this.selectedsympts);
    }

    // add selected related symptoms of leaves 
  selectRsympt(index:number){
      let clickedRsympt:string ='';
      if(!this.currentLanguage){
        if(this.relatedSympts){
          for(let i = 0 ; i<this.relatedSympts.length ; i++){
            if (i == index){
              clickedRsympt = this.relatedSympts ? this.relatedSympts[i] : undefined;
            }
          }
        }
      }
      else if(this.currentLanguage){
        if(this.arRelatedSympts){
          for(let i = 0 ; i<this.arRelatedSympts.length ; i++){
            if (i == index){
              clickedRsympt = this.arRelatedSympts ? this.arRelatedSympts[i] : undefined;
            }
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
    
    //check if the symptom is in the symptoms list or not
    isSymptomSelected(sympt:String){
      return this.selectedsympts.includes(sympt);
     }
    isArSymptomSelected(arSympt:String){
      return this.selectedsympts.includes(arSympt);
     }


    //remove selected symptoms from the symptoms list
    removeSympt(index:number){
      let removedSympt:string ='';
      if(!this.currentLanguage){
        if(this.sympts){
          for(let i = 0 ; i<this.sympts.length ; i++){
            if (i == index){
              removedSympt = this.sympts? this.sympts[i] : undefined;
            }
          }
        }
      }
      else if(this.currentLanguage){
        if(this.arSympts){
          for(let i = 0 ; i<this.arSympts.length ; i++){
            if (i == index){
              removedSympt = this.arSympts? this.arSympts[i] : undefined;
            }
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

    //remove selected related symptom from symptoms list
    removeRsympt(index:number){
      let removedRsympt:string ='';
      if(!this.currentLanguage){
        if(this.relatedSympts){
          for(let i = 0 ; i<this.relatedSympts.length ; i++){
            if (i == index){
              removedRsympt = this.relatedSympts? this.relatedSympts[i] : undefined;
            }
          }
        }
      }
      else if(this.currentLanguage){
        if(this.arRelatedSympts){
          for(let i = 0 ; i<this.arRelatedSympts.length ; i++){
            if (i == index){
              removedRsympt = this.arRelatedSympts? this.arRelatedSympts[i] : undefined;
            }
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

    //check if related symptom of leaves is in the list or not 
    isRsymptomSelected(Rsympt:String){
      return this.selectedsympts.includes(Rsympt);
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
          console.log(this.Result);
          if(this.Result.model == null){
            this.isModelNull = true; 
         }
         else{     
          this.isModelHasValue = true;
          console.log(this.Result.model.e_Name);
         }
        });
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

  



 




