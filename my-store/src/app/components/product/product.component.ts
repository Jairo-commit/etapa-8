import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Product } from '../../models/product.model';
import { ImgComponent } from '../img/img.component';

@Component({
  selector: 'app-product',
  imports: [ImgComponent, CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  @Input() producto: Product = {
    id: '',
    title: '',
    price: 0,
    images: [],
    description: '',
    category: {
      id: '',
      name: ''
    },
  };

  @Output () addedProduct = new EventEmitter<Product>();
  @Output () showProduct = new EventEmitter<string>();

  onAddToCart(){
    this.addedProduct.emit(this.producto);
  }

  onShowDetail(){
    this.showProduct.emit(this.producto.id);
  }
}
