import { Injectable } from '@angular/core';
import { Settings } from '../models/Settings';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseAuth } from '@angular/fire';


@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  settings: Settings = {
    allowRegistration : false,
    disableBalanceOnAdd : false,
    disableBalanceOnEdit : false
  }
  
  settingsCollection : AngularFirestoreCollection
  

  constructor(private firestore : AngularFirestore,private anAuth : AngularFireAuth) { 
   /*  if(localStorage.getItem("settings")){
      this.settings = JSON.parse(localStorage.getItem("settings"))
    } */
   

 
  }


  getSettings():Observable<Settings>{
 
      this.settingsCollection = this.firestore.collection("settings");
      return this.settingsCollection.doc<Settings>("main").valueChanges();
   
  }


  updateSettings(settings:Settings){
    //localStorage.setItem("settings",JSON.stringify(settings));
    this.settingsCollection = this.firestore.collection("settings");
    return this.settingsCollection.doc<Settings>("main").update(settings);

  }
}
