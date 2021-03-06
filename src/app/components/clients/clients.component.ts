import { Component, OnInit } from '@angular/core';
import { CleintService } from 'src/app/services/cleint.service';
import { Client } from 'src/app/models/Client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients : Client[];
  totalOwed : number;

  constructor(private clientService :CleintService) { }

  ngOnInit(): void {
    this.clientService.getClients().subscribe(clients =>{
      this.clients = clients;
      this.getTotalOwed();
    });
  }
  getTotalOwed(){
    this.totalOwed = this.clients.reduce((total,client)=>{
      return total+client.balance;
    },0);
     
  }



}
