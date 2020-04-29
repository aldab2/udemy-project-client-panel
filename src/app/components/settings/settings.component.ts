import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
import { Settings } from 'src/app/models/Settings';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  
  settings : Settings ;
 
  

  constructor(
    private settingsService: SettingsService,
    private router : Router,
    private flashMessage : FlashMessagesService
  ) { }

  ngOnInit(): void {
     this.settingsService.getSettings().subscribe((settings:Settings)=>{
       this.settings = settings
     });
  }

  onSubmit(){
    console.log(this.settings)
    this.settingsService.updateSettings(this.settings);
    this.flashMessage.show("Your settings has been updated. ",{cssClass :'ui green inverted raised alert segment',timeout:3000})

    this.router.navigate(['/']);

  }

}
