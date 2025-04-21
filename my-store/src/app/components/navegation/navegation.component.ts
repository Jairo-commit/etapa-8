import { Component } from '@angular/core';

import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-navegation',
  imports: [],
  templateUrl: './navegation.component.html',
  styleUrl: './navegation.component.scss'
})
export class NavegationComponent {

  showMenu = false;
  counter: number = 0;

  constructor(private storeService: StoreService){
  }

  ngOnInit(): void{
    this.storeService.myCart$.subscribe((res) => {
      this.counter = res.length;
    })
  }

  toggleMenu(){
    this.showMenu = !this.showMenu;
  }
}
