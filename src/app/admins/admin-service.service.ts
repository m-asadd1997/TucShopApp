import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  
  

  constructor(private http:HttpClient ) { }

  

  
  

  private getProductsURL=environment.baseUrl+"api/products/";
  private deleteProductAdminURL=environment.baseUrl+"api/products/{id}";
  private postProductURL=environment.baseUrl+"api/products/postproduct";
  private deletePostsURL=environment.baseUrl+"api/category/{id}";
  private getProdURL=environment.baseUrl+"api/category/";
  private postCategoryURL=environment.baseUrl+"api/category/";
  private getTransactionsURL=environment.baseUrl+"api/transaction/";
  private deleteTransactionsURL=environment.baseUrl+"api/transaction/";
  




  public getProducts(urlFilter: String):Observable<any>{
    return this.http.get(this.getProductsURL);
  }

  public getTransactions():Observable<any>{
    return this.http.get(this.getTransactionsURL);
  }


  deleteProductAdmin(id) {
    return this.http.delete(this.deleteProductAdminURL+id);
    
  }
  
  deleteTransactions(id:any) {
    return this.http.delete(this.deleteTransactionsURL,id);
  }
  postProduct( obj:any): Observable<any> {
    return this.http.post(this.postProductURL, obj);
  }

  deletePosts(id): Observable<any> {

    return this.http.delete(this.deletePostsURL + id);
  }

  public getProd():Observable<any>{
    return this.http.get(this.getProdURL);
  }

  public postCategory(obj):Observable<any>{
    return this.http.post(this.postCategoryURL,obj);
  }


}
