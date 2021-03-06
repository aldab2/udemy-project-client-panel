import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {Client} from '../models/Client'
import { map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class CleintService {

  clientsCollection : AngularFirestoreCollection<Client>;
  clientDoc : AngularFirestoreDocument<Client>;
  clients : Observable<Client[]>;
  client : Observable<Client>;



  constructor(private afs: AngularFirestore) {
    this.clientsCollection = this.afs.collection("clients",
    ref => ref.orderBy('lastName',"asc"));
   }

   getClients():Observable<Client[]>{
     this.clients = this.clientsCollection.snapshotChanges().pipe(map(changes=> {
      return changes.map(action => {
        const data = action.payload.doc.data() as Client;
        data.id = action.payload.doc.id
        return data;
      });
    }));

  
    return this.clients;
   }

   getClient(id:string): Observable<Client>{
    this.clientDoc = this.afs.doc<Client>(`clients/${id}`);
    this.client = this.clientDoc.snapshotChanges().pipe(
      map(action=>{
        if(action.payload.exists === false){
          return null;
        }
        else {
          const data = action.payload.data() as Client;
          data.id = action.payload.id;
          return data;
        }
      }));
  
    return this.client;
   }


   addNewClient(newClient : Client){
      this.clientsCollection.add(newClient);
  }

  updateClient(client:Client){
    this.clientDoc = this.afs.doc(`clients/${client.id}`);
    this.clientDoc.update(client);
  }

  deleteClient(client:Client){
    this.clientDoc = this.afs.doc(`clients/${client.id}`);
    this.clientDoc.delete();
  }

}
