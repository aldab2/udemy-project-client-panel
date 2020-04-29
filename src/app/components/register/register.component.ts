import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/Client';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  disabledBalanceOnAdd : boolean = true
  email : string;
  password : string;
  confirmPassword : string;

  constructor(private flashMessage : FlashMessagesService, private authService : AuthService , private router : Router) { }

  ngOnInit(): void {
  }

  onSumbit(){
    this.authService.register(this.email, this.password)
      .then(res => {
        this.flashMessage.show("You are now registered and logged in",{cssClass :'ui green inverted raised alert segment',timeout:3000})
        this.router.navigate(['/dashboard'])
      }).catch(err => {
        this.flashMessage.show(err.message,{cssClass :'ui red inverted raised alert segment',timeout:3000})

      })
     
  }
  isValidPassword():boolean{
    return this.password == this.confirmPassword;
  }

}
