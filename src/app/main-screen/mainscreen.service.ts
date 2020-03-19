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


private productQuantityUpdateToProductListing = new Subject<any>();
productQuantityUpdateToProductListing$= this.productQuantityUpdateToProductListing.asObservable();


// private productQuantityUpdateToCheckout = new Subject<any>();
// productQuantityUpdateToCheckout$= this.productQuantityUpdateToCheckout.asObservable();


  constructor(private http:HttpClient) { }

  private getCategoriesURL=environment.baseUrl+"api/category/";
  private getProductsURL=environment.baseUrl+"api/products/category/";
  private postRequestedProductURL=environment.baseUrl+"api/products/postreqproduct";
  private getAutoCompleteRequestURL=environment.baseUrl+"api/dashboard/autocomplete/";
  private getAllProductURL=environment.baseUrl+"api/products/";
  private getSettingURL= environment.baseUrl+"api/dashboard/settings";
  private postTransactionUrl=environment.baseUrl+"api/transaction/post";
  public sendMessage(obj: Object){
    this.productSource.next(obj);
  }


  public sendQuantityUpdateToProductListing(obj){
    this.productQuantityUpdateToProductListing.next(obj);
  }



  // public sendQuantityUpdateToCheckout(obj){
  //   this.productQuantityUpdateToCheckout.next(obj);
  // }


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
    return this.http.post(this.postTransactionUrl,transaction);
  }

  public getRequestForProductCount(keyword:any):Observable<any>{
    return this.http.get(this.getAutoCompleteRequestURL+keyword);
   }

   public getAllProducts():Observable<any>{
   return this.http.get(this.getAllProductURL);


   }
   public getSetting():Observable<any>{
    return this.http.get(this.getSettingURL);
  }
}
