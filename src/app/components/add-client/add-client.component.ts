import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from 'src/app/models/Client';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormsModule } from '@angular/forms'
import { timeout } from 'rxjs/operators';
import { CleintService } from 'src/app/services/cleint.service';
import { Router } from '@angular/router';
import { SettingsService } from 'src/app/services/settings.service';
import { Settings } from 'src/app/models/Settings';



@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    balance: 0,
  }


  disabledBalanceOnAdd: boolean  ;
  @ViewChild('clientForm') form: any;
  constructor(
    private flashMessage: FlashMessagesService,
    private clientService: CleintService,
    private router: Router,
    private settingsService: SettingsService
  ) {

  }

  ngOnInit(): void {
    this.settingsService.getSettings().subscribe((settings:Settings)=>{
      this.disabledBalanceOnAdd = settings.disableBalanceOnAdd
    });
    
  }

  onSumbit({ value, valid }: { value: Client, valid: boolean }) {
    if (this.disabledBalanceOnAdd) {
      value.balance = 0;
    }

    if (!valid) {
      this.flashMessage.show("Please fill out the form correctly", { cssClass: 'ui red inverted raised alert segment', timeout: 3000 })
    } else {
      this.clientService.addNewClient(value);
      this.flashMessage.show("User Added Sucessfully", { cssClass: 'ui green inverted raised alert segment', timeout: 3000 })
      this.router.navigate(["/"]);
    }

  }

}
