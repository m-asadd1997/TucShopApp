import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MainscreenService } from  './main-screen/mainscreen.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor( private service: MainscreenService , private route :Router ){}

  canActivate(): boolean {
    if(this.service.loggedIn()){
      return true
    }else{
      this.route.navigate(['login'])
      return false
    }
  }
  
}
