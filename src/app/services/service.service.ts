import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http : HttpClient) { }

  apiUrl = 'http://localhost:3000';

  postProduct(form : any) {
    return this.http.post(this.apiUrl +"/addProduct", form)
  }

  getAllproducts() : Observable<any> {
    return this.http.get(this.apiUrl + "/getAll",)
  }

  editProduct(id : string, productData : any) {
    return this.http.put(`${this.apiUrl}/updateProduct/${id}`, productData);
  }
  

  getProduct(id : string) {
    return this.http.get(this.apiUrl+"/getProduct/" + id)
  }

  deleteProduct(id : string) {
    return this.http.delete(this.apiUrl+"/deleteProduct/" + id)
  }

}
