import { Injectable } from '@angular/core';
import { organs } from '../models/organs.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class SymptomsService {
  private symptomsList:organs[] = [];
  private resRes:any | undefined
  private result:any|undefined;
  private partCode:string[] = [];
  private selectedPartsAndSymptoms: { partCode: string, symptomCode: string[] }[] = [];
  private clicked = new BehaviorSubject<boolean>(false);
  private selectedSympts = new BehaviorSubject<{ partCode: string, symptomCode: string[] }[]>([]);


  get isClicked():Observable<boolean>{
    return this.clicked.asObservable()
  }
  get selectedSymptoms():Observable<{ partCode: string, symptomCode: string[] }[]>{
    return this.selectedSympts.asObservable()
  }
  
  
 
  constructor(private http:HttpClient , private translate:TranslateService) { 
    this.http.get("http://palmclinic.runasp.net/api/Diseases/Data").subscribe((response)=>{
      this.resRes = response;
      this.symptomsList = this.resRes.model;
    })
  }
  

  getAllData(){
    return  this.http.get("http://palmclinic.runasp.net/api/Diseases/Data") 
  }
  getClicked(){
    this.clicked.next(true) ;
  }
  notClicked(){
    this.clicked.next(false) ;
  }
  addToSelectedSymptoms(partCode:string , symptom:string){
    let part = this.selectedPartsAndSymptoms.find(p => p.partCode === partCode);
    if(part){
      part.symptomCode.push(symptom);
    } else {
      this.selectedPartsAndSymptoms.push({
        partCode: partCode,
        symptomCode: [symptom]
      });
    }
    this.selectedSympts.next(this.selectedPartsAndSymptoms);
  }
  removeSelectedSymptoms(partCode: string, symptom: string){
    let part = this.selectedPartsAndSymptoms.find(p => p.partCode === partCode);

    if(part){
      part.symptomCode = part.symptomCode.filter(s => s !== symptom);
      if (part.symptomCode.length === 0) {
        this.selectedPartsAndSymptoms = this.selectedPartsAndSymptoms.filter(p => p.partCode !== partCode);
      }
    }
    this.selectedSympts.next(this.selectedPartsAndSymptoms);
  }

  clearSymptoms(){ 
    this.selectedPartsAndSymptoms = [];
    this.selectedSympts.next([]);
  }

  getOrganSymptoms(index:number){
    let organSymptoms = this.symptomsList[index]
    return organSymptoms;
  }
  
  getResults(){
    return this.http.post("http://palmclinic.runasp.net/api/Diseases/find-disease" , this.selectedPartsAndSymptoms)
  }
}
