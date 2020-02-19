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
  private getRequestedProductURL=environment.baseUrl+""; //laagana ha yaha pe
  private deleteProductURL=environment.baseUrl+"api/products/";
  private postProductURL=environment.baseUrl+"api/products/postproduct";
  private deleteCategoryURL=environment.baseUrl+"api/category/";
  private getCategoryURL=environment.baseUrl+"api/category/";
  private postCategoryURL=environment.baseUrl+"api/category/";
  private getTotalOutofStockURL=environment.baseUrl+"api/dashboard/outofstock"; //Total Out of stock
  private getOutofStockDetailsURL=environment.baseUrl+"api/dashboard/outofstockdetails"; 
  private getTotalProductQuantityURL=environment.baseUrl+'' //laagana ha yaha pe
  private getTotalTransactionURL=environment.baseUrl+'' //laagana ha yaha pe



  

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



  public getOutofStockDetails():Observable<any>{
    return this.http.get(this.getOutofStockDetailsURL);
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





}
