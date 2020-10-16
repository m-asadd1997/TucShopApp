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

  private transactionObject = new Subject();
  transactionObject$ = this.transactionObject.asObservable();

  // private productQuantityUpdateToCheckout = new Subject<any>();
  // productQuantityUpdateToCheckout$= this.productQuantityUpdateToCheckout.asObservable();


  constructor(private http: HttpClient) { }

  private getCategoriesURL = environment.baseUrl + "api/category/";
  private getProductsURL = environment.baseUrl + "api/products/category/";
  private postRequestedProductURL = environment.baseUrl + "api/products/postreqproduct";

  private getRecenttransactionsURL = environment.baseUrl + "api/transaction/recent-transactions";

  private getAutoCompleteRequestURL=environment.baseUrl+"api/dashboard/autocomplete/";
  private getAllProductURL=environment.baseUrl+"api/products/";
  private getSettingURL= environment.baseUrl+"api/dashboard/settings";
  private postTransactionURL=environment.baseUrl+"api/transaction/post";
  // private getAutoCompleteRequestURL = environment.baseUrl + "api/dashboard/autocomplete/";
  // private getAllProductURL = environment.baseUrl + "api/products/";
  // private getSettingURL = environment.baseUrl + "api/dashboard/settings";
  // private postTransactionURL = environment.baseUrl + "api/transaction/post";
  private updateAddQuantityURL = environment.baseUrl + "api/products/add"
  private updateMinusQuantityURL = environment.baseUrl + "api/products/minus";
  private updateMinusAllQuantityURL = environment.baseUrl + "api/products/minusall";
  private registeruserURL=environment.baseUrl+"token/user";
  private loginUserURL=environment.baseUrl+"token/generate-token";
  private searchProductByKeywordURL=environment.baseUrl+"api/products/search/";
  private deleteTransactionURL=environment.baseUrl+"api/transaction/deleteTransaction/";
  private getUsersURL = environment.baseUrl+"api/user/";
  private getRecentTransactionByUserURL = environment.baseUrl+"api/transaction/getRecentTransactionByUser/";
  private getTotalTransactionByUserURL = environment.baseUrl+"api/transaction/getTotalTransactionByUser/";
  private dayCloseURL = environment.baseUrl+"api/transaction/closing/";
  private getLoginTimeURL=environment.baseUrl+"api/user/getUserTimeDate/";
  private updateTransactionURL = environment.baseUrl+"api/transaction/update/"

  public sendMessage(obj: Object) {
    this.productSource.next(obj);
  }


  public sendTransactionObject(obj) {
    this.transactionObject.next(obj);
  }
   public deleteTransaction(id:any): Observable<any>{
     return this.http.delete(this.deleteTransactionURL+id);

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

  // public getAllProducts(): Observable<any> {
  //   return this.http.get(this.getAllProductURL);



   public getAllProducts():Observable<any>{
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

  loggedIn(){
    return !!sessionStorage.getItem('token')
  }

  userRole():boolean{
    if(sessionStorage.getItem('role') == 'USER'){
      return true;
    }
    else{
      return false;
    }
  }

  adminRole():boolean{
    if(sessionStorage.getItem('role') == 'ADMIN'){
      return true;
    }
    else{
      return false;
    }
  }


  public searchProductByKeyword(keyword:any): Observable<any> {
    return this.http.get(this.searchProductByKeywordURL+keyword);
  }


  public getUsers(): Observable<any> {
    return this.http.get(this.getUsersURL);
  }
  public getRecentTransactionByUser(id:any): Observable<any> {
    return this.http.get(this.getRecentTransactionByUserURL+id);
}

public getTotalTransactionByUser(id:any): Observable<any> {
  return this.http.get(this.getTotalTransactionByUserURL+id);
}

public dayClose(id:any):Observable<any>{
return this.http.get(this.dayCloseURL+id,{ responseType: 'blob' });
}

public getLoginTime (id:any):Observable <any>{
return this.http.get (this.getLoginTimeURL+id);
}


public updateTransaction(id,obj): Observable<any>{
  return this.http.put(this.updateTransactionURL+id,obj);
}

}
