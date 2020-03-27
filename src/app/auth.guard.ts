import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad} from '@angular/router';
import { MainscreenService } from  './main-screen/mainscreen.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate,CanLoad {

  constructor( private service: MainscreenService , private route :Router ){}

  canActivate(): boolean {
    if(this.service.loggedIn() && this.service.userRole()){
      return true
    }else{
      this.route.navigate(['login'])
      return false
    }
  }

  canLoad():boolean {
    if(this.service.loggedIn() && this.service.adminRole()){
      return true
    }else{
      this.route.navigate(['login'])
      return false
    }
  }

  

  

  
}
