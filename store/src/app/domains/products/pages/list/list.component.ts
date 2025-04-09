import { Component, inject, Input, signal, SimpleChange, SimpleChanges } from '@angular/core';

import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import {ProductComponent} from '@products/components/product/product.component';
import {HeaderComponent} from '@shared/components/header/header.component';
import {Product} from '@shared/models/product.model';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
import { CategoryService } from '@shared/services/category.service';
import { Category } from '@shared/models/category.model';

@Component({
  selector: 'app-list',
  imports: [ProductComponent, HeaderComponent, RouterLinkWithHref],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  //Array vacío
  products = signal<Product[]>([]);
  catregories = signal<Category[]>([]);
  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  @Input() category_id? : string;

  ngOnInit(){
    this.getCategories();
  }

  ngOnChanges(changes: SimpleChanges){

    this.getProducts();
  }

  // No hay constructor porque va a ser llamado desde la API de Platzi

  addToCart(event: Product){
    this.cartService.addToCart(event);
  }

  private getProducts(){
    this.productService.getProducts(this.category_id).subscribe({
      next: (products) => {
        this.products.set(products);
      }
    })
  }
  private getCategories(){
    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.catregories.set(data);
      }
    })
  }

}
