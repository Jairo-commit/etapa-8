import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-img',
  imports: [CommonModule],
  templateUrl: './img.component.html',
  styleUrl: './img.component.scss'
})
export class ImgComponent implements OnInit {

  img: string = '';
  @Input() 
  set changeImg(newImg: string){
    this.img = newImg;
    console.log('change img =>', this.img);
  }
  @Output() loaded = new EventEmitter<string>();
  imageDefault = '';
  counter = 0;

  constructor() {
  }

  ngOnChanges() { // corre muchas veces, una antes del render y ayuda a actualizar los inputs
    // No poner cosas asyncronas
    if (!this.img) {
      this.img = this.imageDefault;
    }
  }

  ngOnInit(): void {
    //poner cosas asyn --fetch
    // corre una vez y antes del render
    // window.setInterval(() => {
    //   this.counter +=1;
    //   console.log('run counter');
    // }, 1000);
  }

  ngAfterViewInit(){
    // after render and handler children
    //para directivas
  }
  ngOnDestroy(){
    // limpiar observables
    // unsubscribe
    // cancelar peticiones http
  }

  imgError(){
    this.img = this.imageDefault;
  }

  imgLoaded(){
    console.log('Log hijo');
    this.loaded.emit(this.img);
  }

}
