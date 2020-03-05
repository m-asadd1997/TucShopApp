import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private http: HttpClient) { }


  private getProductURL=environment.baseUrl + "api/products/";
  private deleteProductURL=environment.baseUrl + "api/products/";
  private postProductURL=environment.baseUrl + "api/products/postproduct";
  private updateProductURL=environment.baseUrl + "api/products/"
  private updateCategoryURL=environment.baseUrl + "api/category/"
  private deleteCategoryURL=environment.baseUrl + "api/category/";
  private getCategoryURL=environment.baseUrl + "api/category/";
  private postCategoryURL=environment.baseUrl + "api/category/";
  private getTransactionsURL=environment.baseUrl+"api/transaction/";
  private deleteTransactionsURL=environment.baseUrl+"api/transaction/";
  private getTotalOutofStockURL=environment.baseUrl+"api/dashboard/outofstock"; //Total Out of stock
  private getOutofStockDetailsURL=environment.baseUrl+"api/dashboard/outofstockdetails"; 
  private getTotalProductQuantityURL=environment.baseUrl+"api/dashboard/totalproducts"; //laagana ha yaha pe
  private getTotalTransactionURL=environment.baseUrl+"api/dashboard/totaltransaction"; //laagana ha yaha pe
  private getTotalTransactionDetailsURL=environment.baseUrl+"api/dashboard/transactiondetails"; //laagana ha yaha pe
  private getTotalProductQuantityDetailsURL=environment.baseUrl+'api/dashboard/totalproductdetails';
  private getRequestedProductURL=environment.baseUrl+"api/dashboard/toprequestedproducts"; //laagana ha yaha pe




  public getProducts(): Observable<any> {
    return this.http.get(this.getProductURL);
  }

  public getProductsById(id: any): Observable<any> {
    return this.http.get(this.getProductURL+id);
  }

  public getTransaction():Observable<any>{
    return this.http.get(this.getTransactionsURL);
  }
  
  public deleteTransactions(id:any) {
    return this.http.delete(this.deleteTransactionsURL,id);
  }

  

  public updateProduct(id: any, products: any): Observable<any> {
    return this.http.put(this.updateProductURL+id,products);
  }


  public deleteProduct(id) {
    return this.http.delete(this.deleteProductURL+id);

  }

  public postProduct(obj: any): Observable<any> {
    return this.http.post(this.postProductURL,obj);
  }

  public deleteCategory(id): Observable<any> {
    return this.http.delete(this.deleteCategoryURL+id);
  }

  public getCategory(): Observable<any> {
    return this.http.get(this.getCategoryURL);
  }

  public postCategory(obj): Observable<any> {
    return this.http.post(this.postCategoryURL,obj);
  }

  public getCategoryById(id: any): Observable<any> {
    return this.http.get(this.getCategoryURL+id);
  }

  public updateCategory(id: any, category: any): Observable<any> {
    return this.http.put(this.updateCategoryURL+id,category);

  }

  // list all the products that are less than 10 quantity.

  public getOutofStockDetails():Observable<any>{
    return this.http.get(this.getOutofStockDetailsURL);
  }


  public getTotalProductQuantityDetails():Observable<any>{
    return this.http.get(this.getTotalProductQuantityDetailsURL);
  }




  public getTotalOutOfStock():Observable<any>{
    return this.http.get(this.getTotalOutofStockURL);
  }
  

  public getRequestedProducts():Observable<any>{
    return this.http.get(this.getRequestedProductURL);//ye change hoga upar
  }


  public getTotalTransaction():Observable<any>{
    return this.http.get(this.getTotalTransactionURL);//ye change hoga upar
  }


  public getTotalProductQuantity():Observable<any>{
    return this.http.get(this.getTotalProductQuantityURL);//ye change hoga upar
  }


  public getTotalTransactionDetails():Observable<any>{
    return this.http.get(this.getTotalTransactionDetailsURL);
  }




}
