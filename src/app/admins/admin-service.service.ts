import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
constructor(private http:HttpClient ) { }

  private getProductURL=environment.baseUrl+"api/products/";
  private deleteProductURL=environment.baseUrl+"api/products/";
  private postProductURL=environment.baseUrl+"api/products/postproduct";
  private updateProductURL=environment.baseUrl+"api/products/"
  private updateCategoryURL=environment.baseUrl+"api/category/"
  private deleteCategoryURL=environment.baseUrl+"api/category/";
  private getCategoryURL=environment.baseUrl+"api/category/";
  private postCategoryURL=environment.baseUrl+"api/category/";
  
  

    public getProducts():Observable<any>{
    return this.http.get(this.getProductURL);
  }

  public getProductsById(id:any):Observable<any>{
    return this.http.get(this.getProductURL+id);
  }


    public updateProduct(id:any, products:any):Observable<any>{
    return this.http.put(this.updateProductURL+id, products) ;

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

  public getCategoryById(id:any):Observable<any>{
    return this.http.get(this.getCategoryURL+id);
  }

  public updateCategory(id:any, category:any):Observable<any>{
    return this.http.put(this.updateCategoryURL+id,category) ;

    }

}
