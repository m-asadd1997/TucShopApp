import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderUtilService {

  constructor() { }

  showLoader(){
    document.getElementById("myloader").style.display = 'block';
  }

  hideLoader(){
    document.getElementById("myloader").style.display = 'none';
  }
}
