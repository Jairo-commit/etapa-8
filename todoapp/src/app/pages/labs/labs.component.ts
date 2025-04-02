import { CommonModule } from '@angular/common';
import { HtmlParser } from '@angular/compiler';
import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-labs',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  welcome = 'Bienvenido a mi primera aplicación de Angular';
  tasks = [
    'Instalar Angular CLI',
    'Crear proyectos',
    'Crear componentes',
    'Crear servicio',
  ];
  name =  signal('Jairo');
  age = 26;
  img = 'https://w3schools.com/howto/img_avatar.png';

  person = {
    name: 'Jairo',
    age: 26,
    avatar: 'https://w3schools.com/howto/img_avatar.png'
  };

  widthControl = new FormControl(50,{
    nonNullable: true
  });

  nameCtrl = new FormControl(50,{
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(3)//tamaño min del nombre 3 caracteres
    ]
  });

  clickHandler(){
    alert('Hola')
  }

  KeydownHandler(event: KeyboardEvent){
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }

  ChangeHandler(event: Event){
    const input = event.target as HTMLInputElement;
    this.name.set(input.value);
  }
}
