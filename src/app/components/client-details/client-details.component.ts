import { Component, OnInit } from '@angular/core';
import { CleintService } from 'src/app/services/cleint.service';
import { Client } from 'src/app/models/Client';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SettingsService } from 'src/app/services/settings.service';
import { Settings } from 'src/app/models/Settings';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  id :string;
  client : Client;
  hasBalance : boolean = false;
  showBalanceUpdateInput : boolean ;
  allowBalanceOnEdit: boolean;

  constructor(
    private clientService : CleintService,
    private router : Router,
    private route : ActivatedRoute,
    private flashMessage  : FlashMessagesService,
    private settingsService  : SettingsService
       ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe(client => {
      if(client != null)  {
        if(client.balance > 0){
          this.hasBalance = true;
        }
      }
      this.client = client
    });
    this.settingsService.getSettings().subscribe((settings:Settings)=>{
      this.allowBalanceOnEdit = !settings.disableBalanceOnEdit
    });
    
  }

  updateBalance(){
    this.clientService.updateClient(this.client);
    this.flashMessage.show("Balance Updated",{cssClass:"ui green inverted raised alert segment"});
    this.router.navigate(["/"])
  }

  onDeleteClick(){
    if(confirm("Are you sure?")){
      this.clientService.deleteClient(this.client)
      this.flashMessage.show("Client Removed",{cssClass:"ui green inverted raised alert segment"});
      this.router.navigate(['/dashboard'])
    }
  }

}
