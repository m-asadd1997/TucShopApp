import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainscreenService {

  private productSource = new Subject<Object>();
  productMessage$ = this.productSource.asObservable();
  constructor(private http:HttpClient) { }

  private getCategoriesURL=environment.baseUrl+"api/category/";
  private getProductsURL=environment.baseUrl+"api/products/category/";
  private postRequestedProductURL=environment.baseUrl+"api/products/postreqproduct";

  public sendMessage(obj: Object){
    console.log(obj)
    this.productSource.next(obj);
  }

  public getCategories():Observable<any>{
    return this.http.get(this.getCategoriesURL);
  }

  public getProducts(urlFilter: String):Observable<any>{
    return this.http.get(this.getProductsURL+urlFilter);
  }

  public postRequestedProduct(Obj: Object):Observable<any>{
    return this.http.post(this.postRequestedProductURL,Obj);
  }
  public saveTransaction(transaction:object):Observable<any>{
    return this.http.post("http:",transaction)
  }
}
