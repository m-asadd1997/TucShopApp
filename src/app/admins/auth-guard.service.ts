import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MainscreenService } from  '../main-screen/mainscreen.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router:Router, private service: MainscreenService ) { }
  canActivate(){
    if(this.service.loggedIn() && this.service.adminRole()){
      return true;
    }else{
      this.router.navigate(['admin/login']);
      return false;
    }

  }
}
