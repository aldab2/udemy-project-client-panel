import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/Client';
import { CleintService } from 'src/app/services/cleint.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SettingsService } from 'src/app/services/settings.service';
import { Settings } from 'src/app/models/Settings';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  id : string;
  client : Client = {
    firstName :"",
    lastName :"",
    email :"",
    phone :"",
    balance : 0
  }
  disableBalanceOnEdit:boolean;

  constructor(private clientService : CleintService,
    private router : Router,
    private route : ActivatedRoute,
    private flashMessage  : FlashMessagesService,
    private settingsService : SettingsService
    
    ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe((client:Client) =>{
      this.client = client;
      console.log(this.client);
    });
    this.settingsService.getSettings().subscribe((settings:Settings)=>{
      this.disableBalanceOnEdit = settings.disableBalanceOnEdit
    });
  }

  onSumbit({value,valid}:{value:Client, valid:boolean}){
    if(!valid){
      this.flashMessage.show("Please fill out the form correctly",{cssClass :'ui red inverted raised alert segment',timeout:3000})
    } else {
      value.id = this.id;
      this.clientService.updateClient(value);
      this.flashMessage.show("Client Updated Sucessfully",{cssClass :'ui green inverted raised alert segment',timeout:3000})
      this.router.navigate([`/client/${this.id}`]);
    }
  }

}
