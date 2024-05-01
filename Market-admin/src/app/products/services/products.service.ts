import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getAllproducts() {
    return this.http.get('https://fakestoreapi.com/products');
  }

  getAllcategories(){
    return this.http.get('https://fakestoreapi.com/products/categories');
  }

  filterProductsbycategory(keyword:string){
    return this.http.get('https://fakestoreapi.com/products/category/' +keyword);
  }

  getProductbyid(id:any){
    return this.http.get('https://fakestoreapi.com/products/' +id);
  }

  createProduct(modal: any){
    return this.http.post('https://fakestoreapi.com/products', modal);
  }
  
}
