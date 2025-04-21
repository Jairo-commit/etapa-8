import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Product, CreateProductDTO, UpdateProductDTO } from '../models/product.model';
import { retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'https://api.escuelajs.co/api/v1/products';

  constructor(private http: HttpClient) { }

  getAllProducts(limit?: number, offset?: number){
    let params = new HttpParams();
    if(limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(this.apiUrl, {params}).pipe(
      retry(3)
    );
  };

  getProduct(id:string){
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  getProductsByPage(limit: number, offset: number){
    return this.http.get<Product[]>(`${this.apiUrl}`, {params: {limit, offset}});

  }

  createProduct(product: CreateProductDTO){
    return this.http.post<Product>(this.apiUrl, product);
  }

  update(id : string ,product: UpdateProductDTO){
    return this.http.put<Product>(`${this.apiUrl}/${id}`,product);
  }

  delete(id : string){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
