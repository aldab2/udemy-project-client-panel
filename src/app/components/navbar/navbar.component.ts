import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SettingsService } from 'src/app/services/settings.service';
import { Settings } from '../../models/Settings';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn:boolean ;
  showRegister:boolean;
  loggedInUser : string
  

  constructor(
    private authService : AuthService,
    private router : Router,
    private flashMessage  : FlashMessagesService,
    private settingsService : SettingsService
  ) { }

  ngOnInit(): void {
    this.authService.getAuth().subscribe(auth =>{
      if(auth != null){
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      }
      else {
        this.isLoggedIn = false;

      }
    });
    this.settingsService.getSettings().subscribe((settings:Settings)=>{
      this.showRegister = settings.allowRegistration
    });
   
  }
  onLogoutClick(){
    this.authService.logout()
    .then(auth => {
      this.isLoggedIn = false;
    })
    ;
    //this.isLoggedIn = false;
    this.flashMessage.show("You are now logged out",{cssClass :'ui green inverted raised alert segment',timeout:3000})
    this.router.navigate(['/login']);
  }

}
