import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { register } from 'swiper/element/bundle';
register();

import { ListProductsComponent } from './components/list-products/list-products.component';
import { NavegationComponent } from './components/navegation/navegation.component';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [ FormsModule, CommonModule, ListProductsComponent, NavegationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  imgParent = '';
  showImg = true;
  token = '';

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ){

  }

  onLoaded(img: string){
    console.log('log padre', img);
  }

  toggleImg(){
    this.showImg = !this.showImg;
  }

  createUser(){
    this.usersService.create({
      name: 'pepito',
      email: 'ejemplo@example.com',
      password: 'qwerty'
    })
  };

  Login(){
    this.authService.login(
      "john@mail.com",
      "changeme"
    ).subscribe(rta => {
      console.log(rta.access_token);
      this.token = rta.access_token;
    }
  );
  }

  getProfile(){
    this.authService.getProfile()
    .subscribe(profile => {
      console.log(profile);
    })
  }
}

  
