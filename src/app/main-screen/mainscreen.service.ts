import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../login-page/User';
import { login } from '../login-page/login';

@Injectable({
  providedIn: 'root'
})
export class MainscreenService {

  private productSource = new Subject<Object>();
  productMessage$ = this.productSource.asObservable();


  private productQuantityUpdateToProductListing = new Subject<any>();
  productQuantityUpdateToProductListing$ = this.productQuantityUpdateToProductListing.asObservable();



  // private productQuantityUpdateToCheckout = new Subject<any>();
  // productQuantityUpdateToCheckout$= this.productQuantityUpdateToCheckout.asObservable();


  constructor(private http: HttpClient) { }

  private getCategoriesURL = environment.baseUrl + "api/category/";
  private getProductsURL = environment.baseUrl + "api/products/category/";
  private postRequestedProductURL = environment.baseUrl + "api/products/postreqproduct";

  private getRecenttransactionsURL = environment.baseUrl + "api/transaction/recent-transactions";


  private getAutoCompleteRequestURL = environment.baseUrl + "api/dashboard/autocomplete/";
  private getAllProductURL = environment.baseUrl + "api/products/";
  private getSettingURL = environment.baseUrl + "api/dashboard/settings";
  private postTransactionURL = environment.baseUrl + "api/transaction/post";
  private updateAddQuantityURL = environment.baseUrl + "api/products/add"
  private updateMinusQuantityURL = environment.baseUrl + "api/products/minus";
  private updateMinusAllQuantityURL = environment.baseUrl + "api/products/minusall";
  private registeruserURL=environment.baseUrl+"token/user";
  private loginUserURL=environment.baseUrl+"token/generate-token";

  public sendMessage(obj: Object) {
    this.productSource.next(obj);
  }


  public sendQuantityUpdateToProductListing(obj) {
    this.productQuantityUpdateToProductListing.next(obj);
  }



  // public sendQuantityUpdateToCheckout(obj){
  //   this.productQuantityUpdateToCheckout.next(obj);
  // }


  public getCategories(): Observable<any> {
    return this.http.get(this.getCategoriesURL);
  }

  public getProducts(urlFilter: String): Observable<any> {
    return this.http.get(this.getProductsURL + urlFilter);
  }

  public postRequestedProduct(Obj: Object): Observable<any> {
    return this.http.post(this.postRequestedProductURL, Obj);
  }
  public saveTransaction(transaction: object): Observable<any> {
    return this.http.post(this.postTransactionURL, transaction);
  }

  public getRequestForProductCount(keyword: any): Observable<any> {
    return this.http.get(this.getAutoCompleteRequestURL + keyword);
  }

  public getAllProducts(): Observable<any> {
    return this.http.get(this.getAllProductURL);


  }
  public getProductsById(id): Observable<any> {
    return this.http.get(this.getAllProductURL+id);


  }
  public getSetting(): Observable<any> {
    return this.http.get(this.getSettingURL);
  }

  public recentTransactions(): Observable<any> {
    return this.http.get(this.getRecenttransactionsURL)
  }


  public updateAddQuantity(id, product): Observable<any> {
    return this.http.put(this.updateAddQuantityURL + '/' + id, product)
  }
  public updateMinusQuantity(id, product): Observable<any> {
    return this.http.put(this.updateMinusQuantityURL + '/' + id, product)
  }

  public updateMinusAllQuantity(id, product): Observable<any> {
    return this.http.put(this.updateMinusAllQuantityURL + '/' + id, product)
  }

  public registerUser(user : User):Observable<any>{
    return this.http.post<any>(this.registeruserURL, user);
  }
  public loginUser(login: login):Observable<any>{
    return this.http.post<any>(this.loginUserURL, login);
  }

}
