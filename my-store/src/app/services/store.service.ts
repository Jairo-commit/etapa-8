import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Product } from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private shoppingCart : Product[] = [];
  private myCart = new BehaviorSubject<Product[]>([]);

  myCart$ = this.myCart.asObservable();

  constructor() { }

  getShoppingCart(){
    return this.shoppingCart;
  }

  addToCart(product: Product){
    this.shoppingCart.push(product);
    this.myCart.next(this.shoppingCart);
  }

  getTotal(){   
    return this.shoppingCart.reduce((sum, item) => sum + item.price, 0);
  }
}
