import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  

  constructor(private http:HttpClient) { }

  public getProducts(urlFilter: String):Observable<any>{
    return this.http.get("http://localhost:3004/products");
  }


  deleteProductAdmin(id) {
    return this.http.delete("http://localhost:3004/products/"+id);
    
  }
  postProduct(url, obj): Observable<any> {
    return this.http.post(url, obj);
  }

  deletePosts(id): Observable<any> {

    return this.http.delete("http://localhost:3004/categories/" + id);
  }
  public getProd():Observable<any>{
    return this.http.get("http://localhost:3004/categories");
  }


}
