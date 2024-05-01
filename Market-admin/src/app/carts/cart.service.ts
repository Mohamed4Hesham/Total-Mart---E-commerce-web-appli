import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, model } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient) { }

  createNewcart(Model:any){
  return this.http.post('https://fakestoreapi.com/carts', model)
  }

  getCarts(param?:any){
    let params = new HttpParams();
    params = params.append("startDate", param?.start).append("endDate", param?.end)
  return this.http.get('https://fakestoreapi.com/carts', {params:params});
  }

  deleteThecart(id: number){
    return this.http.delete('https://fakestoreapi.com/carts/' + id);
  }
}
