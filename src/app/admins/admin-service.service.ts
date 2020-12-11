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
  private getPaginatedProductsURL = environment.baseUrl+"api/products/paginatedproducts"
  private getSearchedProductsURL= environment.baseUrl+"api/dashboard/searchproducts";
  private deleteProductURL=environment.baseUrl + "api/products/";
  private postProductURL=environment.baseUrl + "api/products/postproduct";
  private updateProductURL=environment.baseUrl + "api/products/"
  private updateCategoryURL=environment.baseUrl + "api/category/"
  private deleteCategoryURL=environment.baseUrl + "api/category/";
  private getCategoryURL=environment.baseUrl + "api/category/";
  private postCategoryURL=environment.baseUrl + "api/category/";
  private getTransactionsURL=environment.baseUrl+"api/transaction/";
  private deleteTransactionsURL=environment.baseUrl+"api/transaction/";
  private getTotalOutofStockURL=environment.baseUrl+"api/dashboard/outofstock";
  private getOutofStockDetailsURL=environment.baseUrl+"api/dashboard/outofstockdetails";
  private getTotalProductQuantityURL=environment.baseUrl+"api/dashboard/totalproducts";
  private getTotalTransactionURL=environment.baseUrl+"api/dashboard/totaltransaction";
  private getTotalTransactionDetailsURL=environment.baseUrl+"api/dashboard/transactiondetails";
  private getTotalProductQuantityDetailsURL=environment.baseUrl+'api/dashboard/totalproductdetails/';
  private getRequestedProductURL=environment.baseUrl+"api/dashboard/toprequestedproducts";
  private postSettingURL=environment.baseUrl+"api/dashboard/settings";
  private getChartDataURL=environment.baseUrl+"api/dashboard/salespermonth";
  private getSettingURL= environment.baseUrl+"api/dashboard/settings";
  private getAutoCompleteVariantsURL = environment.baseUrl+"api/products/variants/";
  private getProfitURL = environment.baseUrl+"api/dashboard/profit/";
  private getTotalProfitURL = environment.baseUrl+"api/dashboard/totalprofit";
  private  getOutOfStockFilteredURL = environment.baseUrl+'api/dashboard/outofstockfiltered/'
  public getFilteredTransactionURL= environment.baseUrl+'api/dashboard/filteredtransaction/'
  public getFilteredDetailedTransaction= environment.baseUrl+'api/dashboard/detailedfilteretransactions/';
  private getTransactionByUserUrl=environment.baseUrl+"api/transaction/userTransaction/";
  private scearchAllTransactionUrl=environment.baseUrl+"api/transaction/scearchAllTransaction";
  private scearchtransactionofuserURL=environment.baseUrl+"api/transaction/scearchTransactions";
  private deleterequestedproductURL=environment.baseUrl+"api/products/deletereqproduct/";
  private getTotalInventoryURL = environment.baseUrl+"api/dashboard/totalinventory";
  private getFilteredTotalInventoryURL = environment.baseUrl+"api/dashboard/totalinventory/";
  private getFilteredQuantityURL = environment.baseUrl+"api/dashboard/filteredtotalproducts/";
  private getFrequencyByCategoryURL = environment.baseUrl+"api/dashboard/frequencybycategory";
  private getUsersURL = environment.baseUrl+"api/user/";
  private getTransactionMethodURL = environment.baseUrl+"api/dashboard/gettransactionmethod";
  private getFilteredFrequencyByCategoryURL= environment.baseUrl+"api/dashboard/frequencybycategory/";
  private getFilteredTransactionMethodURL= environment.baseUrl+"api/dashboard/gettransactionmethod/";
  private deleteUserById= environment.baseUrl+"api/user/";
  private downloadAllTransactionURL = environment.baseUrl+"api/transaction/downloadtransaction/";
  private postExpenseURL = environment.baseUrl+"api/expense/post";
  private getExpenseByDateURL = environment.baseUrl+"api/expense/";
  private updateExpenseURL = environment.baseUrl+"api/expense/update/";
  private getOnlineDetailsURL = environment.baseUrl+"api/order/";
  private getOnlineOrderDetailsByIdURL = environment.baseUrl+"api/order/";
  private changeOnlineOrderStatusURL = environment.baseUrl+"api/order/";
  private getOrderStatusOnSelectURL = environment.baseUrl+"api/order/status/";
  private getPhoneNoURL = environment.baseUrl+"api/order/phoneno/";
  private getTrackingIdURL = environment.baseUrl+"api/order/trackingid/";
  private getSubCategoryURL = environment.baseUrl+"api/category/subcategory/";
  private postTransactionByOnlineOrderIdURL = environment.baseUrl+"api/transaction/onlinetransaction/"

  public postExpense(object:any):Observable<any>{
  return this.http.post(this.postExpenseURL,object);
  }

  public postTransactionByOnlineOrder(id:any):Observable<any>{
  return this.http.post(this.postTransactionByOnlineOrderIdURL+id,null);  
  }

  public getOrderStatusOnSelect(value:any):Observable <any>{
  return this.http.get(this.getOrderStatusOnSelectURL+value);  
  }

  public getPhoneNo(phone:any):Observable<any>{
  return this.http.get(this.getPhoneNoURL+"0"+phone);  
  }

  public getTrackingId(trackingId:any):Observable<any>{
  return this.http.get(this.getTrackingIdURL+trackingId);  
  }

  public getOnlineDetails():Observable<any>{
  return this.http.get(this.getOnlineDetailsURL);
  }

  public changeOnlineOrderStatus (id:any, obj): Observable <any>{
  return this.http.patch(this.changeOnlineOrderStatusURL+id,obj);
  }

  public getOnlineOrderDetailsById(id: any): Observable<any> {
    return this.http.get(this.getOnlineOrderDetailsByIdURL+id);
  }

  public updateExpense(id:any, object:any):Observable<any>{
    return this.http.put(this.updateExpenseURL+id,object);
  }

  public getExpenseByDate(date:any):Observable<any>{
    return this.http.get(this.getExpenseByDateURL+date)
  }
  public getFilteredFrequencyBycategory(startDate:any, endDate:any):Observable<any>{
   return this.http.get(this.getFilteredFrequencyByCategoryURL+startDate+"/"+endDate);
  }
  public getFilteredTransactionMethod(startDate:any, endDate:any):Observable<any>{
  return this.http.get(this.getFilteredTransactionMethodURL+startDate+"/"+endDate);
  }

  public getTransactionMethod():Observable<any>{
   return this.http.get(this.getTransactionMethodURL);
  }

  public getFrequencyByCategory():Observable<any>{
    return this.http.get(this.getFrequencyByCategoryURL);
  }

  public getTotalInventory():Observable<any>{
    return this.http.get(this.getTotalInventoryURL);
  }

  public getFilteredTotalInventory(startDate:any, endDate:any):Observable<any>{
    return this.http.get(this.getFilteredTotalInventoryURL+startDate+"/"+endDate)
  }


  public getVariants(keyword:any):Observable<any>{
    return this.http.get(this.getAutoCompleteVariantsURL+keyword);
  }

  public deleterequestedproduct(productName:any):Observable<any>{
    return this.http.delete(this.deleterequestedproductURL+productName);
  }

  public getProfit(startDate:any, endDate:any):Observable<any>{
  return this.http.get(this.getProfitURL+startDate+"/"+endDate)
}


  public getTotalProfit():Observable<any>{
  return this.http.get(this.getTotalProfitURL)
}


 public getTransactionsByUser(user:any):Observable<any>{
   return this.http.get(this.getTransactionByUserUrl+user);

 }


  public getProducts(): Observable<any> {
    return this.http.get(this.getProductURL);
  }

  public getProductsById(id: any): Observable<any> {
    return this.http.get(this.getProductURL+id);
  }

  public getTransaction(startDate:any, endDate:any):Observable<any>{
    return this.http.get(this.getTransactionsURL+startDate+"/"+endDate);
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


  public getTotalProductQuantityDetails(startValue,endValue):Observable<any>{
    return this.http.get(this.getTotalProductQuantityDetailsURL+startValue+"/"+endValue);
  }

  public scearchAllTransaction(transaction:any ):Observable<any>{
    return this.http.post(this.scearchAllTransactionUrl,transaction);
  }


public scearchtransactionofUser(transaction:any):Observable<any>{
  return this.http.post(this.scearchtransactionofuserURL,transaction);
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

  // Ye tou Hogaaaaaa

  public getTotalProductQuantity():Observable<any>{
    return this.http.get(this.getTotalProductQuantityURL);//ye change hoga upar
  }


  public getTotalTransactionDetails():Observable<any>{
    return this.http.get(this.getTotalTransactionDetailsURL);
  }




  public postSetting(obj): Observable<any> {

    return this.http.post(this.postSettingURL,obj);
  }

  public getChartData():Observable<any>{
    return this.http.get(this.getChartDataURL);
  }




  public getSetting():Observable<any>{
    return this.http.get(this.getSettingURL);
  }


  public getSearchedProducts(value):Observable<any>{
    return this.http.get(this.getSearchedProductsURL+"/"+value);
  }

  // public getPaginatedProducts(){}
  public getPaginatedProducts(page):Observable<any>{
    if(page>0)
    {
      return this.http.get(this.getPaginatedProductsURL+"?page="+page);
    }
    else if(!page||page==0)
    {
      return this.http.get(this.getPaginatedProductsURL);

    }

  }





  //
  public getImage(value):Observable<any>{
    return this.http.get(value,
    {responseType:'blob'});
  }









  public getFilteredQuantity(startValue,endValue):Observable<any> {

    return this.http.get(this.getFilteredQuantityURL+startValue+"/"+endValue);

  }


  public getFilteredOutOfStock(startValue,endValue):Observable<any> {

    return this.http.get(this.getOutOfStockFilteredURL+startValue+"/"+endValue);

  }




  getFilteredTransaction(startValue, endValue):Observable<any> {
    return this.http.get(this.getFilteredTransactionURL+startValue+"/"+endValue);
  }


  getFilteredDetailedTransactionMethod(startValue, endValue):Observable<any>{
    return this.http.get(this.getFilteredDetailedTransaction+startValue+"/"+endValue);
  }

  //download All Transaction PDF

  downloadAllTransactionPDF(startDate:any, endDate:any):Observable<any>{
  return this.http.get (this.downloadAllTransactionURL+startDate+"/"+endDate ,{ responseType: 'blob' });
  }



  //User CRUD


  public getUsers(): Observable<any> {
    return this.http.get(this.getUsersURL);
  }


  deleteUser(id):Observable<any> {
    return this.http.delete(this.deleteUserById+id);
  }

  getUserById(id):Observable<any>{
    return this.http.get(this.getUsersURL+id);
  }
  updateUser(id,obj):Observable<any>{
    return this.http.put(this.getUsersURL+id,obj);
  }

  getSubCategories(id)
  {
    return this.http.get(this.getSubCategoryURL+id);
  }
}
