import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductComponent } from '../product/product.component';
import { Product, CreateProductDTO, UpdateProductDTO } from '../../models/product.model';
import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';
import { error } from 'console';


@Component({
  selector: 'app-list-products',
  imports: [ProductComponent, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss',
})
export class ListProductsComponent {

  total:number = 0;
  myShoppingCart: Product[] = [];

  products: Product[] = [];  
  showProductDetail: boolean = false;
  productChosen: Product = {
    id: '',
    title: '',
    price: 0,
    images: [],
    description: '',
    category: {
      id: '',
      name: ''
    }
  };

  limit : number = 10;
  offset : number = 0;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ){
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(){
    this.productsService.getProductsByPage(10, 0)
    .subscribe((data) => {
      this.products = data;
    })
  }

  onAddToCart(product: Product){
    this.storeService.addToCart(product);
    this.total = this.storeService.getTotal();
  }

  togglePoductDetail(){
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string){
    this.statusDetail = 'loading';
    this.productsService.getProduct(id)
    .subscribe(data => {
    this.togglePoductDetail();
    this.productChosen = data;
    this.statusDetail = 'success';
  }, error => {
    console.error(error);
    this.statusDetail = 'error';
  })
  }

  createNewProduct(){
    const product: CreateProductDTO = {
      title: 'New Product',
      description: 'bla bla bla',
      price: 100,
      images: [''],
      categoryId: 1,
    }
    this.productsService.createProduct(product).subscribe(data => {
      this.products.unshift(data);
    })
  }

  updateProduct(){
    const changes: UpdateProductDTO = {
      title: 'Producto actualizado',
      price: 100,
      description: 'Nueva descripción',
      categoryId: Number(this.productChosen.category.id),
      images: ['https://placeimg.com/640/480/tech']
    };

    const id = this.productChosen.id;
    this.productsService.update(id, changes).subscribe(data => {
      console.log('updated', data);
      const productIndex =this.products.findIndex(item => item.id === id)
      this.products[productIndex] = data;
    }
    );
  }

  deleteProduct(){
    const id = this.productChosen.id;
    this.productsService.delete(id).subscribe(() => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products.splice(productIndex, 1);
      this.showProductDetail =false;
    })
  }

  loadMore(){
    this.productsService.getProductsByPage(this.limit, this.offset)
    .subscribe(data => {
      this.products = this.products.concat(data);
      this.offset += this.limit;
    })
  }
  
}
