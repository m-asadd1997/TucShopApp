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
  private deleteProductURL=environment.baseUrl+"api/products/";
  private postProductURL=environment.baseUrl+"api/products/postproduct";
  private deleteCategoryURL=environment.baseUrl+"api/category/";
  private getCategoryURL=environment.baseUrl+"api/category/";
  private postCategoryURL=environment.baseUrl+"api/category/";
  




  public getProducts():Observable<any>{
    return this.http.get(this.getProductsURL);
  }

  public getProd():Observable<any>{
    return this.http.get(this.getProductsURL);
    }

  deleteProduct(id) {
    return this.http.delete(this.deleteProductURL+id);
    
  }
  postProduct( obj:any): Observable<any> {
    return this.http.post(this.postProductURL, obj);
  }

  deleteCategory(id): Observable<any> {

    return this.http.delete(this.deleteCategoryURL + id);
  }

  public getCategory():Observable<any>{
    return this.http.get(this.getCategoryURL);
  }
   
  public postCategory(obj):Observable<any>{
    return this.http.post(this.postCategoryURL,obj);
  }


}
