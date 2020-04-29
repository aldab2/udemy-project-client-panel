import {Injectable} from '@angular/core'
import {CanActivate , Router} from '@angular/router'
import {AngularFireAuth} from '@angular/fire/auth'

import {map} from 'rxjs/operators'
import { SettingsService } from '../services/settings.service'
import { Settings } from '../models/Settings'


@Injectable()
export class RegisterGaurd implements CanActivate {
  allowRegisteration:boolean;
  constructor(
    private router:Router,
    private settingsService : SettingsService
    
  ){

    this.settingsService.getSettings().subscribe((settings:Settings)=>{
      this.allowRegisteration = settings.allowRegistration
    });
  }
  canActivate(): boolean{
    if(this.allowRegisteration){
      return true;
    }
    else {
      this.router.navigate(['login'])
      return false;
    }
  }

}