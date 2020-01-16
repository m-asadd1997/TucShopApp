import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainscreenService {

  private productSource = new Subject<Object>();
  productMessage$ = this.productSource.asObservable();
  constructor(private http:HttpClient) { }

  public sendMessage(obj: Object){
    this.productSource.next(Object.create(obj));
  }

  public getCategories():Observable<any>{
    return this.http.get("http://localhost:3000/categories")
  }

  public getProducts(urlFilter: String):Observable<any>{
    return this.http.get("http://localhost:3000/products?category="+urlFilter);
  }

  public postRequestedProduct(Obj: Object):Observable<any>{
    return this.http.post("http://localhost:3000/registerProduct",Obj);
  }
}
