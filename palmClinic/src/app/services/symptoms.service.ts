import { Injectable } from '@angular/core';
import { organs } from '../models/organs.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SymptomsService {
  private symptomsList:organs[];
  private symptoms:String[] = []
  private clicked = new BehaviorSubject<boolean>(false);
  private selectedSympts = new BehaviorSubject<String[]>([])


  get isClicked():Observable<boolean>{
    return this.clicked.asObservable()
  }
  get selectedSymptoms():Observable<String[]>{
    return this.selectedSympts.asObservable()
  }
  
  
 
  constructor(private http:HttpClient) { 
    
    this.symptomsList=[
      {id:1 , name:"Root" , imgUrl:"assets/roots2.jpg" , sympts:["Roots appear black, brown, or mushy instead of firm and white" , "Dark lesions on the root" , "A foul smell emanates from the root area" , "vascular discoloration to the reddish-brown or pink in the internal tissue of the roots and lower trunk"] , relatedSympts:["" , "" , "" , ""] , selected:false},
      {id:2 , name:"Leaves" , imgUrl:"assets/leaves2.jpg", sympts:["Fresh Leaves" , "Old Leaves" , "Fresh and old Leaves" , "Leaves bases"] , relatedSympts:["Yellowing and wilting" , "A reddish brown or dark-brown stripe along the midrib of the leaves" , "Very small black fungal bodies appear on the leaf blades, especially on the oldest leaves" , "Related brownish discoloration and rot"], selected:false},
      {id:3 , name:"Floral Inflouroscence" ,  imgUrl:"assets/floralInflouroscence.jpg" , sympts:["Black discoloration" , "Pink discoloration" , "Infected inflorescences are soft and water-soaked, and a foul smell may emanate" , ""] , relatedSympts:["" , "" , "" , ""], selected:false},
      {id:4 , name:"Buds" , imgUrl:"assets/buds.jpg" , sympts:["Death of the terminal bud, or bending head of the palm and wilt" , "Heart or Trunk Rot" , "" , ""] , relatedSympts:["" , "" , "" , ""], selected:false},
      {id:5 , name:"Fruits" , imgUrl:"assets/fruits.jpg" , sympts:["Brown or black spots on the fruits" , "Soft, water-soaked spots on the fruits" , "Wilting and dropping fruits prematurely" , "Visible fungal growth on the fruit" , "Emanating a foul smell from the rotting fruits"] , relatedSympts:["" , "" , "" , ""], selected:false}
    ]
    // this.symptomsList = [
    //   {id:1 , name:"Root" , imgUrl:"assets/root.png" , s1:"Vascular discoloration to the reddish-brown" , s2:"Dark lesions on the root" , s3:null , s4:null , relatedS1:null, relatedS2: null , relatedS3:null, relatedS4:null } ,
    //   {id:2 , name:"Leaves" , imgUrl:"assets/leaves.jpg" , s1:"Fresh Leaves" , s2:"Old Leaves" , s3:"Fresh and old Leaves" , s4:"Leaves bases" , relatedS1: "yellowing and wilting" , relatedS2:"A reddish brown or dark-brown stripe along the midrib of the leaves" , relatedS3:"very small black fungul bodies" , relatedS4:"related brownish discoloration and rot" }, 
    //   {id:3 , name:"Floral Inflouroscence" , imgUrl:"assets/floralInflouroscence.jpg" , s1:"black discoloration" , s2:"pink discoloration" , s3: null , s4:null, relatedS1: null , relatedS2:null , relatedS3:null, relatedS4:null},
    //   {id:4 , name:"buds" , imgUrl:"assets/buds.jpg" , s1:"death of the central cluster leaves OR bending head" , s2:null , s3:null , s4:null , relatedS1: null , relatedS2:null , relatedS3:null , relatedS4:null },
    //   {id:5 , name:"Fruits" , imgUrl:"assets/fruits.jpg" , s1:"fruit rot and drop" , s2:null , s3:null , s4:null , relatedS1: null , relatedS2:null , relatedS3:null, relatedS4:null }    
    // ]
  }
  
  getClicked(){
    this.clicked.next(true) ;
  }
  notClicked(){
    this.clicked.next(false) ;
  }
  addToSelectedSymptoms(sympt:String){
    this.symptoms.push(sympt);
    const currentSympts = this.selectedSympts.value;
    this.selectedSympts.next([...currentSympts , sympt])
  }
  removeSelectedSymptoms(sympt:String){
    this.symptoms=this.symptoms.splice(this.symptoms.indexOf(sympt)-1 , 1);
    const currentSympts = this.selectedSympts.value;
    const updatedSympts = currentSympts.filter(s => s !== sympt)
    this.selectedSympts.next(updatedSympts);
  }

  clearSymptoms(){ 
    this.symptoms = [];
    this.selectedSympts.next([]);
  }

  isInSelectedList(sympt:String){
   return this.symptoms.includes(sympt) ? true : false;
  }

  getOrganSymptoms(){
    return this.symptomsList;
  }

  getOrganSymptomsByID(id:number | undefined){
    let organSymptoms = this.symptomsList.find((organ) => organ.id == id)
    return organSymptoms;
  }
  
  getResults(){
    return this.http.post('http://palmclinic.runasp.net/api/Diseases/find-by-symptoms', this.symptoms)
  }
}
