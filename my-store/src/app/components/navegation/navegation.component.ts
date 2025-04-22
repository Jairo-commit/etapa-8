import { Component } from '@angular/core';

import { StoreService } from '../../services/store.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navegation',
  imports: [ CommonModule ],
  templateUrl: './navegation.component.html',
  styleUrl: './navegation.component.scss'
})
export class NavegationComponent {

  showMenu = false;
  profile: User | null = null;
  counter: number = 0;

  constructor(private storeService: StoreService, private authService: AuthService){
  }

  ngOnInit(): void{
    this.storeService.myCart$.subscribe((res) => {
      this.counter = res.length;
    })
  }

  toggleMenu(){
    this.showMenu = !this.showMenu;
  }

  login(){
    this.authService.loginAndGet("john@mail.com", "changeme")
    .subscribe(
      user => {
        this.profile = user;
      }
    )
  }
}
